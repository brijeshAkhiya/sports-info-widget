import { SoccerActions, LOAD_SOCCER_RESULTS, LOAD_SOCCER_RESULTS_SUCCESS, SOCCER_LIVE_MATCHES, SOCCER_FIXTURES_MATCHES, SOCCER_RESULTS_MATCHES, SOCCER_MATCH_INFO, LOAD_SOCCER_FIXTURES_SUCCESS, LOAD_SOCCER_FIXTURES, LOAD_SOCCER_LIVE_MATCHES_SUCCESS, LOAD_SOCCER_LIVE_MATCHES } from "./soccer.actions";

export interface SoccerData {
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

export function SoccerReducer(state = initialState, action: SoccerActions): any {
    switch (action.type) {
        case LOAD_SOCCER_FIXTURES:
            return state
        case LOAD_SOCCER_FIXTURES_SUCCESS:
            return { ...state, fixtures: action.payload };
        case LOAD_SOCCER_RESULTS:
            return state
        case LOAD_SOCCER_RESULTS_SUCCESS:
            return { ...state, results: action.payload };
        case LOAD_SOCCER_LIVE_MATCHES:
            return state
        case LOAD_SOCCER_LIVE_MATCHES_SUCCESS:
            return { ...state, live: action.payload };
        case SOCCER_LIVE_MATCHES:
            return { ...state, live: action.payload };
        case SOCCER_FIXTURES_MATCHES:
            return { ...state, fixtures: action.payload };
        case SOCCER_RESULTS_MATCHES:
            return { ...state, results: action.payload };
        case SOCCER_MATCH_INFO:
            return { ...state, info: action.payload };
        default: {
            return state
        }
    }
}


