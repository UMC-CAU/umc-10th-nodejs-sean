// 가게 등록 요청
export interface StoreAddRequest{
    regionId: number;
    name: string;
    address: string;
    category: string;
}

// 가게 등록 응답
export interface StoreResponse {
    id: number;
    regionId: number;
    name: string;
    address: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}
