
import { prisma } from "../../../db.config.js";

// 미션 추가
export const addMission = async (data: any): Promise<number> => {
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
export const getMission = async (missionId: number): Promise<any> => {
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