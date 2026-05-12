import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

@Route("users")
@Tags("User")
export class UserController extends Controller {
    
    // 회원가입하기
    // POST /v1/users/signup
    @Post("signup")
    @SuccessResponse("200", "OK")
    public async handleUserSignUp(
        @Body() body: UserSignUpRequest
    ): Promise<{ result: UserSignUpResponse }> {
        console.log("회원가입을 요청했습니다!");
        console.log("body:", body);

        const user = await userSignUp(body);

        return { result: user };
    }
}