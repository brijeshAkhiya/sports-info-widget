import { Action } from '@ngrx/store';
export const LOAD_TENNIS_SCHEDULE = '[Tennis Schedule] Load Tennis Schedule';
export const LOAD_TENNIS_SCHEDULE_SUCCESS = '[Tennis Schedule] Load Success';
export const TENNIS_START_LOADING = '[UI] Tennis Start Loading';
export const TENNIS_STOP_LOADING = '[UI] Tennis Stop Loading';
export const SAVE_TENNIS_MATCHES = '[Tennis Matches] Save Tennis matches';
export const REMOVE_TENNIS_UPDATE = '[Tennis Matches] Remove Tennis update';


export class TennisStartLoading implements Action {
    readonly type = TENNIS_START_LOADING;
}

export class TennisStopLoading implements Action {
    readonly type = TENNIS_STOP_LOADING;
}

export class LoadTennisSchedule implements Action {
    readonly type = LOAD_TENNIS_SCHEDULE;
}

export class LoadTennisScheduleSuccess implements Action {
    readonly type = LOAD_TENNIS_SCHEDULE_SUCCESS;
    constructor(public payload: any) { }
}

export class SaveTennisMatches implements Action {
    readonly type = SAVE_TENNIS_MATCHES;
    constructor(public payload: any) { }
}

export class RemoveTennisUpdate implements Action {
    readonly type = REMOVE_TENNIS_UPDATE;
}


export type TennisActions = TennisStartLoading | TennisStopLoading | LoadTennisSchedule | LoadTennisScheduleSuccess | SaveTennisMatches | RemoveTennisUpdate;
