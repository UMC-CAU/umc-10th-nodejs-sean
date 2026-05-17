import { Controller, Route, Tags, Post, Body, Response } from "tsoa";
import { storeAdd } from "../services/store.service.js";
import { StoreAddRequest, StoreResponse } from "../dtos/store.dto.js";
import { ApiResponse, success, ErrorResponse } from "../../../common/responses/response.js";

@Route("stores")
@Tags("Store")
export class StoreController extends Controller {
    
    /**
     * 가게 추가 API
     * @summary 새로운 가게를 등록합니다.
     * @endpoint POST /v1/stores
     */
    @Post("/")
    @Response<ApiResponse<StoreResponse>>(200, "가게 등록 성공")
    @Response<ErrorResponse>(404, "존재하지 않는 지역")
    @Response<ErrorResponse>(409, "이미 등록된 가게")
    public async handleStoreAdd(
        @Body() body: StoreAddRequest
    ): Promise<ApiResponse<StoreResponse>> {
        const store = await storeAdd(body);
        return success(store);
    }
}