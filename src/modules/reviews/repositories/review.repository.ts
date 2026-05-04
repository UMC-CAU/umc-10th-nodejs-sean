
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { prisma } from "../../../db.config.js";

// 리뷰 저장
export const addReview = async (data: any): Promise<number> => {
    try {
        const result = await prisma.review.create({
            data: {
                user_id: data.userId, 
                store_id: data.storeId, 
                body: data.body,
                rating: data.rating
            },
        });
        return result.id;
    } catch(err){
        throw new Error(`리뷰 저장 중 오류가 발생했습니다: ${err}`);
    }
};

// 단일 리뷰 조회
export const getReview = async (reviewId: number): Promise<any> => {
   try {
        return await prisma.review.findUnique({
            where: { 
                id: reviewId 
            },
        });
    } catch (err) {
        throw new Error("리뷰를 불러오는 중 오류가 발생했습니다.");
    }
};


// 한 가게에 대한 리뷰 목록 조회하기
export const getAllStoreReviews = async (storeId: number, cursor: number | null)=> {
    const reviews = await prisma.review.findMany({
        select:{
            id: true,
            content: true,
            rating: true,
            created_at: true,
            user: {
                select:{
                nickname:true,
                },
            }
        },
        where: {
            storeId,
            id: cursor ? { gt: cursor } : undefined,
        },
        orderBy: {
            id: "asc",
        },
        take: 5,
    });
    return reviews;
}