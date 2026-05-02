
export interface UserMissionAddRequest {
  userId: number;
  missionId: number;
}

export const bodyToUserMission = (body: UserMissionAddRequest) => {
    return {
        userId: body.userId,
        missionId: body.missionId,
        status: "ONGOING",
    }
}

// 단일 유저미션 조회
export const responseFromUserMission = (userMission: any) => {
    return {
        id: userMission.id,
        userId: userMission.user_id,
        missionId: userMission.mission_id,
        status: userMission.status,
        startedAt: userMission.started_at,
        completedAt: userMission.completed_at,
        progressCount:userMission.progress_count,
        rewardPoint: userMission.reward_point,
        endDate: userMission.endDate
    };
};

// 유저미션 리스트 조회
 export const responseFromUserMissionList = (missions: any[]) => {
    return missions.map(mission => ({
        id: mission.id,
        missionId: mission.mission_id,
        missionName: mission.mission_name, 
        status: mission.status,
        createdAt: mission.created_at
    }));
 }