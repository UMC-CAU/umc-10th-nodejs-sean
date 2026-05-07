
import { ReviewAddRequest, ReviewListResponse, responseFromReview, responseFromReviewList } from "../dtos/review.dto.js";
import { addReview, getReview, getStoreReviews, getUserReviews } from "../repositories/review.repository.js";
import { getStore } from "../../stores/repositories/store.repository.js";

export const reviewAdd = async (data: ReviewAddRequest) => {
    // 가게가 실제 존재하는지 확인
    const store = await getStore(data.storeId);
    
    if(!store){
        throw new Error("존재하지 않는 가게입니다.");
    }
    const reviewId = await addReview(data);
    const review = await getReview(reviewId);

    return responseFromReview(review);
}

export const listStoreReviews = async ( storeId: number, cursor: number | null ): Promise<ReviewListResponse> => {
    const reviews = await getStoreReviews(storeId, cursor);
    return responseFromReviewList(reviews);
};

export const listUserReviews = async ( userId: number, cursor: number | null ): Promise<ReviewListResponse> => {
    const reviews = await getUserReviews(userId, cursor);
    return responseFromReviewList(reviews);
};