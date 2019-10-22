import * as RacingActions from './racing.actions';

export interface RacingData {
    schedule: [];
    loader: boolean;
    seasons: { [id: string]: any };
}
const initialState = {
    schedule: [],
    loader: false,
    seasons: {},
};

export function RacingReducer(state = initialState, action: RacingActions.RacingActions): any {
    switch (action.type) {
        case RacingActions.LOAD_RACING_COMP_SEASONS: {
            return state;
        }
        case RacingActions.LOAD_RACING_COMP_SEASONS_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                seasons: Object.assign({}, state.seasons, {
                    [data.comp]: data.season
                }),
            };
        }
        case RacingActions.LOAD_RACING_SCHEDULE:
            return state;
        case RacingActions.LOAD_RACING_SCHEDULE_SUCCESS:
            return { ...state, schedule: action.payload };
        default: {
            return state;
        }
    }
}

export const getSeasons = (state: RacingData) => state.seasons;
