import { Action } from "@ngrx/store";
export const SAVE_FAVOURITES = '[Favourites] Save Favourites objects';

export class SaveFavourites implements Action {
    readonly type = SAVE_FAVOURITES
    constructor(public payload: any) { }
}

export type FavouritesActions = SaveFavourites;