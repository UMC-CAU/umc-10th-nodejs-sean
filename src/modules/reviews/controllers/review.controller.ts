import { Controller, Route, Tags, Post, Get, Path, Query, Body, Response, Request, Security } from "tsoa";
import { reviewAdd, listStoreReviews, listUserReviews } from "../services/review.service.js";
import { ReviewItem, ReviewListResponse, ReviewAddBody } from "../dtos/review.dto.js";
import { ApiResponse, success, ErrorResponse } from "../../../common/responses/response.js";

@Route("stores")
@Tags("Review")
export class ReviewController extends Controller {
    
    /**
     * 리뷰 추가 API
     * @summary 가게에 리뷰를 등록합니다.
     * @endpoint POST /v1/stores/{storeId}/reviews
     */
    @Post("{storeId}/reviews")
    @Response<ApiResponse<ReviewItem>>(200, "리뷰 등록 성공")
    @Response<ErrorResponse>(404, "존재하지 않는 가게 또는 유저")
    public async handleReviewAdd(
        @Path() storeId: number,
        @Body() body: Omit<ReviewAddBody, "userId">,
        @Request() request: any
    ): Promise<ApiResponse<ReviewItem>> {
        const userId = (request.user as any).id;  // JWT에서 추출
        const review = await reviewAdd({
            storeId,
            userId,
            content: body.content,
            rating: body.rating
        });
        return success(review);
    }

    /**
     * 가게 리뷰 목록 조회 API
     * @summary 특정 가게의 리뷰 목록을 조회합니다.
     * @endpoint GET /v1/stores/{storeId}/reviews
     */
    @Get("{storeId}/reviews")
    @Response<ApiResponse<ReviewListResponse>>(200, "가게 리뷰 목록 조회 성공")
    @Response<ErrorResponse>(404, "존재하지 않는 가게")
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
    
    /**
     * 유저 리뷰 목록 조회 API
     * @summary 특정 유저의 리뷰 목록을 조회합니다.
     * @endpoint GET /v1/users/me/reviews
     */
    @Get("me/reviews")
    @Response<ApiResponse<ReviewListResponse>>(200, "유저 리뷰 목록 조회 성공")
    @Response<ErrorResponse>(404, "존재하지 않는 유저")
    public async handleListUserReviews(
        @Request() request: any,
        @Query() cursor?: number
    ): Promise<ApiResponse<ReviewListResponse>> {
        const userId = (request.user as any).id;
        const reviews = await listUserReviews(userId, cursor || 0);
        return success(reviews);
    }
}