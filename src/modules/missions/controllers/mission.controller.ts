import { Controller, Route, Tags, Post, Get, Path, Query, Body } from "tsoa";
import { missionAdd, listStoreMissions } from "../services/mission.service.js";
import { MissionItem, MissionListResponse, MissionAddBody } from "../dtos/mission.dto.js";

@Route("stores")
@Tags("Mission")
export class MissionController extends Controller {

    // 미션 추가하기
    // POST /v1/stores/{storeId}/missions     
    @Post("{storeId}/missions")
    public async handleMissionAdd(
        @Path() storeId: number,
        @Body() body: MissionAddBody
    ): Promise<MissionItem> {
        return await missionAdd({
            storeId,
            ...body
        });
    }

    // 미션 조회하기
    // GET /v1/stores/{storeId}/missions)   
    @Get("{storeId}/missions")
    public async handleListStoreMissions(
        @Path() storeId: number,
        @Query() cursor?: number
    ): Promise<MissionListResponse> {
        return await listStoreMissions(storeId, cursor || 0);
    }
}