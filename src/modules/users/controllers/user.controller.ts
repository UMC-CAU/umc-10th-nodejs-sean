
import { Request, Response, NextFunction, response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUser, responseFromUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req: Request, res: Response, next: NextFunction ) => {
    console.log("회원가입을 요청했습니다");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    
    try{
        const user = await userSignUp(bodyToUser(req.body));

        res.status(StatusCodes.CREATED).json({
            isSuccess: true,
            message: "회원가입이 완료되었습니다.",
            result: responseFromUser({user: user, preferences: user.preferCategories})
        });
    } catch (error: any){
        res.status(StatusCodes.BAD_REQUEST).json({
            isSuccess: false,
            message: error.message || "회원가입 중 오류가 발생했습니다."
        });
    }
};