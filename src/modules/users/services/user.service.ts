import bcrypt from "bcrypt";
import { UserSignUpRequest, UserSignUpResponse, UserUpdateRequest, UserUpdateResponse } from "../dtos/user.dto.js"; 
import { addUser, getUser, getUserPreferencesByUserId, setPreference, updateUser } from "../repositories/user.repository.js";
import { DuplicateUserEmailError, UserNotFoundError } from "../../../common/errors/error.js";

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
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.");
    }

    for (const preference of data.preferences) {
        await setPreference(joinUserId, preference);
    }

    const user = await getUser(joinUserId);

    if (!user) {
    throw new UserNotFoundError("사용자 정보를 찾을 수 없습니다.");
    }

    const preferences = await getUserPreferencesByUserId(joinUserId);

    return <UserSignUpResponse>{ 
        email: user.email,
        name: user.name,
        preferCategories: preferences.map((p) => p.foodCategory.name),
    };
};

export const userUpdate = async (userId: number, data: UserUpdateRequest): Promise<UserUpdateResponse> => {
    const user = await getUser(userId);
    if (!user) {
        throw new UserNotFoundError("존재하지 않는 사용자입니다.");
    }

    const updated = await updateUser(userId, data);

    return {
        email: updated.email,
        name: updated.name,
        nickname: updated.nickname ?? "",
        gender: updated.gender,
        birthDate: updated.birthDate,
        address: updated.address ?? "",
        detailAddress: updated.detailAddress ?? "",
        phoneNumber: updated.phoneNumber ?? "",
    };
};