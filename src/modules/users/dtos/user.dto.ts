// 회원가입 요청 
export interface UserSignUpRequest {
    /** 유저 이메일 (로그인 시 사용) */
    email: string;
    /** 유저 비밀번호 */
    password: string;
    /** 유저 이름 */
    name: string;
    /** 유저 닉네임 (선택) */
    nickname?: string;
    /** 성별 (예: 남성, 여성) */
    gender: string;
    /** 생년월일 (예: 2000-01-01) */
    birthDate: string | Date;
    /** 주소 (선택) */
    address?: string;
    /** 상세 주소 (선택) */
    detailAddress?: string;
    /** 전화번호 (예: 010-1234-5678) */
    phoneNumber: string;
    /** 선호 카테고리 ID 배열 (예: [1, 2]) */
    preferences: number[];
}

// 회원가입 응답
export interface UserSignUpResponse {
    /** 유저 이메일 */
    email: string;
    /** 유저 이름 */
    name: string;
    /** 선호 카테고리 이름 배열 */
    preferCategories: string[];
}

// 사용자 정보 수정 요청
export interface UserUpdateRequest {
    /** 유저 닉네임 */
    nickname?: string;
    /** 성별 (예: 남성, 여성) */
    gender?: string;
    /** 생년월일 (예: 2000-01-01) */
    birthDate?: string | Date;
    /** 주소 */
    address?: string;
    /** 상세 주소 */
    detailAddress?: string;
    /** 전화번호 (예: 010-1234-5678) */
    phoneNumber?: string;
}

// 사용자 정보 수정 응답
export interface UserUpdateResponse {
    /** 유저 이메일 */
    email: string;
    /** 유저 이름 */
    name: string;
    /** 유저 닉네임 */
    nickname: string;
    /** 성별 */
    gender: string;
    /** 생년월일 */
    birthDate: Date;
    /** 주소 */
    address: string;
    /** 상세 주소 */
    detailAddress: string;
    /** 전화번호 */
    phoneNumber: string;
}
