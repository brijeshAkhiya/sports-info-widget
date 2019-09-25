import { Action } from '@ngrx/store';
export const BASKETBALL_SCHEDULE_MATCHES = '[Basketball Schedule] Save Basketball schedule Matches';


export class BasketballSchedule implements Action {
    readonly type = BASKETBALL_SCHEDULE_MATCHES;
    constructor(public payload: any) { }
}


export type BasketballActions = BasketballSchedule;
