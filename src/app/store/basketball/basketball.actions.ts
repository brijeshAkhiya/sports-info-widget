import { Action } from '@ngrx/store';
export const BASKETBALL_SCHEDULE_MATCHES = '[Basketball Schedule] Save Basketball schedule Matches';
export const LOAD_BASKETBALL_SCHEDULE = '[Basketball Schedule] Load Basketball Schedule';
export const LOAD_BASKETBALL_SCHEDULE_SUCCESS = '[Basketball Schedule] Load Success';
export const BASKETBALL_START_LOADING = '[UI] Basketball Start Loading';
export const BASKETBALL_STOP_LOADING = '[UI] Basketball Stop Loading';

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

export type BasketballActions = BasketballStartLoading | BasketballStopLoading | LoadBasketballSchedule | LoadBasketballScheduleSuccess;
