
import { MissionAddRequest, responseFromMission } from "../dtos/mission.dto.js";
import { addMission, getMissionById } from "../repositories/mission.repository.js";
import { getStore } from "../../stores/repositories/store.repository.js";

export const missionAdd = async (data: MissionAddRequest) => {
    // 가게가 존재하는지 확인
    const store = await getStore(data.storeId);

    if (!store) {
        throw new Error("존재하지 않는 가게에는 미션을 추가할 수 없습니다.");
    }

    // 미션 저장
    const missionId = await addMission(data);
    const mission = await getMissionById(missionId);

    return responseFromMission(mission);
};