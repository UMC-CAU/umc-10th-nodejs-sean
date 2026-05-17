// 사용자 미션 생성 요청
export interface UserMissionAddRequest {
  /** 유저 ID */
    userId: number;
    /** 미션 ID */
    missionId: number;
}

// 단일 사용자 미션 응답 형태
export interface UserMissionItem {
    /** 사용자 미션 ID */
    id: number;
    /** 유저 ID */
    userId: number;
    /** 미션 ID */
    missionId: number;
    /** 미션 이름 */
    missionName: string | null;
    /** 미션 상태 (예: ONGOING, COMPLETE) */
    status: string;
    /** 미션 시작일 */
    startedAt: Date;
    /** 미션 완료일 */
    completedAt: Date | null;
    /** 미션 진행 횟수 */
    progressCount: number;
    /** 미션 보상 포인트 */
    rewardPoint: number;
    /** 미션 종료일 */
    endDate: Date | null;
}

// 사용자 미션 목록 응답
export interface UserMissionListResponse {
    /** 사용자 미션 목록 */
    data: UserMissionItem[];
    /** 페이지네이션 정보 */
    pagination: {
        /** 다음 페이지 커서 (없으면 null) */
        cursor: number | null;
    };
}