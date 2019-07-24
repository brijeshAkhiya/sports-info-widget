import { Action } from "@ngrx/store";
import { KabaddiFixturesActions, KABADDI_FIXTURES } from "./kabaddi-fixtures.actions";


export interface KabaddiFixtures {
  kabaddifixtures:[]
}

const initialState = {
    kabaddifixtures:[]
};

export function KabaddiFixturesReducer(state = initialState, action: KabaddiFixturesActions) {
    switch (action.type) {
        case KABADDI_FIXTURES:
            return { ...state,kabaddifixtures:action.payload};
        default: {
            return state
        }
    }
}

export const getKabaddiFixtures = (state: KabaddiFixtures) => state.kabaddifixtures;