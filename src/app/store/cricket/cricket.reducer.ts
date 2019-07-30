import { CricketActions, CRICKET_LIVE_MATCHES, CRICKET_FIXTURES_MATCHES, CRICKET_RESULTS_MATCHES, CRICKET_MATCH_INFO } from "./cricket.actions";

export interface CricketData {
    fixtures: [],
    live: [],
    results: [],
    info: []
}

const initialState = {
    fixtures: [],
    live: [],
    results: [],
    info: []
};

export function CircketReducer(state = initialState, action: CricketActions): any {
    switch (action.type) {
        case CRICKET_LIVE_MATCHES:
            return { ...state, live: action.payload };
        case CRICKET_FIXTURES_MATCHES:
            return { ...state, fixtures: action.payload };
        case CRICKET_RESULTS_MATCHES:
            return { ...state, results: action.payload };
        case CRICKET_MATCH_INFO:
            return { ...state, results: action.payload };
        default: {
            return state
        }
    }
}


