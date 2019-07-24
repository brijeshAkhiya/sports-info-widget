import { Action } from "@ngrx/store";
import { CricketFixturesActions, CRICKET_FIXTURES } from "./cricket-fixtures.actions";


export interface CricketFixtures {
    cricketfixtures: []
}

const initialState = {
    cricketfixtures: []
};

export function CricketFixturesReducer(state = initialState, action: CricketFixturesActions) {
    switch (action.type) {
        case CRICKET_FIXTURES:
            return { ...state, cricketfixtures: action.payload };
        default: {
            return state
        }
    }
}

export const getCricketFixtures = (state: CricketFixtures) => state.cricketfixtures;