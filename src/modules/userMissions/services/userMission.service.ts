
import { getMission } from "../../missions/repositories/mission.repository.js";
import { getUserMission, addUserMission, getUserMissionById, getUserMissionsByStatus, changeUserMissionStatus } from "../repositories/userMission.repository.js";
import { UserMissionAddRequest, responseFromUserMission, responseFromUserMissionList } from "../dtos/userMission.dto.js";

// 미션 도전하기
export const challengeMission = async (data: UserMissionAddRequest) => {
    // 미션 존재 여부 확인
    const mission = await getMission(data.missionId);
    if (!mission) {
        throw new Error("존재하지 않는 미션입니다.");
    }

    // 이미 도전하고 있는지 확인
    const existing = await getUserMission(data.userId, data.missionId);
    if (existing) { // 진행 중인 상태라면 에러 발생
        if (existing.status === "ONGOING") {
            throw new Error("이미 도전 중인 미션입니다.");
        }
    }

    // 새 미션 도전 추가
    await addUserMission(data.userId, data.missionId);

    const created = await getUserMission(data.userId, data.missionId);
    return responseFromUserMission(created);
};

export const completeUserMission = async(userMissionId: number)=>{
    const exists = await getUserMissionById(userMissionId);

    if (!exists) {
        throw new Error("존재하지 않는 사용자 미션 ID입니다.");
    }
    if (exists.status === "COMPLETED") {
        throw new Error("이미 완료된 미션입니다.");
    }
    const updatedMission = await changeUserMissionStatus(userMissionId);
    return responseFromUserMission(updatedMission);
};

// 2. 유저 미션 목록 조회
export const listUserMissions = async (userId: number, status: string, cursor: number | null) => {
    if (status !== "ONGOING" && status !== "COMPLETED") {
        throw new Error("잘못된 상태 값입니다.");
    }

    const userMissions = await getUserMissionsByStatus(userId, status, cursor);
    return responseFromUserMissionList(userMissions);
};
