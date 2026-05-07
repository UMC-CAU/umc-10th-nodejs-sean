
import {  Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { reviewAdd, listStoreReviews, listUserReviews } from "../services/review.service.js";

// 리뷰 추가하기
export const handleReviewAdd = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { storeId } = req.params; // url 경로에서 storeId 가져오기
        const userId = 1; // 작성자 고정
        const result = await reviewAdd({
            userId: userId,
            storeId: Number(storeId),
            content: req.body.content,
            rating: req.body.rating,
        });
        return res.status(StatusCodes.CREATED).json({ 
            isSuccess: true,
            message: "리뷰가 성공적으로 등록되었습니다.",
            result });
    } catch (err: any) {
        if (err.message === "존재하지 않는 가게입니다.") {
            return res.status(StatusCodes.NOT_FOUND).json({
            isSuccess: false,
            message: err.message
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      isSuccess: false,
      message: err.message
      // "서버 오류가 발생했습니다."
    });
  }
};

// 가게 리뷰목록
export const handleListStoreReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const storeId = parseInt(req.params.storeId as string, 10);
        const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor,10): 0;
        const reviews = await listStoreReviews(storeId, cursor);

        res.status(StatusCodes.OK).json(reviews);
    } catch (err) {
        next(err);
    }
}

// 사용자 리뷰목록
export const handleListUserReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId as string, 10);
        const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor,10): 0;
        const reviews = await listUserReviews(userId, cursor);

        res.status(StatusCodes.OK).json(reviews);
    } catch (err) {
        next(err);
    }
}