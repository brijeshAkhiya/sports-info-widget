import * as HockeyActions from './hockey.actions';

export interface HockeyData {
    schedule: [];
    loader: boolean;
    seasons: { [id: string]: any };
}
const initialState = {
    schedule: [],
    loader: false,
    seasons: {},
};

export function HockeyReducer(state = initialState, action: HockeyActions.HockeyActions): any {
    switch (action.type) {
        case HockeyActions.LOAD_HOCKEY_COMP_SEASONS: {
            return state;
        }
        case HockeyActions.LOAD_HOCKEY_COMP_SEASONS_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                seasons: Object.assign({}, state.seasons, {
                    [data.comp]: data.season
                }),
            };
        }
        case HockeyActions.LOAD_HOCKEY_SCHEDULE:
            return state;
        case HockeyActions.LOAD_HOCKEY_SCHEDULE_SUCCESS:
            return { ...state, schedule: action.payload };
        default: {
            return state;
        }
    }
}

export const getSeasons = (state: HockeyData) => state.seasons;
