import { Action } from "@ngrx/store";
export const KABADDI_MATCH_DATA = '[Kabaddi Match data] Save Kabaddi Match data';

export class KabaddiMatchData implements Action {
    readonly type = KABADDI_MATCH_DATA
    constructor(public payload: any) { }
}
export type KabaddiMatchDataActions = KabaddiMatchData 