import { Action } from "@ngrx/store";
import { SportsFixturesActions, SAVE_SPORTS_FIXTURES } from "./fixtures.actions";


export interface SportsFixtures {
    fixtures: []
}

const initialState = {
    fixtures: []
};

export function SportsFixturesReducer(state = initialState, action: SportsFixturesActions) {
    switch (action.type) {
        case SAVE_SPORTS_FIXTURES:
            return { ...state, fixtures: action.payload };
        default: {
            return state
        }
    }
}

export const getSportsFixtures = (state: SportsFixtures) => state.fixtures;