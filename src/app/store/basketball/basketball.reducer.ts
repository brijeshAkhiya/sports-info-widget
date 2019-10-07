import {
    BasketballActions, LOAD_BASKETBALL_SCHEDULE, LOAD_BASKETBALL_SCHEDULE_SUCCESS, BASKETBALL_START_LOADING, BASKETBALL_STOP_LOADING, LOAD_BASKETBALL_MATCH_INFO, LOAD_BASKETBALL_MATCH_INFO_SUCCESS
} from './basketball.actions';

export interface BasketballData {
    schedule: [];
    loader: boolean;
    info: [];
}


const initialState = {
    schedule: [],
    loader: false,
    info: []
};

export function BasketballReducer(state = initialState, action: BasketballActions): any {
    switch (action.type) {
        case LOAD_BASKETBALL_SCHEDULE:
            return state;
        case LOAD_BASKETBALL_SCHEDULE_SUCCESS:
            return { ...state, schedule: action.payload };
        case LOAD_BASKETBALL_MATCH_INFO:
            return state;
        case LOAD_BASKETBALL_MATCH_INFO_SUCCESS:
            return { ...state, schedule: action.payload };
        case BASKETBALL_START_LOADING:
            return { ...state, loader: true };
        case BASKETBALL_STOP_LOADING:
            return { ...state, loader: false };
        default: {
            return state;
        }
    }
}
