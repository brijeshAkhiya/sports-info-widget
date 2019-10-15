import { Action } from '@ngrx/store';
export const LOAD_HOCKEY_COMP_SEASONS = '[Hockey] Load Competiton Seasons';
export const LOAD_HOCKEY_COMP_SEASONS_SUCCESS = '[Hockey] Load Competiton Seasons Success';

export class LoadHockeyCompSeason implements Action {
    readonly type = LOAD_HOCKEY_COMP_SEASONS;
    constructor(public payload: any) { }
}

export class LoadHockeyCompSeasonSuccess implements Action {
    readonly type = LOAD_HOCKEY_COMP_SEASONS_SUCCESS;
    constructor(public payload: any) { }
}

export type HockeyActions = LoadHockeyCompSeason | LoadHockeyCompSeasonSuccess;
