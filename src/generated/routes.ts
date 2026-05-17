/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../modules/users/controllers/user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserMissionController } from './../modules/userMissions/controllers/userMission.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StoreController } from './../modules/stores/controllers/store.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ReviewController } from './../modules/reviews/controllers/review.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserReviewController } from './../modules/reviews/controllers/review.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MissionController } from './../modules/missions/controllers/mission.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserSignUpResponse": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "preferCategories": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_UserSignUpResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"UserSignUpResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ErrorResponse": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["FAIL"],"required":true},
            "error": {"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"enum","enums":[null]}],"required":true},"message":{"dataType":"string","required":true},"errorCode":{"dataType":"string","required":true}},"required":true},
            "data": {"dataType":"enum","enums":[null],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSignUpRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "nickname": {"dataType":"string"},
            "gender": {"dataType":"string","required":true},
            "birthDate": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"datetime"}],"required":true},
            "address": {"dataType":"string"},
            "detailAddress": {"dataType":"string"},
            "phoneNumber": {"dataType":"string","required":true},
            "preferences": {"dataType":"array","array":{"dataType":"double"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserMissionItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "missionId": {"dataType":"double","required":true},
            "missionName": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "status": {"dataType":"string","required":true},
            "startedAt": {"dataType":"datetime","required":true},
            "completedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "progressCount": {"dataType":"double","required":true},
            "rewardPoint": {"dataType":"double","required":true},
            "endDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_UserMissionItem_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"UserMissionItem","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserMissionListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"UserMissionItem"},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_UserMissionListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"UserMissionListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StoreResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "regionId": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "category": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_StoreResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"StoreResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StoreAddRequest": {
        "dataType": "refObject",
        "properties": {
            "regionId": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "address": {"dataType":"string","required":true},
            "category": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "storeId": {"dataType":"double","required":true},
            "content": {"dataType":"string","required":true},
            "rating": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_ReviewItem_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"ReviewItem","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewAddBody": {
        "dataType": "refObject",
        "properties": {
            "userId": {"dataType":"double","required":true},
            "content": {"dataType":"string","required":true},
            "rating": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ReviewItem"},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_ReviewListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"ReviewListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "storeId": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "reward": {"dataType":"double","required":true},
            "condition": {"dataType":"string","required":true},
            "conditionValue": {"dataType":"double","required":true},
            "startDate": {"dataType":"datetime","required":true},
            "endDate": {"dataType":"datetime","required":true},
            "missionSpec": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MissionItem_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"MissionItem","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionAddBody": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "reward": {"dataType":"double","required":true},
            "condition": {"dataType":"string","required":true},
            "conditionValue": {"dataType":"double","required":true},
            "startDate": {"dataType":"string","required":true},
            "endDate": {"dataType":"string","required":true},
            "missionSpec": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MissionListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"MissionItem"},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiResponse_MissionListResponse_": {
        "dataType": "refObject",
        "properties": {
            "resultType": {"dataType":"enum","enums":["SUCCESS"],"required":true},
            "error": {"dataType":"enum","enums":[null],"required":true},
            "data": {"ref":"MissionListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_handleUserSignUp: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"UserSignUpRequest"},
        };
        app.post('/v1/users/signup',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.handleUserSignUp)),

            async function UserController_handleUserSignUp(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_handleUserSignUp, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'handleUserSignUp',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserMissionController_handleChallengeMission: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                missionId: {"in":"path","name":"missionId","required":true,"dataType":"double"},
        };
        app.post('/v1/users/:userId/missions/:missionId/challenge',
            ...(fetchMiddlewares<RequestHandler>(UserMissionController)),
            ...(fetchMiddlewares<RequestHandler>(UserMissionController.prototype.handleChallengeMission)),

            async function UserMissionController_handleChallengeMission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserMissionController_handleChallengeMission, request, response });

                const controller = new UserMissionController();

              await templateService.apiHandler({
                methodName: 'handleChallengeMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserMissionController_handleGetUserMissions: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                status: {"default":"ONGOING","in":"query","name":"status","dataType":"string"},
                cursor: {"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/v1/users/:userId/missions',
            ...(fetchMiddlewares<RequestHandler>(UserMissionController)),
            ...(fetchMiddlewares<RequestHandler>(UserMissionController.prototype.handleGetUserMissions)),

            async function UserMissionController_handleGetUserMissions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserMissionController_handleGetUserMissions, request, response });

                const controller = new UserMissionController();

              await templateService.apiHandler({
                methodName: 'handleGetUserMissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserMissionController_handleCompleteUserMission: Record<string, TsoaRoute.ParameterSchema> = {
                userMissionId: {"in":"path","name":"userMissionId","required":true,"dataType":"double"},
        };
        app.post('/v1/users/missions/:userMissionId/complete',
            ...(fetchMiddlewares<RequestHandler>(UserMissionController)),
            ...(fetchMiddlewares<RequestHandler>(UserMissionController.prototype.handleCompleteUserMission)),

            async function UserMissionController_handleCompleteUserMission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserMissionController_handleCompleteUserMission, request, response });

                const controller = new UserMissionController();

              await templateService.apiHandler({
                methodName: 'handleCompleteUserMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStoreController_handleStoreAdd: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"StoreAddRequest"},
        };
        app.post('/v1/stores',
            ...(fetchMiddlewares<RequestHandler>(StoreController)),
            ...(fetchMiddlewares<RequestHandler>(StoreController.prototype.handleStoreAdd)),

            async function StoreController_handleStoreAdd(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStoreController_handleStoreAdd, request, response });

                const controller = new StoreController();

              await templateService.apiHandler({
                methodName: 'handleStoreAdd',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsReviewController_handleReviewAdd: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"ReviewAddBody"},
        };
        app.post('/v1/stores/:storeId/reviews',
            ...(fetchMiddlewares<RequestHandler>(ReviewController)),
            ...(fetchMiddlewares<RequestHandler>(ReviewController.prototype.handleReviewAdd)),

            async function ReviewController_handleReviewAdd(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReviewController_handleReviewAdd, request, response });

                const controller = new ReviewController();

              await templateService.apiHandler({
                methodName: 'handleReviewAdd',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsReviewController_handleListStoreReviews: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                cursor: {"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/v1/stores/:storeId/reviews',
            ...(fetchMiddlewares<RequestHandler>(ReviewController)),
            ...(fetchMiddlewares<RequestHandler>(ReviewController.prototype.handleListStoreReviews)),

            async function ReviewController_handleListStoreReviews(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReviewController_handleListStoreReviews, request, response });

                const controller = new ReviewController();

              await templateService.apiHandler({
                methodName: 'handleListStoreReviews',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserReviewController_handleListUserReviews: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                cursor: {"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/v1/users/:userId/reviews',
            ...(fetchMiddlewares<RequestHandler>(UserReviewController)),
            ...(fetchMiddlewares<RequestHandler>(UserReviewController.prototype.handleListUserReviews)),

            async function UserReviewController_handleListUserReviews(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserReviewController_handleListUserReviews, request, response });

                const controller = new UserReviewController();

              await templateService.apiHandler({
                methodName: 'handleListUserReviews',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMissionController_handleMissionAdd: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"ref":"MissionAddBody"},
        };
        app.post('/v1/stores/:storeId/missions',
            ...(fetchMiddlewares<RequestHandler>(MissionController)),
            ...(fetchMiddlewares<RequestHandler>(MissionController.prototype.handleMissionAdd)),

            async function MissionController_handleMissionAdd(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMissionController_handleMissionAdd, request, response });

                const controller = new MissionController();

              await templateService.apiHandler({
                methodName: 'handleMissionAdd',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMissionController_handleListStoreMissions: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                cursor: {"in":"query","name":"cursor","dataType":"double"},
        };
        app.get('/v1/stores/:storeId/missions',
            ...(fetchMiddlewares<RequestHandler>(MissionController)),
            ...(fetchMiddlewares<RequestHandler>(MissionController.prototype.handleListStoreMissions)),

            async function MissionController_handleListStoreMissions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMissionController_handleListStoreMissions, request, response });

                const controller = new MissionController();

              await templateService.apiHandler({
                methodName: 'handleListStoreMissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
