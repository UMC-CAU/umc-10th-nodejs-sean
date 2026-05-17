// 리뷰 생성 요청
export interface ReviewAddRequest {
    userId: number;
    storeId: number;
    content: string;
    rating: number;
}

// 리뷰 생성 데이터
export interface ReviewAddBody {
    userId: number;
    content: string;
    rating: number;
}

// 단일 리뷰 응답 형태
export interface ReviewItem {
    id: number;
    userId: number;
    storeId: number;
    content: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

// 리뷰 목록 응담
export interface ReviewListResponse {
    data: ReviewItem[];
    pagination: {
        cursor: number | null;
    };
}

