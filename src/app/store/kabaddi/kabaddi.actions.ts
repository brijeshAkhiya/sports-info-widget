import { Action } from '@ngrx/store';
export const KABADDI_FIXTURES_MATCHES = '[Kabaddi Fixtures Matches] Save Kabaddi Fixtures Matches';
export const KABADDI_RESULTS_MATCHES = '[Kabaddi Results Matches] Save Kabaddi Results Matches';
export const KABADDI_LIVE_MATCHES = '[Kabaddi Live Matches] Save Kabaddi Live Matches';
export const KABADDI_MATCH_INFO = '[Kabaddi Live Matches] Save Kabaddi Live Matches';
export const LOAD_KABADDI_FIXTURES = '[Kabaddi Fixtures] Load Kabaddi Fixtures';
export const LOAD_KABADDI_FIXTURES_SUCCESS = '[Kabaddi Fixtures] Load Success';
export const LOAD_KABADDI_RESULTS = '[Kabaddi Results] Load Kabaddi Results';
export const LOAD_KABADDI_RESULTS_SUCCESS = '[Kabaddi Results] Load Success';
export const LOAD_KABADDI_LIVE_MATCHES = '[Kabaddi Live] Load Kabaddi Live';
export const LOAD_KABADDI_LIVE_MATCHES_SUCCESS = '[Kabaddi Live] Load Success';
export const KABADDI_START_LOADING = '[UI] Kabaddi Start Loading';
export const KABADDI_STOP_LOADING = '[UI] Kabaddi Stop Loading';

export class KabaddiStartLoading implements Action {
    readonly type = KABADDI_START_LOADING;
}

export class KabaddiStopLoading implements Action {
    readonly type = KABADDI_STOP_LOADING;
}


export class KabaddiFixtures implements Action {
    readonly type = KABADDI_FIXTURES_MATCHES;
    constructor(public payload: any) { }
}

export class KabaddiLiveMatches implements Action {
    readonly type = KABADDI_LIVE_MATCHES;
    constructor(public payload: any) { }
}

export class KabaddiResults implements Action {
    readonly type = KABADDI_RESULTS_MATCHES;
    constructor(public payload: any) { }
}


export class KabaddiMatchInfo implements Action {
    readonly type = KABADDI_MATCH_INFO;
    constructor(public payload: any) { }
}


export class LoadKabaddiFixtures implements Action {
    readonly type = LOAD_KABADDI_FIXTURES;

}

export class LoadKabaddiFixturesSuccess implements Action {
    readonly type = LOAD_KABADDI_FIXTURES_SUCCESS;
    constructor(public payload: any) { }
}

export class LoadKabaddiResults implements Action {
    readonly type = LOAD_KABADDI_RESULTS;

}

export class LoadKabaddiResultsSuccess implements Action {
    readonly type = LOAD_KABADDI_RESULTS_SUCCESS;
    constructor(public payload: any) { }
}


export class LoadKabaddiLive implements Action {
    readonly type = LOAD_KABADDI_LIVE_MATCHES;

}

export class LoadKabaddiLiveSuccess implements Action {
    readonly type = LOAD_KABADDI_LIVE_MATCHES_SUCCESS;
    constructor(public payload: any) { }
}

export type KabaddiActions = KabaddiFixtures | KabaddiLiveMatches
    | KabaddiResults | KabaddiMatchInfo
    | LoadKabaddiFixtures | LoadKabaddiFixturesSuccess
    | LoadKabaddiResults | LoadKabaddiResultsSuccess
    | LoadKabaddiLive | LoadKabaddiLiveSuccess
    | KabaddiStartLoading | KabaddiStopLoading;