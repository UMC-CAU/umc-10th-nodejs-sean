
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 리뷰 저장
export const addReview = async (data: any): Promise<number> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query<ResultSetHeader>(
            `INSERT INTO review (user_id, store_id, body, rating) VALUES (?, ?, ?, ?);`,
            [data.userId, data.storeId, data.body, data.rating]
        );
        return result.insertId;
    } catch(err){
        throw new Error(`리뷰 저장 중 오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};

// 리뷰 조회
export const getReview = async (reviewId: number): Promise<any> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(
            `SELECT * FROM review WHERE id = ?;`,
            [reviewId]
        );
        return rows[0];
    } catch(err){
        throw new Error(`리뷰 조회 중 오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};