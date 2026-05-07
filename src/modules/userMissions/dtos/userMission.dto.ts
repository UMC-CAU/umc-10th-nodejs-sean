// 사용자 미션 생성 요청
export interface UserMissionAddRequest {
  userId: number;
  missionId: number;
}

// 단일 사용자 미션 응답 형태
export interface UserMissionItem {
    id: number;
    userId: number;
    missionId: number;
    missionName: string | null;
    status: string;
    startedAt: Date;
    completedAt: Date | null;
    progressCount: number;
    rewardPoint: number;
    endDate: Date | null;
}

// 사용자 미션 목록 응답
export interface UserMissionListResponse {
    data: UserMissionItem[];
    pagination: {
        cursor: number | null;
    };
}

// 사용자 미션 데이터 가공
export const bodyToUserMission = (body: UserMissionAddRequest) => {
    return {
        userId: body.userId,
        missionId: body.missionId,
        status: "ONGOING",
    }
}

// 단일 사용자 미션 DTO
export const responseFromUserMission = (userMission: any) => {
    return {
        id: userMission.id,
        userId: userMission.userId,
        missionId: userMission.missionId,
        missionName: userMission.mission.name,
        status: userMission.status,
        startedAt: userMission.startedAt,
        completedAt: userMission.completedAt,
        progressCount:userMission.progressCount,
        rewardPoint: userMission.rewardPoint,
        endDate: userMission.endDate
    };
};

// 사용자 미션 목록 DTO
 export const responseFromUserMissionList = (userMissions: any[]): UserMissionListResponse => {
    const userMissionItems = userMissions.map(responseFromUserMission);
    const lastUserMission = userMissionItems[userMissionItems.length - 1];

    return {
        data: userMissionItems,
        pagination: {
            cursor: lastUserMission ? lastUserMission.id : null,
        },
    };
};
 