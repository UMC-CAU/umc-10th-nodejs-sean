
import { StoreAddRequest, StoreResponse } from "../dtos/store.dto.js";
import { addStore, checkRegionExists, getStore } from "../repositories/store.repository.js";
import { StoreNotFoundError, DuplicateStoreError, RegionNotFoundError } from "../../../common/errors/error.js";

// DB 데이터 -> 클라이언트 가공
const toStoreResponse = (store: any): StoreResponse => ({
    id: store.id,
    regionId: store.regionId, 
    name: store.name,
    address: store.address,
    category: store.category,
    createdAt: store.createdAt,
    updatedAt: store.updatedAt
});

// 가게 추가하기
export const storeAdd = async (data: StoreAddRequest): Promise<StoreResponse> => {
    const regionExists = await checkRegionExists(data.regionId);
    if (!regionExists) {
        throw new RegionNotFoundError("존재하지 않는 지역입니다.", { regionId: data.regionId });
    }
    
    const joinStoreId = await addStore(data);
    if (joinStoreId === null) {
        throw new DuplicateStoreError("이미 해당 주소에 존재하는 가게 이름입니다.", { name: data.name, address: data.address });
    }
    
    // 삽입된 ID 바탕으로 가게 정보 조회
    const store = await getStore(joinStoreId);
    if (!store) {
        throw new StoreNotFoundError("가게 등록 후 정보를 불러오는 데 실패했습니다."), { storeId: joinStoreId };
    }
    return toStoreResponse(store);
};