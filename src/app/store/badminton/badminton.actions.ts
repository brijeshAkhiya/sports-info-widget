import { Action } from '@ngrx/store';
export const LOAD_BADMINTON_COMP_SEASONS = '[Badminton] Load Competiton Seasons';
export const LOAD_BADMINTON_COMP_SEASONS_SUCCESS = '[Badminton] Load Competiton Seasons Success';

export class LoadBadmintonCompSeason implements Action {
    readonly type = LOAD_BADMINTON_COMP_SEASONS;
    constructor(public payload: any) { }
}

export class LoadBadmintonCompSeasonSuccess implements Action {
    readonly type = LOAD_BADMINTON_COMP_SEASONS_SUCCESS;
    constructor(public payload: any) { }
}

export type BadmintonActions = LoadBadmintonCompSeason | LoadBadmintonCompSeasonSuccess;
