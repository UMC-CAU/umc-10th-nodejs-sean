
import bcrypt from "bcrypt";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js"; 
import { addUser, getUser, getUserPreferencesByUserId, setPreference, } from "../repositories/user.repository.js";

export const userSignUp = async (data: UserSignUpRequest): Promise<UserSignUpResponse> => {
    
    // 비밀번호 해싱 과정 추가
    const saltRounds = 10; // 보안 강도
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const joinUserId = await addUser({
        email: data.email,
        password: hashedPassword,
        name: data.name,
        nickname: data.nickname,
        gender: data.gender,
        birthDate: new Date(data.birthDate), 
        address: data.address,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
        preferences: data.preferences
    });

    if (joinUserId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }

    for (const preference of data.preferences) {
        await setPreference(joinUserId, preference);
    }

    const user = await getUser(joinUserId);

    if (!user) {
    throw new Error("사용자 정보를 찾을 수 없습니다.");
    }

    const preferences = await getUserPreferencesByUserId(joinUserId);

    return <UserSignUpResponse>{ 
        email: user.email,
        name: user.name,
        preferCategories: preferences.map((p) => p.foodCategory.name),
    };
};