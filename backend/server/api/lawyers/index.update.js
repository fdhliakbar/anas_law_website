import pool from "../..//utils/db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {id, nama, experience, bio, photo_url, users} = body;

    if (!id){
        return {
            statusCode: 400,
            message: "ID wajib diisi",
        };
    }


    const setClauses = [];
    const values = [];

    let paramCount = 1;

    if (nama !== undfenined) {
        setClauses.push(`nama = $${paramCount++}`);
        values.push(nama);
    }
})