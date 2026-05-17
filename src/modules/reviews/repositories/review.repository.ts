
import { prisma } from "../../../db.config.js";
import { Review } from "../../../generated/prisma/client.js";
import { ReviewAddRequest } from "../dtos/review.dto.js"

// 리뷰 추가
export const addReview = async (data: ReviewAddRequest): Promise<number> => {
    const result = await prisma.review.create({
        data: {
            userId: data.userId,
            storeId: data.storeId,
            content: data.content,
            rating: data.rating
        },
    });
    return result.id;
};

// 단일 리뷰 조회
export const getReview = async (reviewId: number): Promise<Review | null> => {
    return await prisma.review.findUnique({
        where: {
            id: reviewId
        },
    });
};


// 한 가게에 대한 리뷰 목록 조회하기
export const getStoreReviews = async (storeId: number, cursor: number | null) => {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            content: true,
            rating: true,
            createdAt: true,
            user: {
                select: {
                    nickname: true,
                },
            }
        },
        where: {
            storeId,
            id: cursor ? { lt: cursor } : undefined,
        },
        orderBy: {
            id: "desc",
        },
        take: 5,
    });
    return reviews;
};

// 한 사용자에 대한 리뷰 목록 조회하기
export const getUserReviews = async (userId: number, cursor: number | null) => {
    const reviews = await prisma.review.findMany({
        select: {
            id: true,
            content: true,
            rating: true,
            createdAt: true,
            user: {
                select: {
                    nickname: true,
                },
            }
        },
        where: {
            userId,
            id: cursor ? { lt: cursor } : undefined,
        },
        orderBy: {
            id: "desc",
        },
        take: 5, // 한 페이지에 보여줄 개수
    });
    return reviews;

};