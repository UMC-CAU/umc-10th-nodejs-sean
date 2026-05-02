
export interface MissionAddRequest {
    storeId: number;
    name: string;
    reward: number;
    condition: string; // 미션 조건
    conditionValue: number; // 조건 값
    startDate: string;
    endDate: string;
    missionSpec: string; // 미션 상세 설명
}

export const bodyToMission = (body: any, storeId: number): MissionAddRequest => {
    return {
        storeId: storeId,
        name: body.name,
        reward: body.reward,
        condition: body.condition,
        conditionValue: body.conditionValue,
        startDate: body.startDate,
        endDate: body.endDate,
        missionSpec: body.missionSpec
    };
};

export const responseFromMission = (mission: any) => {
    return {
        id: mission.id,
        storeId: mission.store_id,
        name: mission.name,
        reward: mission.reward,
        condition: mission.condition,
        conditionValue: mission.condition_value,
        startDate: mission.start_date,
        endDate: mission.end_date,
        missionSpec: mission.mission_spec,
        createdAt: mission.created_at,
        updatedAt: mission.updated_at
    };
};