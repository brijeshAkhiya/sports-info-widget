import { Action } from '@ngrx/store';
export const LOAD_RACING_COMP_SEASONS = '[Racing] Load Competiton Seasons';
export const LOAD_RACING_COMP_SEASONS_SUCCESS = '[Racing] Load Competiton Seasons Success';
export const LOAD_RACING_SCHEDULE = '[Racing Schedule] Load Racing Schedule';
export const LOAD_RACING_SCHEDULE_SUCCESS = '[Racing Schedule] Load Success';

export class LoadRacingCompSeason implements Action {
    readonly type = LOAD_RACING_COMP_SEASONS;
    constructor(public payload: any) { }
}

export class LoadRacingCompSeasonSuccess implements Action {
    readonly type = LOAD_RACING_COMP_SEASONS_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadRacingSchedule implements Action {
    readonly type = LOAD_RACING_SCHEDULE;
}

export class LoadRacingScheduleSuccess implements Action {
    readonly type = LOAD_RACING_SCHEDULE_SUCCESS;
    constructor(public payload: any) { }
}

export type RacingActions = LoadRacingCompSeason | LoadRacingCompSeasonSuccess | LoadRacingSchedule | LoadRacingScheduleSuccess;
