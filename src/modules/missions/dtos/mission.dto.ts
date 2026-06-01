// 미션 생성 요청
export interface MissionAddRequest {
    /** 가게 ID */
    storeId: number;
    /** 미션 이름 */
    name: string;
    /** 보상 포인트 */
    reward: number;
    /** 미션 조건 */
    condition: string;
    /** 조건 값 */
    conditionValue: number;
    /** 미션 시작일 (예: 2024-01-01) */
    startDate: string;
    /** 미션 종료일 (예: 2024-12-31) */
    endDate: string;
    /** 미션 상세 설명 */
    missionSpec: string;
}

// 미션 생성 데이터
export interface MissionAddBody {
    /** 미션 이름 */
    name: string;
    /** 보상 포인트 */
    reward: number;
    /** 미션 조건 */
    condition: string;
    /** 조건 값 */
    conditionValue: number;
    /** 미션 시작일 (예: 2024-01-01) */
    startDate: string;
    /** 미션 종료일 (예: 2024-12-31) */
    endDate: string;
    /** 미션 상세 설명 */
    missionSpec: string;
}

// 단일 미션 응답 형태
export interface MissionItem {
    /** 미션 ID */
    id: number;
    /** 가게 ID */
    storeId: number;
    /** 미션 이름 */
    name: string;
    /** 보상 포인트 */
    reward: number;
    /** 미션 조건 */
    condition: string;
    /** 조건 값 */
    conditionValue: number;
    /** 미션 시작일 */
    startDate: Date;
    /** 미션 종료일 */
    endDate: Date;
    /** 미션 상세 설명 */
    missionSpec: string;
    /** 생성일 */
    createdAt: Date;
    /** 수정일 */
    updatedAt: Date;
}

// 미션 목록 응답
export interface MissionListResponse {
    /** 미션 목록 */
    data: MissionItem[];
    /** 페이지네이션 정보 */
    pagination: {
        /** 다음 페이지 커서 (없으면 null) */
        cursor: number | null;
    };
}