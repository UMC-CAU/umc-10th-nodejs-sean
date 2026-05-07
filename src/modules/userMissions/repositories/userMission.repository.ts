
import { prisma } from "../../../db.config.js";

// 유저가 이 미션을 가지고 있는지 조회
export const getUserMission = async (userId: number, missionId: number): Promise<any | null> => {
    try {
        return await prisma.user_mission.findFirst({
            where:{
                userId: userId,
                missionId: missionId,
            },
        });
    } catch (err){
        throw new Error(`사용자 미션 조회 중 오류가 발생했습니다: ${err}`);
    }
};

// 새 미션 도전 추가
export const addUserMission = async (userId: number, missionId: number): Promise<number> => {
    try {
        // 미션 정보 가져오기
        const targetMission = await prisma.mission.findUnique({
            where:{
                id: missionId
            },
        });
        if(!targetMission){
            throw new Error("존재하지 않는 미션입니다.");
        }

        // 새 미션 도전 추가
        const newUserMission = await prisma.user_mission.create({
            data: {
                userId: userId,
                missionId: missionId,
                status: "ONGOING",
                startedAt: new Date(),
                progressCount: 0,
                rewardPoint: targetMission.reward,
                endDate: targetMission.endDate   
            },
        });
        return newUserMission.id;
    } catch (err: any) {
        throw new Error(`미션 도전 등록 중 오류가 발생했습니다: ${err}`);
    } 
};

// 단일 사용자 미션 조회
export const getUserMissionById = async (userMissionId: number) => {
    return await prisma.user_mission.findUnique({
        where: { id: userMissionId },
        include: { mission: true }
    });
};

// 목록 조회: 진행중 or 완료된 미션 리스트 조회
export const getUserMissionsByStatus = async (userId: number, status: string, cursor: number | null): Promise<any[]> => {
    try {
        const userMissionList = await prisma.user_mission.findMany({
            where: {
                userId: userId,
                status: status,
                id: cursor ? { lt: cursor } : undefined,
            },
            include: {
                mission: {
                    include: {
                        store: true
                    }
                }
            },
            orderBy: {
                startedAt: 'desc'
            },
            take: 5,
        });
        return userMissionList;
    } catch (err) {
        throw new Error(`사용자 미션 목록 조회 중 오류가 발생했습니다: ${err}`);
    }
};

// 사용자 미션 진행 완료로 바꾸기
export const changeUserMissionStatus = async(userMissionId: number)=>{
    return await prisma.user_mission.update({
        where:{
            id: userMissionId
        },
        data:{
            status: "COMPLETED",
            completedAt: new Date(),
        },
        include:{
            mission:true
        }
    });
};