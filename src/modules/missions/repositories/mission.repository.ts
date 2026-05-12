
import { prisma } from "../../../db.config.js";
import { Mission } from "../../../generated/prisma/client.js";
import { MissionAddRequest } from "../dtos/mission.dto.js";

// 미션 추가
export const addMission = async (data: MissionAddRequest): Promise<number> => {
    try {
        const mission = await prisma.mission.create({
            data: {
                storeId: data.storeId, 
                name: data.name, 
                reward: data.reward, 
                condition: data.condition, 
                conditionValue: data.conditionValue, 
                startDate: new Date(data.startDate), 
                endDate: new Date(data.endDate), 
                missionSpec: data.missionSpec
            },
            
        });
        return mission.id;
   
    } catch (err: any){
        throw new Error(`미션 저장 중 오류가 발생했습니다: ${err}`);
    }
};

// 미션 조회
export const getMission = async (missionId: number): Promise<Mission | null> => {
    try {
        return await prisma.mission.findUnique({
            where: {
                id: missionId
            },
        });
    } catch (err: any){
        throw new Error(`미션 조회 중 오류가 발생했습니다: ${err}`);
    } 
};

// 특정 가게의 미션 목록 조회하기
export const getStoreMissions = async (storeId: number, cursor: number | null) => {
    try {
        const missions = await prisma.mission.findMany({
            select: {
                id: true,
                name: true,
                reward: true,
                condition: true,
                conditionValue: true,
                startDate: true,
                endDate: true,
                missionSpec: true,
                store: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                storeId: storeId,
                id: cursor ? { lt: cursor } : undefined,
            },
            orderBy: {
                id: "desc",
            },
            take: 5,
        });
        
        return missions;
    } catch (err: any) {
        throw new Error(`가게 미션 목록 조회 중 오류가 발생했습니다: ${err}`);
    }
};