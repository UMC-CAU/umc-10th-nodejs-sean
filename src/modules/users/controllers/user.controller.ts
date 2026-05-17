import { Body, Controller, Post, Route, Tags, Response } from "tsoa";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { ApiResponse, success, ErrorResponse } from "../../../common/responses/response.js";


@Route("users")
@Tags("Users")
export class UserController extends Controller {
    
    /**
   * 회원가입 API
   * @summary 회원가입을 처리하는 엔드포인트입니다.
   * @endpoint POST /v1/users/signup
   */
    @Post("signup")
    @Response<ApiResponse<UserSignUpResponse>>(200, "회원가입 성공")
    @Response<ErrorResponse>(409, "중복된 이메일 에러")
    public async handleUserSignUp(
        @Body() body: UserSignUpRequest
    ): Promise<ApiResponse<UserSignUpResponse>> {
        console.log("회원가입을 요청했습니다!");
        console.log("body:", body);

        const user = await userSignUp(body);

        return success(user);
    }
}
