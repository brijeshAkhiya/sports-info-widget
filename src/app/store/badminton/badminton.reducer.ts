import * as BadmintonActions from './badminton.actions';

export interface BadmintonData {
    loader: boolean;
    seasons: { [id: string]: any };
}
const initialState = {
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
        default: {
            return state;
        }
    }
}

export const getSeasons = (state: BadmintonData) => state.seasons;
