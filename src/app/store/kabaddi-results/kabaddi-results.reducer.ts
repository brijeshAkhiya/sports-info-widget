import { Action } from "@ngrx/store";
import { KabaddiResultsActions, KABADDI_RESULTS } from "./kabaddi-results.actions";

export interface KabaddiResults {
    kabaddiresults: []
}

const initialState = {
    kabaddiresults: []
};

export function KabaddiResultsReducer(state = initialState, action: KabaddiResultsActions) {
    switch (action.type) {
        case KABADDI_RESULTS:
            return { ...state, kabaddiresults: action.payload };
        default: {
            return state
        }
    }
}

export const getKabaddiResults = (state: KabaddiResults) => state.kabaddiresults;