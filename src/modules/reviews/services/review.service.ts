
import { ReviewAddRequest, ReviewItem, ReviewListResponse  } from "../dtos/review.dto.js";
import { addReview, getReview, getStoreReviews, getUserReviews } from "../repositories/review.repository.js";
import { getStore } from "../../stores/repositories/store.repository.js";

// DB 데이터 -> 클라이언트 가공
const toReviewItem = (review: any): ReviewItem => ({
    id: review.id,
    userId: review.userId,
    storeId: review.storeId,
    content: review.content,
    rating: review.rating,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt
});

// 리뷰 추가하기
export const reviewAdd = async (data: ReviewAddRequest): Promise<ReviewItem> => {
    const store = await getStore(data.storeId);
    if (!store) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    const reviewId = await addReview(data);
    const review = await getReview(reviewId);

    return toReviewItem(review);
};

// 가게의 리뷰 목록 조회하기
export const listStoreReviews = async (storeId: number, cursor: number | null): Promise<ReviewListResponse> => {
    const reviews = await getStoreReviews(storeId, cursor) || [];
    const data = reviews.map(toReviewItem);

    return {
        data,
        pagination: {
            cursor: data[data.length - 1]?.id || null,
        },
    };
};

// 사용자의 리뷰 목록 조회하기
export const listUserReviews = async (userId: number, cursor: number | null): Promise<ReviewListResponse> => {
    const reviews = await getUserReviews(userId, cursor) || [];
    const data = reviews.map(toReviewItem);

    return {
        data,
        pagination: {
            cursor: data[data.length - 1]?.id || null,
        },
    };
};