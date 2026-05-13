import { Controller, Route, Tags, Post, Get, Path, Query, Body } from "tsoa";
import { reviewAdd, listStoreReviews, listUserReviews } from "../services/review.service.js";
import { ReviewItem, ReviewListResponse, ReviewAddBody } from "../dtos/review.dto.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("stores")
@Tags("Review")
export class ReviewController extends Controller {
    
    // 리뷰 추가하기
    // POST /v1/stores/{storeId}/reviews
    @Post("{storeId}/reviews")
    public async handleReviewAdd(
        @Path() storeId: number,
        @Body() body: ReviewAddBody
    ): Promise<ApiResponse<ReviewItem>> {
        const review = await reviewAdd({
            storeId,
            userId: body.userId,
            content: body.content,
            rating: body.rating
        });
        return success(review);
    }

    // 가게 리뷰 목록 조회하기
    // GET /v1/stores/{storeId}/reviews
    @Get("{storeId}/reviews")
    public async handleListStoreReviews(
        @Path() storeId: number,
        @Query() cursor?: number
    ): Promise<ApiResponse<ReviewListResponse>> {
        const reviews = await listStoreReviews(storeId, cursor || 0);
        return success(reviews);
    }
}

// 사용자 리뷰 목록은 Route 분리해서
@Route("users")
@Tags("Review")
export class UserReviewController extends Controller {
    
    // 사용자 리뷰 목록 조회하기
    // GET /v1/users/{userId}/reviews
    @Get("{userId}/reviews")
    public async handleListUserReviews(
        @Path() userId: number,
        @Query() cursor?: number
    ): Promise<ApiResponse<ReviewListResponse>> {
        const reviews = await listUserReviews(userId, cursor || 0);
        return success(reviews);
    }
}