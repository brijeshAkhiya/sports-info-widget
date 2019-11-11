import {
    TennisActions, LOAD_TENNIS_SCHEDULE, LOAD_TENNIS_SCHEDULE_SUCCESS, SAVE_TENNIS_MATCHES, TENNIS_START_LOADING, TENNIS_STOP_LOADING, REMOVE_TENNIS_UPDATE
} from './tennis.actions';

export interface TennisData {
    schedule: [];
    loader: boolean;
    matches: { [id: string]: any };
    ids: any;
}


const initialState = {
    schedule: [],
    loader: false,
    matches: {},
    ids: [],
};

export function TennisReducer(state = initialState, action: TennisActions): any {
    switch (action.type) {
        case LOAD_TENNIS_SCHEDULE:
            return state;
        case LOAD_TENNIS_SCHEDULE_SUCCESS:
            return { ...state, schedule: action.payload };
        case TENNIS_START_LOADING:
            return { ...state, loader: true };
        case TENNIS_STOP_LOADING:
            return { ...state, loader: false };
        case SAVE_TENNIS_MATCHES: {
            const payload = action.payload;
            console.log(payload)
            console.log(payload.matches.length)
            return {
                ...state,
                matches: payload.matches,
                ids: payload.ids,
            };

        }
        case REMOVE_TENNIS_UPDATE: {
            return Object.assign({}, state, {
                ids: []
            });
        }
        default: {
            return state;
        }
    }
}
