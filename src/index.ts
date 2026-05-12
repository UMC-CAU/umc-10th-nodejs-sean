import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";

// import { handleUserSignUp } from "./modules/users/controllers/user.controller.js";
import { handleStoreAdd } from "./modules/stores/controllers/store.controller.js";
import { handleReviewAdd, handleListStoreReviews, handleListUserReviews } from './modules/reviews/controllers/review.controller.js';
import { handleMissionAdd, handleListStoreMissions } from './modules/missions/controllers/mission.controller.js';
import { handleChallengeMission, handleGetUserMissions, handleCompleteUserMission } from "./modules/userMissions/controllers/userMission.controller.js";

// 환경 변수 설정
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors()); // cors 방식 허용                 
app.use(express.static('public')); // 정적 파일 접근      
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)     
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// Express.js에 생성한 엔드 포인트들을 register
// const router = express.Router();
RegisterRoutes(app); 
// app.use("/v1", router);

/*
// 유저 관련 API
app.post("/v1/users/signup", handleUserSignUp);
// 가게 관련 API
app.post('/v1/stores', handleStoreAdd);
// 리뷰 관련 API
app.post('/v1/stores/:storeId/reviews', handleReviewAdd);
app.get('/v1/users/:userId/reviews', handleListUserReviews);
app.get('/v1/stores/:storeId/reviews', handleListStoreReviews);
// 미션 관련 API
app.post('/v1/stores/:storeId/missions', handleMissionAdd);
app.get('/v1/stores/:storeId/missions', handleListStoreMissions);
// 사용자 미션 관련 API
app.post('/v1/users/missions/:missionId/challenge', handleChallengeMission);
app.get('/v1/users/:userId/missions', handleGetUserMissions);
app.post('/v1/users/missions/:userMissionId/complete', handleCompleteUserMission);
*/

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});