import { readBody, getHeader } from "h3";
import pool from "../../utils/db.js";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PUT,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  if (event.node.req.method === "OPTIONS") {
    return "";
  }

  try {
    if (event.node.req.method !== "PUT") {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed"
      });
    }

    const body = await readBody(event);
    const authHeader = getHeader(event, 'authorization');
    
    // Verify admin authentication
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: "Authentication required"
      });
    }

    try {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (decoded.role !== 'admin') {
        throw createError({
          statusCode: 403,
          statusMessage: "Admin access required"
        });
      }
    } catch (error) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid or expired token"
      });
    }

    const { booking_id, status, reschedule_reason, reschedule_date, reschedule_time } = body;
    
    if (!booking_id || !status) {
      throw createError({
        statusCode: 400,
        statusMessage: "Booking ID and status are required"
      });
    }

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid status"
      });
    }

    // Build update query
    let updateQuery = `
      UPDATE bookings 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
    `;
    let queryParams = [status];
    let paramIndex = 2;

    // Add reschedule fields if provided
    if (reschedule_reason) {
      updateQuery += `, reschedule_reason = $${paramIndex}`;
      queryParams.push(reschedule_reason);
      paramIndex++;
    }

    if (reschedule_date) {
      updateQuery += `, reschedule_date = $${paramIndex}`;
      queryParams.push(reschedule_date);
      paramIndex++;
    }

    if (reschedule_time) {
      updateQuery += `, reschedule_time = $${paramIndex}`;
      queryParams.push(reschedule_time);
      paramIndex++;
    }

    updateQuery += ` WHERE booking_id = $${paramIndex} RETURNING *`;
    queryParams.push(booking_id);

    const result = await pool.query(updateQuery, queryParams);

    if (result.rows.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Booking not found"
      });
    }

    return {
      success: true,
      message: `Booking ${status} successfully`,
      booking: result.rows[0]
    };

  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
});
