import {
    BasketballActions, LOAD_BASKETBALL_SCHEDULE, LOAD_BASKETBALL_SCHEDULE_SUCCESS, SAVE_BASKETBALL_MATCHES, BASKETBALL_START_LOADING, BASKETBALL_STOP_LOADING
} from './basketball.actions';

export interface BasketballData {
    schedule: [];
    loader: boolean;
    matches: { [id: string]: any };

}


const initialState = {
    schedule: [],
    loader: false,
    matches: {}

};

export function BasketballReducer(state = initialState, action: BasketballActions): any {
    switch (action.type) {
        case LOAD_BASKETBALL_SCHEDULE:
            return state;
        case LOAD_BASKETBALL_SCHEDULE_SUCCESS:
            return { ...state, schedule: action.payload };
        case BASKETBALL_START_LOADING:
            return { ...state, loader: true };
        case BASKETBALL_STOP_LOADING:
            return { ...state, loader: false };
        case SAVE_BASKETBALL_MATCHES: {
            const match = action.payload;
            return {
                ...state,
                matches: Object.assign({}, state.matches, {
                    [match.id]: match
                })
            };

        } default: {
            return state;
        }
    }
}
