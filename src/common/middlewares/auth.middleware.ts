import { Request } from "express";
import jwt from "jsonwebtoken";

export function expressAuthentication(
    request: Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {

    if (securityName === "jwt") {
        const token = request.headers["authorization"]?.split(" ")[1];

        return new Promise((resolve, reject) => {
            if (!token) {
                console.log("[인증 실패] 토큰이 존재하지 않습니다.");
                return reject(new Error("[인증 실패] 로그인이 필요합니다."));
            }

            const secretKey = process.env.JWT_SECRET || "your_secret_key"; // 본인의 비밀키

            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    console.log("[인증 실패] 유효하지 않은 토큰입니다.");
                    return reject(err);
                }
                console.log(`[인증 성공] 유저 ID: ${(decoded as any).id}님, 환영합니다.`);
                request.user = decoded;

                resolve(decoded);
            });
        });
    }

    return Promise.reject(new Error("[인증 실패] 지원하지 않는 인증 방식입니다."));
}