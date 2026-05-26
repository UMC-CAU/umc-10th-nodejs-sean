
import { prisma } from "../../../db.config.js";
import { User } from "../../../generated/prisma/client.js";
import { UserSignUpRequest, UserUpdateRequest } from "../dtos/user.dto.js";

// 사용자 추가하기
export const addUser = async (data: UserSignUpRequest): Promise<number | null> => {
    // 이미 존재하는 이메일인지 확인
    const user = await prisma.user.findFirst({
        where: { email: data.email },
    });
    if(user){
        return null;
    }

    const created = await prisma.user.create({
        data: {
            email: data.email,   
            password: data.password,
            name: data.name,
            nickname: data.nickname,
            gender: data.gender === "여성" ? "FEMALE" : "MALE",
            birthDate: data.birthDate,
            address: data.address,
            detailAddress: data.detailAddress,
            phoneNumber: data.phoneNumber,
        },         
    });
    return created.id;
};

// 사용자 조회하기
export const getUser = async (userId: number): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        },
    });
};

// 이메일로 사용자 조회하기 (소셜 로그인용)
export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await prisma.user.findFirst({
        where: { email },
    });
};

// 사용자 정보 수정하기
export const updateUser = async (userId: number, data: UserUpdateRequest): Promise<User> => {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            nickname: data.nickname,
            gender: data.gender === "여성" ? "FEMALE" : data.gender === "남성" ? "MALE" : undefined,
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
            address: data.address,
            detailAddress: data.detailAddress,
            phoneNumber: data.phoneNumber,
        },
    });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId: number, foodCategoryId: number): Promise<void> => {
    await prisma.userFavorCategory.create({
        data: {
            userId: userId,
            foodCategoryId: foodCategoryId,
        },
    });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId: number): Promise<any[]> => {
    const preferences = await prisma.userFavorCategory.findMany({
        where: { 
            userId: userId 
        },
        include: { 
            foodCategory: true 
        },
        orderBy: { 
            foodCategoryId: "asc" 
        },
    });

    return preferences;
};