import { KabaddiActions, LOAD_KABADDI_RESULTS, LOAD_KABADDI_RESULTS_SUCCESS, KABADDI_LIVE_MATCHES, KABADDI_FIXTURES_MATCHES, KABADDI_RESULTS_MATCHES, KABADDI_MATCH_INFO, LOAD_KABADDI_FIXTURES, LOAD_KABADDI_FIXTURES_SUCCESS, LOAD_KABADDI_LIVE_MATCHES, LOAD_KABADDI_LIVE_MATCHES_SUCCESS } from "./kabaddi.actions";

export interface KabaddiData {
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

export function KabaddiReducer(state = initialState, action: KabaddiActions): any {
    switch (action.type) {
        case LOAD_KABADDI_FIXTURES:
            return state
        case LOAD_KABADDI_FIXTURES_SUCCESS:
            return { ...state, fixtures: action.payload };
        case LOAD_KABADDI_RESULTS:
            return state
        case LOAD_KABADDI_RESULTS_SUCCESS:
            return { ...state, results: action.payload };
        case LOAD_KABADDI_LIVE_MATCHES:
            return state
        case LOAD_KABADDI_LIVE_MATCHES_SUCCESS:
            return { ...state, live: action.payload };
        case KABADDI_LIVE_MATCHES:
            return { ...state, live: action.payload };
        case KABADDI_FIXTURES_MATCHES:
            return { ...state, fixtures: action.payload };
        case KABADDI_RESULTS_MATCHES:
            return { ...state, results: action.payload };
        case KABADDI_MATCH_INFO:
            return { ...state, results: action.payload };
        default: {
            return state
        }
    }
}


