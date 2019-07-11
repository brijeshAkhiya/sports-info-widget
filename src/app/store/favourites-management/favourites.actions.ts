import { Action } from "@ngrx/store";
import { favouritesReducer } from './favourites.reducer'
export const SAVE_FAVOURITES = '[Favourites] Save Favourites objects';

// export class GetToken implements Action {
//     readonly type =  GET_TOKEN 
// }

export class SaveFavourites implements Action {
    readonly type = SAVE_FAVOURITES
    constructor(public payload: any) { }
}

export type FavouritesActions = SaveFavourites;