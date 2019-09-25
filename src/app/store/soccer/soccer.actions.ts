import { Action } from '@ngrx/store';
export const SOCCER_FIXTURES_MATCHES = '[Soccer Fixtures Matches] Save Soccer Fixtures Matches';
export const SOCCER_RESULTS_MATCHES = '[Soccer Results Matches] Save Soccer Results Matches';
export const SOCCER_LIVE_MATCHES = '[Soccer Live Matches] Save Soccer Live Matches';
export const SOCCER_MATCH_INFO = '[Soccer Live Matches] Save Soccer Live Matches';
export const LOAD_SOCCER_FIXTURES = '[Soccer Fixtures] Load Soccer Fixtures';
export const LOAD_SOCCER_FIXTURES_SUCCESS = '[Soccer Fixtures] Load Success';
export const LOAD_SOCCER_RESULTS = '[Soccer Results] Load Soccer Results';
export const LOAD_SOCCER_RESULTS_SUCCESS = '[Soccer Results] Load Success';
export const LOAD_SOCCER_LIVE_MATCHES = '[Soccer Live] Load Soccer Live';
export const LOAD_SOCCER_LIVE_MATCHES_SUCCESS = '[Soccer Live] Load Success';
export const LOAD_SOCCER_TOURNAMENTS_LIST = '[Soccer Tournaments list] Load Soccer Tournaments list';
export const LOAD_SOCCER_TOURNAMENTS_LISTSUCCESS = '[Soccer Tournaments list] Load Soccer Tournaments list Success';
export const SOCCER_START_LOADING = '[UI] Soccer Start Loading';
export const SOCCER_STOP_LOADING = '[UI] Soccer Stop Loading';

export class SoccerStartLoading implements Action {
    readonly type = SOCCER_START_LOADING;
}

export class SoccerStopLoading implements Action {
    readonly type = SOCCER_STOP_LOADING;
}


export class SoccerFixtures implements Action {
    readonly type = SOCCER_FIXTURES_MATCHES;
    constructor(public payload: any) { }
}

export class SoccerLiveMatches implements Action {
    readonly type = SOCCER_LIVE_MATCHES;
    constructor(public payload: any) { }
}

export class SoccerResults implements Action {
    readonly type = SOCCER_RESULTS_MATCHES;
    constructor(public payload: any) { }
}


export class SoccerMatchInfo implements Action {
    readonly type = SOCCER_MATCH_INFO;
    constructor(public payload: any) { }
}


export class LoadSoccerFixtures implements Action {
    readonly type = LOAD_SOCCER_FIXTURES;

}

export class LoadSoccerFixturesSuccess implements Action {
    readonly type = LOAD_SOCCER_FIXTURES_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadSoccerResults implements Action {
    readonly type = LOAD_SOCCER_RESULTS;

}

export class LoadSoccerResultsSuccess implements Action {
    readonly type = LOAD_SOCCER_RESULTS_SUCCESS;
    constructor(public payload: any) { }
}


export class LoadSoccerLive implements Action {
    readonly type = LOAD_SOCCER_LIVE_MATCHES;

}

export class LoadSoccerLiveSuccess implements Action {
    readonly type = LOAD_SOCCER_LIVE_MATCHES_SUCCESS;
    constructor(public payload: any) { }
}


export class LoadSoccerTournamentList implements Action {
    readonly type = LOAD_SOCCER_TOURNAMENTS_LIST;
}


export class LoadSoccerTournamentListSuccess implements Action {
    readonly type = LOAD_SOCCER_TOURNAMENTS_LISTSUCCESS;
    constructor(public payload: any) { }
}

export type SoccerActions = SoccerFixtures | SoccerLiveMatches
    | SoccerResults | SoccerMatchInfo
    | LoadSoccerFixtures | LoadSoccerFixturesSuccess
    | LoadSoccerResults | LoadSoccerResultsSuccess
    | LoadSoccerLive | LoadSoccerLiveSuccess
    | LoadSoccerTournamentList
    | LoadSoccerTournamentListSuccess
    | SoccerStartLoading
    | SoccerStopLoading;
