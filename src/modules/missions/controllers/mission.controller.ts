
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToMission, responseFromMission } from "../dtos/mission.dto.js";
import { missionAdd, listStoreMissions } from "../services/mission.service.js";

// 미션 추가하기
export const handleMissionAdd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { storeId } = req.params;        
        const mission = await missionAdd(bodyToMission(req.body, Number(storeId)));

        res.status(StatusCodes.CREATED).json({ 
            isSuccess: true,
            message: "미션이 성공적으로 등록되었습니다.",
            result: responseFromMission(mission)
        });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ 
            isSuccess: false, 
            message: error.message || "미션 등록에 실패했습니다."
        });
    }
};

// 가게 미션목록
export const handleListStoreMissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const storeId = parseInt(req.params.storeId as string, 10);
        const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor,10): 0;
        const missions = await listStoreMissions(storeId, cursor);

        res.status(StatusCodes.OK).json(missions);
    } catch (err) {
        next(err);
    }
}