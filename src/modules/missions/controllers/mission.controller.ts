
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToMission, responseFromMission } from "../dtos/mission.dto.js";
import { missionAdd } from "../services/mission.service.js";

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