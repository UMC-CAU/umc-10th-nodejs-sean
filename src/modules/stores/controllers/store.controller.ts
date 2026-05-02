
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToStore, responseFromStore } from "../dtos/store.dto.js";
import { storeAdd } from "../services/store.service.js";

export const handleStoreAdd = async (req: Request, res: Response, next: NextFunction) => {
    console.log("가게 추가 요청");
    console.log("body:", req.body);

    try {
        const store = await storeAdd(bodyToStore(req.body));

        res.status(StatusCodes.CREATED).json({
            isSuccess: true,
            message: "가게가 성공적으로 추가되었습니다.",
            result: responseFromStore(store)
        });
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({
            isSuccess: false,
            message: error.message || "가게 추가에 실패했습니다."
        });
    }
};