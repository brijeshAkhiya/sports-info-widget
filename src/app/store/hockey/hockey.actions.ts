import { Action } from '@ngrx/store';
export const LOAD_HOCKEY_COMP_SEASONS = '[Hockey] Load Competiton Seasons';
export const LOAD_HOCKEY_COMP_SEASONS_SUCCESS = '[Hockey] Load Competiton Seasons Success';
export const LOAD_HOCKEY_SCHEDULE = '[Hockey Schedule] Load Hockey Schedule';
export const LOAD_HOCKEY_SCHEDULE_SUCCESS = '[Hockey Schedule] Load Success';

export class LoadHockeyCompSeason implements Action {
    readonly type = LOAD_HOCKEY_COMP_SEASONS;
    constructor(public payload: any) { }
}

export class LoadHockeyCompSeasonSuccess implements Action {
    readonly type = LOAD_HOCKEY_COMP_SEASONS_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadHockeySchedule implements Action {
    readonly type = LOAD_HOCKEY_SCHEDULE;
}

export class LoadHockeyScheduleSuccess implements Action {
    readonly type = LOAD_HOCKEY_SCHEDULE_SUCCESS;
    constructor(public payload: any) { }
}

export type HockeyActions = LoadHockeyCompSeason | LoadHockeyCompSeasonSuccess | LoadHockeySchedule | LoadHockeyScheduleSuccess;
