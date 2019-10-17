import * as BadmintonActions from './badminton.actions';

export interface BadmintonData {
    schedule: [];
    loader: boolean;
    seasons: { [id: string]: any };
}
const initialState = {
    schedule: [],
    loader: false,
    seasons: {},
};

export function BadmintonReducer(state = initialState, action: BadmintonActions.BadmintonActions): any {
    switch (action.type) {
        case BadmintonActions.LOAD_BADMINTON_COMP_SEASONS: {
            return state;
        }
        case BadmintonActions.LOAD_BADMINTON_COMP_SEASONS_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                seasons: Object.assign({}, state.seasons, {
                    [data.comp]: data.season
                }),
            };
        }
        case BadmintonActions.LOAD_BADMINTON_SCHEDULE:
            return state;
        case BadmintonActions.LOAD_BADMINTON_SCHEDULE_SUCCESS:
            return { ...state, schedule: action.payload };
        default: {
            return state;
        }
    }
}

export const getSeasons = (state: BadmintonData) => state.seasons;
