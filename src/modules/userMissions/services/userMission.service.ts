
import { getMissionById } from "../../missions/repositories/mission.repository.js";
import { getUserMission, addUserMission, getUserMissionsByStatus } from "../repositories/userMission.repository.js";
import { UserMissionAddRequest, responseFromUserMission } from "../dtos/userMission.dto.js";

// 미션 도전하기
export const challengeMission = async (data: UserMissionAddRequest) => {
    // 미션 존재 여부 확인
    const mission = await getMissionById(data.missionId);
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

// 2. 유저 미션 리스트 조회
export const getUserMissions = async (data: { userId: number; status: string }) => {
    if (data.status !== "ONGOING" && data.status !== "COMPLETED") {
        throw new Error("잘못된 상태 값입니다.");
    }

    const missions = await getUserMissionsByStatus(data.userId, data.status);
    const result = [];
    for (const m of missions) {
        result.push(responseFromUserMission(m));
    }

    return result;
};