
export interface StoreAddRequest{
    regionId: number;
    name: string;
    address: string;
    category: string;
}

export const bodyToStore = (body: any) : StoreAddRequest => {
    return {
        name: body.name,
        address: body.address,
        regionId: Number(body.regionId),
        category: body.category
    };
};

export const responseFromStore = (store: any) => {
    return {
        id: store.id,
        regionId: store.region_id,
        name: store.name,
        address: store.address,
        category: store.category,
        createdAt: store.created_at,
        updatedAt: store.updated_at
    };
};
