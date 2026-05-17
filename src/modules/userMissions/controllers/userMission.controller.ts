import { Controller, Route, Tags, Post, Get, Path, Query, Response } from "tsoa";
import { challengeMission, completeUserMission, listUserMissions } from "../services/userMission.service.js";
import { UserMissionItem, UserMissionListResponse } from "../dtos/userMission.dto.js";
import { ApiResponse, success, ErrorResponse } from "../../../common/responses/response.js";

@Route("users")
@Tags("UserMission")
export class UserMissionController extends Controller {
    
     /**
     * 미션 도전 API
     * @summary 유저가 특정 미션에 도전합니다.
     * @endpoint POST /v1/users/{userId}/missions/{missionId}/challenge
     */
    @Post("{userId}/missions/{missionId}/challenge")
    @Response<ApiResponse<UserMissionItem>>(200, "미션 도전 성공")
    @Response<ErrorResponse>(404, "존재하지 않는 유저 또는 미션")
    @Response<ErrorResponse>(409, "이미 도전 중인 미션")
    public async handleChallengeMission(
        @Path() userId: number,
        @Path() missionId: number
    ): Promise<ApiResponse<UserMissionItem>> {
        const userMission = await challengeMission({ userId,  missionId });
        return success(userMission);
    }

     /**
     * 유저별 미션 목록 조회 API
     * @summary 유저의 미션 목록을 조회합니다.
     * @endpoint GET /v1/users/{userId}/missions
     */
    @Get("{userId}/missions")
    @Response<ApiResponse<UserMissionListResponse>>(200, "미션 목록 조회 성공")
    @Response<ErrorResponse>(404, "존재하지 않는 유저")
    public async handleGetUserMissions(
        @Path() userId: number,
        /** 미션 상태 (예: ONGOING, COMPLETE) */
        @Query() status: string = "ONGOING",
        /** 커서 기반 페이지네이션 */
        @Query() cursor?: number
    ): Promise<ApiResponse<UserMissionListResponse>> {
        const userMissions = await listUserMissions(userId, status, cursor || 0);
        return success(userMissions);
    }

    /**
     * 미션 완료 처리 API
     * @summary 진행 중인 미션을 완료 처리합니다.
     * @endpoint POST /v1/users/missions/{userMissionId}/complete
     */
    @Post("missions/{userMissionId}/complete")
    @Response<ApiResponse<UserMissionItem>>(200, "미션 완료 성공")
    @Response<ErrorResponse>(404, "존재하지 않는 유저 미션")
    @Response<ErrorResponse>(400, "미션 상태 오류")
    public async handleCompleteUserMission(
        @Path() userMissionId: number
    ): Promise<ApiResponse<UserMissionItem>> {
        const userMission = await completeUserMission(userMissionId);
        return success(userMission);
    }
}