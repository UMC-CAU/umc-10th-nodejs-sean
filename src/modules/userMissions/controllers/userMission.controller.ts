
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { challengeMission, completeUserMission, listUserMissions } from "../services/userMission.service.js";
import { responseFromUserMission, responseFromUserMissionList } from "../dtos/userMission.dto.js";

// 미션 도전하기
export const handleChallengeMission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const missionId = Number(req.params.missionId);
        const userId = Number(req.params.userId);
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
        const userId = parseInt(req.params.userId as string, 10);
        const status = (req.query.status as string) || "ONGOING";
        const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor,10): 0;
        const userMissions = await listUserMissions(userId, status, cursor);

        return res.status(StatusCodes.OK).json({ 
            isSuccess: true,
            message: "미션 리스트 조회에 성공했습니다",
            result: userMissions
        });

    } catch (err: any) {
        next(err);
    }
};

export const handleCompleteUserMission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userMissionId = parseInt(req.params.userMissionId as string, 10);
        const userMission = await completeUserMission(userMissionId);

        res.status(StatusCodes.OK).json({
            isSuccess: true,
            message: "미션을 성공적으로 완료했습니다.",
            result: userMission
        });
    } catch (err) {
        next(err);
    }
};