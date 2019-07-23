import { Action } from "@ngrx/store";
export const SAVE_SPORTS_RESULTS= '[Sports Results] Save Sports Results objects';

export class SaveSportsResults implements Action {
    readonly type = SAVE_SPORTS_RESULTS
    constructor(public payload: any) { }
}

export type SportsResultsActions = SaveSportsResults;