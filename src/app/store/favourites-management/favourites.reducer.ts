import { Action } from "@ngrx/store";
import { FavouritesActions, SAVE_FAVOURITES } from "./favourites.actions";


export interface Favourites {
    Favourites: []
}

const initialState = {
    Favourites: []
};

export function favouritesReducer(state = initialState, action: FavouritesActions) {
    switch (action.type) {
        case SAVE_FAVOURITES:
            return { ...state, Favourites: action.payload };
        default: {
            return state
        }
    }
}

export const getFavourites = (state: Favourites) => state.Favourites;