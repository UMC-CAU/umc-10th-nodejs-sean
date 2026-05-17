import { AppError } from "./app.error.js";

// users - 회원가입 시 중복된 이메일
export class DuplicateUserEmailError extends AppError {
  constructor(message: string, data?: unknown) {
    super({
      errorCode: "U001",
      statusCode: 409,
      message,
      data,
    });
  }
}

// users - 존재하지 않는 사용자
export class UserNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({
            errorCode: "U002",
            statusCode: 404,
            message,
            data,
        });
    }
}

// stores, missions, reviews, userMissions - 존재하지 않는 가게
export class StoreNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({ errorCode: "S001", statusCode: 404, message, data });
    }
}

// missions, userMissions - 존재하지 않는 미션
export class MissionNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({ errorCode: "M001", statusCode: 404, message, data });
    }
}

// reviews - 존재하지 않는 리뷰
export class ReviewNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({ errorCode: "R001", statusCode: 404, message, data });
    }
}

// stores - 중복된 가게
export class DuplicateStoreError extends AppError {
    constructor(message: string, data?: unknown) {
        super({ errorCode: "S002", statusCode: 409, message, data });
    }
}

// stores - 존재하지 않는 지역
export class RegionNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({ errorCode: "S003", statusCode: 404, message, data });
    }
}

// userMissions - 존재하지 않는 사용자 미션
export class UserMissionNotFoundError extends AppError {
    constructor(message: string, data?: unknown) {
        super({ errorCode: "UM001", statusCode: 404, message, data });
    }
}

// userMissions - 이미 등록된 사용자 미션
export class DuplicateUserMissionError extends AppError {
    constructor(message: string, data?: unknown) {
        super({ errorCode: "UM002", statusCode: 409, message, data });
    }
}

// userMissions - 사용자 미션 상태 오류
export class InvalidStatusError extends AppError {
    constructor(message: string, data?: unknown) {
        super({ errorCode: "UM003", statusCode: 400, message, data });
    }
}