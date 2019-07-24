import { Action } from "@ngrx/store";
import { CricketResultsActions, CRICKET_RESULTS } from "./cricket-results.actions";


export interface CricketResults {
    cricketresults: []
}

const initialState = {
    cricketresults: []
};

export function CricketResultsReducer(state = initialState, action: CricketResultsActions) {
    switch (action.type) {
        case CRICKET_RESULTS:
            return { ...state, cricketresults: action.payload };
        default: {
            return state
        }
    }
}

export const getCricketResults = (state:CricketResults) => state.cricketresults;