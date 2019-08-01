import { Action } from "@ngrx/store";
export const CRICKET_FIXTURES_MATCHES = '[Cricket Fixtures Matches] Save Cricket Fixtures Matches';
export const CRICKET_RESULTS_MATCHES = '[Cricket Results Matches] Save Cricket Results Matches';
export const CRICKET_LIVE_MATCHES = '[Cricket Live Matches] Save Cricket Live Matches';
export const CRICKET_MATCH_INFO = '[Cricket Live Matches] Save Cricket Live Matches';

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

export type CricketActions = CricketFixtures | CricketLiveMatches | CricketResults | CricketMatchInfo