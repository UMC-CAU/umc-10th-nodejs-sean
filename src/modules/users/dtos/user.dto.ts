// 회원가입 요청 
export interface UserSignUpRequest {
    email: string;
    password: string;
    name: string;
    nickname?: string;
    gender: string;
    birthDate: string | Date;
    address?: string;
    detailAddress?: string;
    phoneNumber: string;
    preferences: number[];
}

// 회원가입 응답
export interface UserSignUpResponse {
    email: string;
    name: string;
    preferCategories: string[];
}

