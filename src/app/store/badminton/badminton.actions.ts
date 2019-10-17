import { Action } from '@ngrx/store';
export const LOAD_BADMINTON_COMP_SEASONS = '[Badminton] Load Competiton Seasons';
export const LOAD_BADMINTON_COMP_SEASONS_SUCCESS = '[Badminton] Load Competiton Seasons Success';
export const LOAD_BADMINTON_SCHEDULE = '[Badminton Schedule] Load Badminton Schedule';
export const LOAD_BADMINTON_SCHEDULE_SUCCESS = '[Badminton Schedule] Load Success';

export class LoadBadmintonCompSeason implements Action {
    readonly type = LOAD_BADMINTON_COMP_SEASONS;
    constructor(public payload: any) { }
}

export class LoadBadmintonCompSeasonSuccess implements Action {
    readonly type = LOAD_BADMINTON_COMP_SEASONS_SUCCESS;
    constructor(public payload: any) { }
}
export class LoadBadmintonSchedule implements Action {
    readonly type = LOAD_BADMINTON_SCHEDULE;
}

export class LoadBadmintonScheduleSuccess implements Action {
    readonly type = LOAD_BADMINTON_SCHEDULE_SUCCESS;
    constructor(public payload: any) { }
}

export type BadmintonActions = LoadBadmintonCompSeason | LoadBadmintonCompSeasonSuccess | LoadBadmintonSchedule | LoadBadmintonScheduleSuccess;
