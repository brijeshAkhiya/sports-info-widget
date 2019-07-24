import { Action } from "@ngrx/store";
export const KABADDI_RESULTS = '[Kabaddi Results] Save Kabaddi Results objects';

export class KabaddiResults implements Action {
    readonly type = KABADDI_RESULTS
    constructor(public payload: any) { }
}
export type KabaddiResultsActions = KabaddiResults 