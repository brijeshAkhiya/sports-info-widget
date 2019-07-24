import { Action } from "@ngrx/store";
export const KABADDI_FIXTURES = '[Kabaddi Fixtures] Save Kabaddi Fixtures objects';

export class KabaddiFixtures implements Action {
    readonly type = KABADDI_FIXTURES
    constructor(public payload: any) { }
}
export type KabaddiFixturesActions = KabaddiFixtures 