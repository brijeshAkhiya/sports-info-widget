import { Action } from "@ngrx/store";
export const CRICKET_FIXTURES= '[Cricket Fixtures] Save Cricket Fixtures objects';
export class CircketFixtures implements Action {
    readonly type = CRICKET_FIXTURES
    constructor(public payload:any) { }
}

export type CricketFixturesActions = CircketFixtures 