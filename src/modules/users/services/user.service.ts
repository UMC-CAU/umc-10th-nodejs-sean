
import bcrypt from "bcrypt";
import { UserSignUpRequest } from "../dtos/user.dto.js"; //인터페이스 가져오기 
import { responseFromUser } from "../dtos/user.dto.js";
import { addUser, getUser, getUserPreferencesByUserId, setPreference, } from "../repositories/user.repository.js";

export const userSignUp = async (data: UserSignUpRequest) => {
    
    // 비밀번호 해싱 과정 추가
    const saltRounds = 10; // 보안 강도
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const joinUserId = await addUser({
        email: data.email,
        password: hashedPassword,
        name: data.name,
        nickname: data.nickname,
        gender: data.gender,
        birthDate: new Date(data.birthDate), // 문자열을 Date 객체로 변환해서 넘겨줍니다. 
        address: data.address,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
    });

    if (joinUserId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    }

    for (const preference of data.preferences) {
        await setPreference(joinUserId, preference);
    }

    const user = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);

    return responseFromUser({ user, preferences });
};