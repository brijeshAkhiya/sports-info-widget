import { Action } from "@ngrx/store";
import { KabaddiMatchDataActions, KABADDI_MATCH_DATA } from "./kabaddi-match-data.actions";


export interface KabaddiMatchData {
  kabaddimatchdata:[]
}

const initialState = {
    kabaddimatchdata:[]
};

export function KabaddiMatchDataReducer(state = initialState, action: KabaddiMatchDataActions) {
    switch (action.type) {
        case KABADDI_MATCH_DATA:
            return { ...state,kabaddimatchdata:action.payload};
        default: {
            return state
        }
    }
}

export const getKabaddiMatchData = (state: KabaddiMatchData) => state.kabaddimatchdata;