// 미션 생성 요청
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

// 단일 미션 응답 형태
export interface MissionItem {
    id: number;
    storeId: number;
    name: string;
    reward: number;
    condition: string;
    conditionValue: number;
    startDate: Date;
    endDate: Date;
    missionSpec: string;
    createdAt: Date;
    updatedAt: Date;
}

// 미션 목록 응답
export interface MissionListResponse {
    data: MissionItem[];
    pagination: {
        cursor: number | null;
    };
}

// 미션 데이터 가공
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

// 단일 미션 DTO
export const responseFromMission = (mission: any) => {
    return {
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
    };
};

// 미션 목록 DTO
export const responseFromMissionList = (missions: any[]): MissionListResponse => {
    const missionItems = missions.map(responseFromMission);
    const lastMission = missionItems[missionItems.length - 1];

    return {
        data: missionItems,
        pagination: {
            cursor: lastMission ? lastMission.id : null,
        },
    };
};