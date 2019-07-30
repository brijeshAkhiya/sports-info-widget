import { Action } from "@ngrx/store";
export const KABADDI_FIXTURES_MATCHES = '[Kabaddi Fixtures Matches] Save Kabaddi Fixtures Matches';
export const KABADDI_RESULTS_MATCHES = '[Kabaddi Results Matches] Save Kabaddi Results Matches';
export const KABADDI_LIVE_MATCHES = '[Kabaddi Live Matches] Save Kabaddi Live Matches';
export const KABADDI_MATCH_INFO = '[Kabaddi Live Matches] Save Kabaddi Live Matches';

export class KabaddiFixtures implements Action {
    readonly type = KABADDI_FIXTURES_MATCHES
    constructor(public payload: any) { }
}

export class KabaddiLiveMatches implements Action {
    readonly type = KABADDI_LIVE_MATCHES
    constructor(public payload: any) { }
}

export class KabaddiResults implements Action {
    readonly type = KABADDI_RESULTS_MATCHES
    constructor(public payload: any) { }
}


export class KabaddiMatchInfo implements Action {
    readonly type = KABADDI_MATCH_INFO
    constructor(public payload: any) { }
}

export type KabaddiActions = KabaddiFixtures | KabaddiLiveMatches | KabaddiResults | KabaddiMatchInfo