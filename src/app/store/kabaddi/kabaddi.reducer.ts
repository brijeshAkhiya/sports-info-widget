import { KabaddiActions, KABADDI_LIVE_MATCHES, KABADDI_FIXTURES_MATCHES, KABADDI_RESULTS_MATCHES, KABADDI_MATCH_INFO } from "./kabaddi.actions";

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


