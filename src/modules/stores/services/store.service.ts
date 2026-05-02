
import { StoreAddRequest, responseFromStore } from "../dtos/store.dto.js";
import { addStore, getStore } from "../repositories/store.repository.js";

export const storeAdd = async (data: StoreAddRequest) => {
    // 레포지토리 호출 -> 가게 정보 DB에 삽입
    const joinStoreId = await addStore({
        regionId: data.regionId,
        name: data.name,
        address: data.address,
    });

    if (joinStoreId === null){
        throw new Error("이미 해당 주소에 존재하는 가게 이름입니다.");
    }

    // 삽입된 ID 바탕으로 가게 정보 조회
    const store = await getStore(joinStoreId);

    return responseFromStore(store);
}