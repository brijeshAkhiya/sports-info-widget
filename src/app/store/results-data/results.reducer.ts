import { Action } from "@ngrx/store";
import { SportsResultsActions, SAVE_SPORTS_RESULTS } from "./results.actions";


export interface SportsResults {
    results: []
}

const initialState = {
    results: []
};

export function SportsResultsReducer(state = initialState, action: SportsResultsActions) {
    switch (action.type) {
        case SAVE_SPORTS_RESULTS:
            return { ...state, results: action.payload };
        default: {
            return state
        }
    }
}

export const getSportsResults = (state:SportsResults) => state.results;