import { Action } from "@ngrx/store";
import { KabaddiTeamLogosActions, SAVE_KABADDI_TEAM_LOGOS } from "./kabaddi-team-logo.actions";


export interface KabaddiLogos {
    kabaddilogos: []
}

const initialState = {
    kabaddilogos: []
};

export function KabaddiTeamLogosReducer(state = initialState, action: KabaddiTeamLogosActions) {
    switch (action.type) {
        case SAVE_KABADDI_TEAM_LOGOS:
            return { ...state, kabaddilogos: action.payload };
        default: {
            return state
        }
    }
}

export const getKabaddiTeamLogos = (state: KabaddiLogos) => state.kabaddilogos;