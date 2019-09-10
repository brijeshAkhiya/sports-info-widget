import { KabaddiActions, LOAD_KABADDI_RESULTS, KABADDI_START_LOADING, KABADDI_STOP_LOADING, LOAD_KABADDI_RESULTS_SUCCESS, KABADDI_LIVE_MATCHES, KABADDI_FIXTURES_MATCHES, KABADDI_RESULTS_MATCHES, KABADDI_MATCH_INFO, LOAD_KABADDI_FIXTURES, LOAD_KABADDI_FIXTURES_SUCCESS, LOAD_KABADDI_LIVE_MATCHES, LOAD_KABADDI_LIVE_MATCHES_SUCCESS } from "./kabaddi.actions";

export interface KabaddiData {
    fixtures: {},
    live: {},
    results: {},
    info: {},
    loader: boolean
}

const initialState = {
    fixtures: {},
    live: {},
    results: {},
    info: {},
    loader: false
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
            return { ...state, info: action.payload };
        case KABADDI_START_LOADING:
            return { ...state, loader: true };
        case KABADDI_STOP_LOADING:
            return { ...state, loader: false };
        default: {
            return state
        }
    }
}


