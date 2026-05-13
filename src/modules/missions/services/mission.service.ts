import { MissionAddRequest, MissionItem, MissionListResponse } from "../dtos/mission.dto.js";
import { addMission, getMission, getStoreMissions } from "../repositories/mission.repository.js";
import { getStore } from "../../stores/repositories/store.repository.js";
import { StoreNotFoundError, MissionNotFoundError } from "../../../common/errors/error.js";

// DB 데이터 -> 클라이언트 가공
const toMissionItem = (mission: any): MissionItem => ({
    id: mission.id,
    storeId: mission.storeId,
    name: mission.name,
    reward: mission.reward,
    condition: mission.condition,
    conditionValue: mission.conditionValue,
    startDate: mission.startDate,
    endDate: mission.endDate,
    missionSpec: mission.missionSpec,
    createdAt: mission.createdAt,
    updatedAt: mission.updatedAt
});

// 미션 추가하기
export const missionAdd = async (data: MissionAddRequest): Promise<MissionItem> => {
    const store = await getStore(data.storeId);
    if (!store) {
        throw new StoreNotFoundError("존재하지 않는 가게에는 미션을 추가할 수 없습니다.");
    }

    const missionId = await addMission(data);
    const mission = await getMission(missionId);

    if (!mission) {
        throw new MissionNotFoundError("생성된 미션을 찾을 수 없습니다.", { missionId });
    }

    return toMissionItem(mission);
};

// 가게의 미션 목록 
export const listStoreMissions = async (storeId: number, cursor: number | null): Promise<MissionListResponse> => {
    const store = await getStore(storeId);
    if (!store) {
        throw new StoreNotFoundError("존재하지 않는 가게입니다.", { storeId });
    }

    const missions = await getStoreMissions(storeId, cursor) || [];
    const data = missions.map(toMissionItem);

    return {
        data,
        pagination: {
            cursor: data[data.length - 1]?.id || null,
        },
    };
};