// 리뷰 생성 요청
export interface ReviewAddRequest {
    userId: number;
    storeId: number;
    body: string;
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

// 단일 리뷰 DTO
export const responseFromReview = (review: any): ReviewItem => {
    return {
        id: review.id,
        userId: review.user_id,
        storeId: review.store_id,
        content: review.body,
        rating: review.rating,
        createdAt: review.created_at,
        updatedAt: review.updated_at
    };
};

// 리뷰 목록 DTO
export const responseFromReviewList = (reviews: any[]): ReviewListResponse => {
    const reviewItems = reviews.map(responseFromReview);
    const lastReview = reviewItems[reviewItems.length - 1];

    return {
        data: reviewItems,
        pagination: {
            cursor: lastReview ? lastReview.id : null,
        },
    };
};