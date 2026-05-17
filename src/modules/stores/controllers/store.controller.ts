import { Controller, Route, Tags, Post, Body } from "tsoa";
import { storeAdd } from "../services/store.service.js";
import { StoreAddRequest, StoreResponse } from "../dtos/store.dto.js";
import { ApiResponse, success } from "../../../common/responses/response.js";
@Route("stores")
@Tags("Store")
export class StoreController extends Controller {
    
    // 가게 추가하기
    // POST /v1/stores/
    @Post("/")
    public async handleStoreAdd(@Body() body: StoreAddRequest
    ): Promise<ApiResponse<StoreResponse>> {
        const store = await storeAdd(body);
        return success(store);
    }
}