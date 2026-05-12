
import { prisma } from "../../../db.config.js";
import { Store } from "../../../generated/prisma/client.js";
import { StoreAddRequest } from "../dtos/store.dto.js";

// 지역 존재 여부 확인
export const checkRegionExists = async (regionId: number): Promise<boolean> => {
    try {
        const count = await prisma.region.count({
            where:{
                id: regionId,
            },
        });
        return count > 0;
    } catch (err) {
        throw new Error(`가게 추가 중 오류가 발생했습니다: ${err}`);
    }
}

// 가게 등록하기
export const addStore = async (data: StoreAddRequest): Promise<number | null> => {
    try {
        // 같은 주소에 같은 이름의 가게가 이미 있는지 확인
        const checkStoreExists = await prisma.store.findFirst({
            where:{
                name: data.name,
                address: data.address,
            },
            select: {
                id: true
            }
        });
        if(checkStoreExists){
            return null;
        }
        
        // 가게 정보 삽입
        const result = await prisma.store.create({
            data:{
                regionId: data.regionId, 
                name: data.name, 
                address: data.address, 
                category: data.category
            },
        });
        return result.id; // 생성된 가게의 ID 반환
    } catch (err: any) {
        throw new Error(`가게 추가 중 오류가 발생했습니다: ${err}`);
    }
};

// 가게 조회하기
export const getStore = async (storeId: number): Promise<Store | null> => {
    try {
        const store = await prisma.store.findUnique({
            where: {
                id: storeId,
            },
        });
        return store;
    } catch (err: any) {
        throw new Error(`가게 조회 중 오류가 발생했습니다: ${err}`);
    }
};

