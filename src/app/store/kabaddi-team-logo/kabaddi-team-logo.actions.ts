import { Action } from "@ngrx/store";
export const SAVE_KABADDI_TEAM_LOGOS = '[Kabaddi team logos] Save Kabaddi  team logos objects';

export class SaveKabaddiTeamLogos implements Action {
    readonly type = SAVE_KABADDI_TEAM_LOGOS
    constructor(public payload: any) { }
}

export type KabaddiTeamLogosActions = SaveKabaddiTeamLogos;