
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 미션 추가
export const addMission = async (data: any): Promise<number> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query<ResultSetHeader>(
            `INSERT INTO mission (store_id, name, reward, \`condition\`, condition_value, start_date, end_date, mission_spec) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                data.storeId, 
                data.name, 
                data.reward, 
                data.condition, 
                data.conditionValue, 
                data.startDate, 
                data.endDate, 
                data.missionSpec
            ]
        );
        return result.insertId;
    } catch (err: any){
        throw new Error(`미션 저장 중 오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};

// 미션 조회
export const getMissionById = async (missionId: number): Promise<any> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(
            `SELECT * FROM mission WHERE id = ?;`,
            [missionId]
        );
        return rows[0];
    } catch (err: any){
        throw new Error(`미션 조회 중 오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};