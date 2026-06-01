
import { getMission } from "../../missions/repositories/mission.repository.js";
import { getUserMission, addUserMission, getUserMissionById, getUserMissionsByStatus, changeUserMissionStatus } from "../repositories/userMission.repository.js";
import { UserMissionAddRequest, UserMissionItem, UserMissionListResponse } from "../dtos/userMission.dto.js";
import { MissionNotFoundError, UserMissionNotFoundError, DuplicateUserMissionError, InvalidStatusError } from "../../../common/errors/error.js";

// DB 데이터 -> 클라이언트 데이터 가공
const toUserMissionItem = (um: any): UserMissionItem => ({
    id: um.id,
    userId: um.userId,
    missionId: um.missionId,
    missionName: um.mission?.name || null, 
    status: um.status,
    startedAt: um.startedAt,
    completedAt: um.completedAt,
    progressCount: um.progressCount,
    rewardPoint: um.rewardPoint,
    endDate: um.endDate
});

// 미션 도전하기
export const challengeMission = async (data: UserMissionAddRequest): Promise<UserMissionItem> => {
    const mission = await getMission(data.missionId);
    if (!mission) {
        throw new MissionNotFoundError("존재하지 않는 미션입니다.", { missionId: data.missionId });
    }

    const existing = await getUserMission(data.userId, data.missionId);
    if (existing) { // 진행 중인 상태라면 에러 발생
        if (existing.status === "ONGOING") {
            throw new DuplicateUserMissionError("이미 도전 중인 미션입니다.", { userId: data.userId, missionId: data.missionId });
        }
    }

    // 새 미션 도전 추가
    await addUserMission(data.userId, data.missionId);

    const newUserMission = await getUserMission(data.userId, data.missionId);
    if (!newUserMission) {
        throw new UserMissionNotFoundError("미션 도전 등록 후 정보를 불러오는 데 실패했습니다.", { userId: data.userId, missionId: data.missionId });
    }

    return toUserMissionItem(newUserMission);
};

// 미션 완료 처리하기
export const completeUserMission = async(userMissionId: number)=>{
    const exists = await getUserMissionById(userMissionId);
    if (!exists) {
        throw new UserMissionNotFoundError("존재하지 않는 사용자 미션 ID입니다.", { userMissionId });
    }
    if (exists.status === "COMPLETED") {
        throw new DuplicateUserMissionError("이미 완료된 미션입니다.", { userMissionId });
    }
    const updatedUserMission = await changeUserMissionStatus(userMissionId);
    return toUserMissionItem(updatedUserMission);
};

// 유저 미션 목록 조회
export const listUserMissions = async (userId: number, status: string, cursor: number | null): Promise<UserMissionListResponse> => {
    if (status !== "ONGOING" && status !== "COMPLETED") {
        throw new InvalidStatusError("잘못된 상태 값입니다.", { status });
    }

    const userMissions = await getUserMissionsByStatus(userId, status, cursor);
    const data: UserMissionItem[] = userMissions.map(toUserMissionItem);

    return {
        data,
        pagination: {
            cursor: data[data.length - 1]?.id || null,
        },
    };
};
