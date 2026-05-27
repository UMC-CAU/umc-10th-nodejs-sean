import { Controller, Route, Tags, Post, Get, Path, Query, Body, Response, Security } from "tsoa";
import { missionAdd, listStoreMissions } from "../services/mission.service.js";
import { MissionItem, MissionListResponse, MissionAddBody } from "../dtos/mission.dto.js";
import { ApiResponse, success, ErrorResponse } from "../../../common/responses/response.js";

@Route("stores")
@Tags("Mission")
export class MissionController extends Controller {

    /**
     * 미션 추가 API
     * @summary 가게에 새로운 미션을 등록합니다.
     * @endpoint POST /v1/stores/{storeId}/missions
     */   
    @Post("{storeId}/missions")
    @Response<ApiResponse<MissionItem>>(200, "미션 등록 성공")
    @Response<ErrorResponse>(404, "존재하지 않는 가게")
    public async handleMissionAdd(
        @Path() storeId: number,
        @Body() body: MissionAddBody
    ): Promise<ApiResponse<MissionItem>> {
        const mission = await missionAdd({ storeId, ...body });
        return success(mission);
    }

    /**
     * 가게 미션 목록 조회 API
     * @summary 특정 가게의 미션 목록을 조회합니다.
     * @endpoint GET /v1/stores/{storeId}/missions
     */   
    @Get("{storeId}/missions")
    @Response<ApiResponse<MissionListResponse>>(200, "미션 목록 조회 성공")
    @Response<ErrorResponse>(404, "존재하지 않는 가게")
    public async handleListStoreMissions(
        @Path() storeId: number,
        @Query() cursor?: number
    ): Promise<ApiResponse<MissionListResponse>> {
        const mission = await listStoreMissions(storeId, cursor || 0);
        return success(mission);
    }
}