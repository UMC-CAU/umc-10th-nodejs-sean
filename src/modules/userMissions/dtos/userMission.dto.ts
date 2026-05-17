// 사용자 미션 생성 요청
export interface UserMissionAddRequest {
  userId: number;
  missionId: number;
}

// 단일 사용자 미션 응답 형태
export interface UserMissionItem {
    id: number;
    userId: number;
    missionId: number;
    missionName: string | null;
    status: string;
    startedAt: Date;
    completedAt: Date | null;
    progressCount: number;
    rewardPoint: number;
    endDate: Date | null;
}

// 사용자 미션 목록 응답
export interface UserMissionListResponse {
    data: UserMissionItem[];
    pagination: {
        cursor: number | null;
    };
}