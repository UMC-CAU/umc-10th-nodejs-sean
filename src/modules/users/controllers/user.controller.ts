import { Body, Controller, Post, Patch, Route, Tags, Response, Request, Security } from "tsoa";
import { UserSignUpRequest, UserSignUpResponse, UserUpdateRequest, UserUpdateResponse } from "../dtos/user.dto.js";
import { userSignUp, userUpdate } from "../services/user.service.js";
import { ApiResponse, success, ErrorResponse } from "../../../common/responses/response.js";
import express from "express";

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
        
    /**
     * 사용자 정보 수정 API
     * @summary 로그인한 사용자의 정보를 수정합니다.
     * @endpoint PATCH /v1/users/me
     */
    @Patch("me")
    @Response<ApiResponse<UserUpdateResponse>>(200, "사용자 정보 수정 성공")
    @Response<ErrorResponse>(404, "존재하지 않는 사용자")
    public async handleUserUpdate(
        @Body() body: UserUpdateRequest,
        @Request() request: any
    ): Promise<ApiResponse<UserUpdateResponse>> {
        const userId = (request.user as any).id;
        const user = await userUpdate(userId, body);
        return success(user);
    }
}
