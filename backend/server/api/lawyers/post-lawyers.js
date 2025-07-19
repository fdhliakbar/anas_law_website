import { readBody, getHeader } from "h3";
import pool from "../../utils/db.js";
import jwt from "jsonwebtoken";
import { IncomingForm } from "formidable";
import path from "path";
import fs from "fs";

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  if (event.node.req.method === "OPTIONS") {
    return "";
  }

  const method = event.node.req.method;

  // Verify admin authentication for POST, PUT, DELETE
  if (["POST", "PUT", "DELETE"].includes(method)) {
    const authHeader = getHeader(event, 'authorization');
    
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
  }

  try {
    // GET - Get all lawyers (public access)
    if (method === "GET") {
      const query = getQuery(event);
      const search = query.search || '';
      const limit = parseInt(query.limit) || 50;
      const offset = parseInt(query.offset) || 0;
      const includeInactive = query.includeInactive === 'true';

      let sqlQuery;
      let queryParams;

      if (search) {
        sqlQuery = `
          SELECT lawyer_id, name, specialty, experience, rating, fee, old_fee, photo, available, created_at
          FROM lawyers 
          WHERE (name ILIKE $1 OR specialty ILIKE $1)
          ${!includeInactive ? 'AND available = true' : ''}
          ORDER BY rating DESC, experience DESC
          LIMIT $2 OFFSET $3
        `;
        queryParams = [`%${search}%`, limit, offset];
      } else {
        sqlQuery = `
          SELECT lawyer_id, name, specialty, experience, rating, fee, old_fee, photo, available, created_at
          FROM lawyers 
          ${!includeInactive ? 'WHERE available = true' : ''}
          ORDER BY rating DESC, experience DESC
          LIMIT $1 OFFSET $2
        `;
        queryParams = [limit, offset];
      }

      const result = await pool.query(sqlQuery, queryParams);

      // Get total count
      const countQuery = search 
        ? `SELECT COUNT(*) FROM lawyers WHERE (name ILIKE $1 OR specialty ILIKE $1) ${!includeInactive ? 'AND available = true' : ''}`
        : `SELECT COUNT(*) FROM lawyers ${!includeInactive ? 'WHERE available = true' : ''}`;
      
      const countParams = search ? [`%${search}%`] : [];
      const countResult = await pool.query(countQuery, countParams);
      const totalCount = parseInt(countResult.rows[0].count);

      return {
        success: true,
        lawyers: result.rows,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: (offset + limit) < totalCount
        }
      };
    }

    // POST - Create new lawyer
    if (method === "POST") {
      const form = new IncomingForm({
        uploadDir: "./public/uploads/lawyers",
        keepExtensions: true,
      });

      // Create upload directory if it doesn't exist
      if (!fs.existsSync("./public/uploads/lawyers")) {
        fs.mkdirSync("./public/uploads/lawyers", { recursive: true });
      }

      const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(event.node.req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });

      const name = fields.name?.toString().trim();
      const specialty = fields.specialty?.toString().trim();
      const experience = parseInt(fields.experience?.toString()) || 0;
      const rating = parseInt(fields.rating?.toString()) || 0;
      const fee = parseInt(fields.fee?.toString()) || 0;
      const old_fee = fields.old_fee ? parseInt(fields.old_fee.toString()) : null;
      const available = fields.available?.toString() === 'true';
      const photoFile = Array.isArray(files.photo) ? files.photo[0] : files.photo;

      if (!name || !specialty) {
        throw createError({
          statusCode: 400,
          statusMessage: "Name and specialty are required"
        });
      }

      let photoPath = null;
      if (photoFile && photoFile.filepath) {
        photoPath = "/uploads/lawyers/" + path.basename(photoFile.filepath);
      }

      const query = `
        INSERT INTO lawyers (name, specialty, experience, rating, fee, old_fee, photo, available, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
        RETURNING *
      `;
      const values = [name, specialty, experience, rating, fee, old_fee, photoPath, available];

      const result = await pool.query(query, values);

      return {
        success: true,
        message: "Lawyer created successfully",
        lawyer: result.rows[0]
      };
    }

    // PUT - Update lawyer
    if (method === "PUT") {
      const body = await readBody(event);
      const { lawyer_id, name, specialty, experience, rating, fee, old_fee, available } = body;

      if (!lawyer_id || !name || !specialty) {
        throw createError({
          statusCode: 400,
          statusMessage: "Lawyer ID, name, and specialty are required"
        });
      }

      const query = `
        UPDATE lawyers 
        SET name = $1, specialty = $2, experience = $3, rating = $4, fee = $5, old_fee = $6, available = $7
        WHERE lawyer_id = $8
        RETURNING *
      `;
      const values = [name, specialty, experience || 0, rating || 0, fee || 0, old_fee, available !== false, lawyer_id];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: "Lawyer not found"
        });
      }

      return {
        success: true,
        message: "Lawyer updated successfully",
        lawyer: result.rows[0]
      };
    }

    // DELETE - Delete lawyer
    if (method === "DELETE") {
      const query = getQuery(event);
      const lawyer_id = query.lawyer_id;

      if (!lawyer_id) {
        throw createError({
          statusCode: 400,
          statusMessage: "Lawyer ID is required"
        });
      }

      const result = await pool.query(
        "DELETE FROM lawyers WHERE lawyer_id = $1 RETURNING *",
        [lawyer_id]
      );

      if (result.rows.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: "Lawyer not found"
        });
      }

      return {
        success: true,
        message: "Lawyer deleted successfully"
      };
    }

  } catch (error) {
    console.error("Error in lawyers API:", error);
    throw error;
  }
});
