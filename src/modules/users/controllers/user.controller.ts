import { Body, Controller, Post, Route, Tags, SuccessResponse } from "tsoa";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { ApiResponse, success } from "../../../common/responses/response.js";


@Route("users")
@Tags("Users")
export class UserController extends Controller {
    
    // 회원가입하기
    // POST /v1/users/signup
    @Post("signup")
    @SuccessResponse("200", "OK")
    public async handleUserSignUp(
        @Body() body: UserSignUpRequest
    ): Promise<ApiResponse<UserSignUpResponse>> {
        console.log("회원가입을 요청했습니다!");
        console.log("body:", body);

        const user = await userSignUp(body);

        return success(user);
    }
}
