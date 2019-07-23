import { Action } from "@ngrx/store";
export const SAVE_SPORTS_FIXTURES= '[Sports Fixtures] Save Sports Fixtures objects';

export class SaveSportsFixtures implements Action {
    readonly type = SAVE_SPORTS_FIXTURES
    constructor(public payload: any) { }
}

export type SportsFixturesActions = SaveSportsFixtures;