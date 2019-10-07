import { Action } from '@ngrx/store';
export const BASKETBALL_SCHEDULE_MATCHES = '[Basketball Schedule] Save Basketball schedule Matches';
export const LOAD_BASKETBALL_SCHEDULE = '[Basketball Schedule] Load Basketball Schedule';
export const LOAD_BASKETBALL_SCHEDULE_SUCCESS = '[Basketball Schedule] Load Success';
export const BASKETBALL_START_LOADING = '[UI] Basketball Start Loading';
export const BASKETBALL_STOP_LOADING = '[UI] Basketball Stop Loading';
export const LOAD_BASKETBALL_MATCH_INFO = '[Basketball Match Info] Load Basketball Match Info';
export const LOAD_BASKETBALL_MATCH_INFO_SUCCESS = '[Basketball Match Info] Load Basketball Match Info Success';

export class BasketballStartLoading implements Action {
    readonly type = BASKETBALL_START_LOADING;
}

export class BasketballStopLoading implements Action {
    readonly type = BASKETBALL_STOP_LOADING;
}

export class LoadBasketballSchedule implements Action {
    readonly type = LOAD_BASKETBALL_SCHEDULE;
}

export class LoadBasketballScheduleSuccess implements Action {
    readonly type = LOAD_BASKETBALL_SCHEDULE_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadBasketballMatchInfo implements Action {
    readonly type = LOAD_BASKETBALL_MATCH_INFO;
    constructor(public payload: any) { }
}

export class LoadBasketballMatchInfoSuccess implements Action {
    readonly type = LOAD_BASKETBALL_MATCH_INFO_SUCCESS;
    constructor(public payload: any) { }
}

export type BasketballActions = BasketballStartLoading | BasketballStopLoading | LoadBasketballSchedule | LoadBasketballScheduleSuccess | LoadBasketballMatchInfo | LoadBasketballMatchInfoSuccess;
