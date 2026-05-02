
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { pool } from "../../../db.config.js";

// 유저가 이 미션을 가지고 있는지 조회
export const getUserMission = async (userId: number, missionId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(
            `SELECT 
             id, 
             user_id,
             mission_id, 
             status, 
             started_at,
             completed_at,
             progress_count,
             reward_point,
             end_date
             FROM user_mission
             WHERE user_id = ? AND mission_id = ?;`,
            [userId, missionId]
        );

        if (rows.length === 0) return null;
        return rows[0];
    } catch (err){
        throw new Error(`사용자 미션 조회 중 오류가 발생했습니다: ${err}`);
    } 
    finally {
        conn.release();
    }
};

// 새 미션 도전 추가
export const addUserMission = async (userId: number, missionId: number): Promise<number> => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query<ResultSetHeader>(
            `INSERT INTO user_mission (
                user_id, 
                mission_id, 
                status, 
                started_at,
                progress_count,
                reward_point,
                end_date
            )
             VALUES (?, ?, 'ONGOING', NOW(), 0,
                (SELECT reward FROM mission WHERE id = ?),
                (SELECT end_date FROM mission WHERE id = ?));`,
            [userId, missionId, missionId, missionId]
        );

        return result.insertId;
    } catch (err: any) {
        throw new Error(`미션 도전 등록 중 오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};

// 목록 조회: 진행중 or 완료된 미션 리스트 조회
export const getUserMissionsByStatus = async (userId: number, status: string): Promise<any[]> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(
            `SELECT um.id,
                    um.mission_id,
                    um.status,
                    um.started_at,
                    um.completed_at,
                    um.progress_count,
                    m.store_id,
                    m.region_id,
                    m.name,
                    m.reward,
                    m.end_date,
                    m.mission_spec,
                    m.condition,
                    m.condition_value
             FROM user_mission um
             JOIN mission m ON um.mission_id = m.id
             WHERE um.user_id = ?
             AND um.status = ?
             ORDER BY um.started_at DESC;`,
            [userId, status]
        );
        
        return rows as any[];
    } catch (err) {
        throw new Error(`사용자 미션 목록 조회 중 오류가 발생했습니다: ${err}`);
    }finally {
        conn.release();
    }
};