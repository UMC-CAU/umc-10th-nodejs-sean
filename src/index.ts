import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/errors/app.error.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";  
import path from "path";                
import fs from "fs"; 
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

// 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 전역 오류 처리 미들웨어
app.use((req: Request, res: Response, next: NextFunction) => {
  (res as any).error = function ({ errorCode = null, message = null, data = null }) {
    return this.json({
      resultType: "FAILED",
      error: { errorCode, message, data },
      data: null,
    });
  };
  next();
});

// 미들웨어 설정
app.use(cors()); // cors 방식 허용                 
app.use(express.static('public')); // 정적 파일 접근      
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)     
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(cookieParser());
app.use(morgan("dev"));

// passport 초기화
passport.use(googleStrategy);
passport.use(jwtStrategy);
app.use(passport.initialize());

// 구글 로그인 라우터
app.get("/oauth2/login/google", passport.authenticate("google", { session: false }));
app.get("/oauth2/callback/google",
  passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
  (req, res) => {
    res.status(200).json({ success: true, tokens: req.user });
  }
);

// 보호된 라우트
const isLogin = passport.authenticate('jwt', { session: false });
app.get('/v1/mypage', isLogin, (req, res) => {
  res.status(200).json({
    message: `인증 성공! ${(req.user as any).name}님의 마이페이지입니다.`,
    user: req.user,
  });
});

// Express.js에 생성한 엔드 포인트들을 register
// const router = express.Router();
RegisterRoutes(app); 
// app.use("/v1", router);

// Swagger 설정
const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8")
);
swaggerFile.servers = [{ url: "http://localhost:3000/v1" }];
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 에러 처리
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  (res.status(err.statusCode || 500) as any).error({
    errorCode: err.errorCode || "unknown",
    message: err.message || null,
    data: err.data || null,
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});