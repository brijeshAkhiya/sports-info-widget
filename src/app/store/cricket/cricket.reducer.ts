import { CricketActions, LOAD_CRICKET_FIXTURES, LOAD_CRICKET_RESULTS_SUCCESS, CRICKET_LIVE_MATCHES, CRICKET_FIXTURES_MATCHES, CRICKET_RESULTS_MATCHES, CRICKET_MATCH_INFO, LOAD_CRICKET_FIXTURES_SUCCESS, LOAD_CRICKET_RESULTS } from "./cricket.actions";

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
        case LOAD_CRICKET_FIXTURES:
            return state
        case LOAD_CRICKET_FIXTURES_SUCCESS:
            return { ...state, fixtures: action.payload };
        case LOAD_CRICKET_RESULTS:
            return state
        case LOAD_CRICKET_RESULTS_SUCCESS:
            return { ...state, results: action.payload };
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


