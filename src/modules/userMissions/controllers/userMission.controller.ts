
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { challengeMission, getUserMissions } from "../services/userMission.service.js";
import { responseFromUserMission, responseFromUserMissionList } from "../dtos/userMission.dto.js";

// 미션 도전하기
export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const missionId = Number(req.params.missionId);
        const userId = 1;
        const userMission = await challengeMission({
            userId,
            missionId,
        });

        return res.status(StatusCodes.CREATED).json({
            isSuccess: true,
            message: "미션을 도전합니다.",
            result: responseFromUserMission(userMission)
        });
    } catch (err: any) {
        const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({
            isSuccess: false,
            message: err.message || "서버 내부 오류가 발생했습니다.",
            result: null
        });
    }
};

// 미션 리스트 조회
export const handleGetUserMissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = 1;
        const status = (req.query.status as string) || "ONGOING";

        const missions = await getUserMissions({
            userId,
            status,
        });

        return res.status(StatusCodes.OK).json({ 
            isSuccess: true,
            message: "미션 리스트 조회에 성공했습니다",
            result: responseFromUserMissionList(missions)
        });

    } catch (err: any) {
        const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json({
            isSuccess: false,
            message: err.message || "서버 내부 오류가 발생했습니다.",
            result: null
        });
    }
};