// 리뷰 생성 요청
export interface ReviewAddRequest {
    /** 유저 ID */
    userId: number;
    /** 가게 ID */
    storeId: number;
    /** 리뷰 내용 */
    content: string;
    /** 평점 (1~5) */
    rating: number;
}

// 리뷰 생성 데이터
export interface ReviewAddBody {
    /** 유저 ID */
    userId: number;
    /** 리뷰 내용 */
    content: string;
    /** 평점 (1~5) */
    rating: number;
}

// 단일 리뷰 응답 형태
export interface ReviewItem {
    /** 리뷰 ID */
    id: number;
    /** 유저 ID */
    userId: number;
    /** 가게 ID */
    storeId: number;
    /** 리뷰 내용 */
    content: string;
    /** 평점 (1~5) */
    rating: number;
    /** 생성일 */
    createdAt: Date;
    /** 수정일 */
    updatedAt: Date;
}

// 리뷰 목록 응답
export interface ReviewListResponse {
    /** 리뷰 목록 */
    data: ReviewItem[];
    /** 페이지네이션 정보 */
    pagination: {
        /** 다음 페이지 커서 (없으면 null) */
        cursor: number | null;
    };
}