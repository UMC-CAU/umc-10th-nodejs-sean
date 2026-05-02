
export interface ReviewAddRequest {
    userId: number;
    storeId: number;
    body: string;
    rating: number;
}

export const responseFromReview = (review: any) => {
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