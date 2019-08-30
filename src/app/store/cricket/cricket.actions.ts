import { Action } from "@ngrx/store";
export const CRICKET_FIXTURES_MATCHES = '[Cricket Fixtures Matches] Save Cricket Fixtures Matches';
export const CRICKET_RESULTS_MATCHES = '[Cricket Results Matches] Save Cricket Results Matches';
export const CRICKET_LIVE_MATCHES = '[Cricket Live Matches] Save Cricket Live Matches';
export const CRICKET_MATCH_INFO = '[Cricket Live Matches] Save Cricket Live Matches';
export const LOAD_CRICKET_FIXTURES = '[Cricket Fixtures] Load Cricket Fixtures';
export const LOAD_CRICKET_FIXTURES_SUCCESS = '[Cricket Fixtures] Load Success';
export const LOAD_CRICKET_RESULTS = '[Cricket Results] Load Cricket Results';
export const LOAD_CRICKET_RESULTS_SUCCESS = '[Cricket Results] Load Success';
export const CRICKET_START_LOADING = '[UI] Cricket Start Loading';
export const CRICKET_STOP_LOADING = '[UI] Cricket Stop Loading';

export class CricketStartLoading implements Action {
    readonly type =  CRICKET_START_LOADING   
}

export class CricketStopLoading implements Action {
    readonly type =  CRICKET_STOP_LOADING
}

export class CricketFixtures implements Action {
    readonly type = CRICKET_FIXTURES_MATCHES
    constructor(public payload: any) { }
}

export class CricketLiveMatches implements Action {
    readonly type = CRICKET_LIVE_MATCHES
    constructor(public payload: any) { }
}

export class CricketResults implements Action {
    readonly type = CRICKET_RESULTS_MATCHES
    constructor(public payload: any) { }
}


export class CricketMatchInfo implements Action {
    readonly type = CRICKET_MATCH_INFO
    constructor(public payload: any) { }
}


export class LoadCricketFixtures implements Action {
    readonly type = LOAD_CRICKET_FIXTURES

}

export class LoadCricketFixturesSuccess implements Action {
    readonly type = LOAD_CRICKET_FIXTURES_SUCCESS
    constructor(public payload: any) { }
}


export class LoadCricketResults implements Action {
    readonly type = LOAD_CRICKET_RESULTS

}

export class LoadCricketResultsSuccess implements Action {
    readonly type = LOAD_CRICKET_RESULTS_SUCCESS
    constructor(public payload: any) { }
}

export type CricketActions = CricketFixtures | CricketLiveMatches | CricketResults | CricketMatchInfo | LoadCricketFixtures | LoadCricketFixturesSuccess | LoadCricketResults | LoadCricketResultsSuccess | CricketStartLoading | CricketStopLoading