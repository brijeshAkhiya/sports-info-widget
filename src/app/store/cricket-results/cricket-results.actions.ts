import { Action } from "@ngrx/store";
export const CRICKET_RESULTS= '[Cricket Results] Save Cricket Results objects';

export class CricketResults implements Action {
    readonly type = CRICKET_RESULTS
    constructor(public payload: any) { }
}

export type CricketResultsActions = CricketResults;