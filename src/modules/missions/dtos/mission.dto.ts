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

// 미션 생성 데이터
export interface MissionAddBody {
    name: string;
    reward: number;
    condition: string;
    conditionValue: number;
    startDate: string;
    endDate: string;
    missionSpec: string;
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
