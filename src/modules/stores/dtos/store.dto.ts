// 가게 등록 요청
export interface StoreAddRequest {
    /** 지역 ID */
    regionId: number;
    /** 가게 이름 */
    name: string;
    /** 가게 주소 */
    address: string;
    /** 가게 카테고리 */
    category: string;
}

// 가게 등록 응답
export interface StoreResponse {
    /** 가게 ID */
    id: number;
    /** 지역 ID */
    regionId: number;
    /** 가게 이름 */
    name: string;
    /** 가게 주소 */
    address: string;
    /** 가게 카테고리 */
    category: string;
    /** 생성일 */
    createdAt: Date;
    /** 수정일 */
    updatedAt: Date;
}