import { Controller, Route, Tags, Post, Get, Path, Query } from "tsoa";
import { challengeMission, completeUserMission, listUserMissions } from "../services/userMission.service.js";
import { UserMissionItem, UserMissionListResponse } from "../dtos/userMission.dto.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("users")
@Tags("UserMission")
export class UserMissionController extends Controller {
    
    // 미션 도전하기
    // POST /v1/users/{userId}/missions/{missionId}/challenge
    @Post("{userId}/missions/{missionId}/challenge")
    public async handleChallengeMission(
        @Path() userId: number,
        @Path() missionId: number
    ): Promise<ApiResponse<UserMissionItem>> {
        const userMission = await challengeMission({ userId,  missionId });
        return success(userMission);
    }

    // 유저별 미션 리스트 조회하기
    // GET /v1/users/{userId}/missions?status=ONGOING&cursor=0
    @Get("{userId}/missions")
    public async handleGetUserMissions(
        @Path() userId: number,
        @Query() status: string = "ONGOING",
        @Query() cursor?: number
    ): Promise<ApiResponse<UserMissionListResponse>> {
        const userMissions = await listUserMissions(userId, status, cursor || 0);
        return success(userMissions);
    }

    // 미션 완료 처리하기
    // POST /v1/users/missions/{userMissionId}/complete
    @Post("missions/{userMissionId}/complete")
    public async handleCompleteUserMission(
        @Path() userMissionId: number
    ): Promise<ApiResponse<UserMissionItem>> {
        const userMission = await completeUserMission(userMissionId);
        return success(userMission);
    }
}