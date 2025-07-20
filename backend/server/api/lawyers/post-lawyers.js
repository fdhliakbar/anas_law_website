import pool from "../../utils/db.js";

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

  try {
    if (method === "POST") {
      // Create lawyer
      const body = await readBody(event);
      const {
        name, specialty, experience, rating, fee, old_fee, photo, available
      } = body;
      const result = await pool.query(
        `INSERT INTO lawyers (name, specialty, experience, rating, fee, old_fee, photo, available)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [name, specialty, experience, rating, fee, old_fee, photo, available]
      );
      return { success: true, lawyer: result.rows[0] };
    }
    if (method === "PUT") {
      // Update lawyer
      const body = await readBody(event);
      const {
        lawyer_id, name, specialty, experience, rating, fee, old_fee, photo, available
      } = body;
      const result = await pool.query(
        `UPDATE lawyers SET name=$1, specialty=$2, experience=$3, rating=$4, fee=$5, old_fee=$6, photo=$7, available=$8
         WHERE lawyer_id=$9 RETURNING *`,
        [name, specialty, experience, rating, fee, old_fee, photo, available, lawyer_id]
      );
      return { success: true, lawyer: result.rows[0] };
    }
    if (method === "DELETE") {
      // Delete lawyer
      const query = getQuery(event);
      const lawyer_id = query.lawyer_id;
      if (!lawyer_id) {
        throw createError({ statusCode: 400, statusMessage: "Lawyer ID is required" });
      }
      await pool.query(`DELETE FROM lawyers WHERE lawyer_id = $1`, [lawyer_id]);
      return { success: true };
    }
    if (method === "GET") {
      // List all lawyers (for management, including inactive)
      const query = getQuery(event);
      const limit = parseInt(query.limit) || 50;
      const offset = parseInt(query.offset) || 0;
      const result = await pool.query(
        `SELECT lawyer_id, name, specialty, experience, rating, fee, old_fee, photo, available, created_at
         FROM lawyers
         ORDER BY created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
      return { success: true, lawyers: result.rows };
    }
    return { success: false, message: "Method not allowed" };
  } catch (error) {
    console.error("Error in post-lawyers:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal server error" });
  }
});
