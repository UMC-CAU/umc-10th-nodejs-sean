import { Controller, Route, Tags, Post, Get, Path, Query, Body } from "tsoa";
import { missionAdd, listStoreMissions } from "../services/mission.service.js";
import { MissionItem, MissionListResponse, MissionAddBody } from "../dtos/mission.dto.js";
import { ApiResponse, success } from "../../../common/responses/response.js";

@Route("stores")
@Tags("Mission")
export class MissionController extends Controller {

    // 미션 추가하기
    // POST /v1/stores/{storeId}/missions     
    @Post("{storeId}/missions")
    public async handleMissionAdd(
        @Path() storeId: number,
        @Body() body: MissionAddBody
    ): Promise<ApiResponse<MissionItem>> {
        const mission = await missionAdd({ storeId, ...body });
        return success(mission);
    }

    // 미션 조회하기
    // GET /v1/stores/{storeId}/missions)   
    @Get("{storeId}/missions")
    public async handleListStoreMissions(
        @Path() storeId: number,
        @Query() cursor?: number
    ): Promise<ApiResponse<MissionListResponse>> {
        const mission = await listStoreMissions(storeId, cursor || 0);
        return success(mission);
    }
}