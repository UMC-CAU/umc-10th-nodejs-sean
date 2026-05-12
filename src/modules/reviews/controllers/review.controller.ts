import { Controller, Route, Tags, Post, Get, Path, Query, Body } from "tsoa";
import { reviewAdd, listStoreReviews, listUserReviews } from "../services/review.service.js";
import { ReviewItem, ReviewListResponse, ReviewAddBody } from "../dtos/review.dto.js";

@Route("stores")
@Tags("Review")
export class ReviewController extends Controller {
    
    // 리뷰 추가하기
    // POST /v1/stores/{storeId}/reviews
    @Post("stores/{storeId}")
    public async handleReviewAdd(
        @Path() storeId: number,
        @Body() body: ReviewAddBody
    ): Promise<ReviewItem> {
        
        return await reviewAdd({
            storeId,
            userId: body.userId,
            content: body.content,
            rating: body.rating
        });
    }

    // 가게 리뷰 목록 조회하기
    // GET /v1/stores/{storeId}/reviews
    @Get("stores/{storeId}")
    public async handleListStoreReviews(
        @Path() storeId: number,
        @Query() cursor?: number
    ): Promise<ReviewListResponse> {
        return await listStoreReviews(storeId, cursor || 0);
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
    ): Promise<ReviewListResponse> {
        return await listUserReviews(userId, cursor || 0);
    }
}