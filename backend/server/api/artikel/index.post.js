import pool from "../../utils/db";


export default defineEventHandler(async (event) =>{
    const body = await readBody(event);

    const {judul, link_artikel, content_artikel} = body;


    if(!judul || !link_artikel || !content_artikel){
        return {
            statusCode :400,
            messsage : "Semua field wajib di isi",
        };
    }

    try {
        const result = await pool.query(
            "INSERT INTO artikel (judul, link_artikel, content_artikel) VALUES ($1, $2, $3) RETURNING *",
            [judul, link_artikel, content_artikel]
        );

        return{
            messsage:"Artikel Berhasil di tambahkan",
            user: result.rows[0],
        };

    }catch(error) {
        console.error(error);
        return{
            statusCode: 500,
            messsage: "terjadi kesalahn pada server",
            error: error.messsage,
        };
    }


});