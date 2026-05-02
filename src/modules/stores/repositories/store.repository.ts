
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../../db.config.js";

// 지역 존재 여부 확인
export const checkRegionExists = async (regionId: number): Promise<boolean> => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query<RowDataPacket[]>(
            "SELECT id FROM region WHERE id = ?",
            [regionId]
        );
        return rows.length > 0;
    } catch (err) {
        throw new Error(`가게 추가 중 오류가 발생했습니다: ${err}`);
    }
    finally {
        conn.release();
    }
}

// 가게 추가
export const addStore = async (data: any): Promise<number | null> => {
    const conn = await pool.getConnection();
    try {
        // 같은 주소에 같은 이름의 가게가 이미 있는지 확인
        const [confirm] = await pool.query<RowDataPacket[]>(
            `SELECT EXISTS(SELECT 1 FROM store WHERE name = ? AND address = ?) as isExistStore;`,
            [data.name, data.address]
        );
        // 이미 존재하면 null 반환
        if (confirm[0]?.isExistStore) {
            return null;
        }

        // 가게 정보 삽입
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO store (region_id, name, address, category) VALUES (?, ?, ?, ?);`,
            [data.regionId, data.name, data.address, data.category]
        );

        return result.insertId; // 생성된 가게의 ID 반환
    } catch (err: any) {
        throw new Error(`가게 추가 중 오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};

// 가게 정보 얻기
export const getStore = async (storeId: number): Promise<any | null> => {
    const conn = await pool.getConnection();
    try {
        const [store] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM store WHERE id = ?;`,
            [storeId]
        );

        if (store.length === 0) {
            return null;
        }

        return store[0]; // 배열의 첫 번째 요소(유저 정보) 반환
    } catch (err: any) {
        throw new Error(`가게 조회 중 오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};

