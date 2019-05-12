import { Action } from "@ngrx/store";
import {Ads} from './ads.reducer'
export const SAVE_ADS = '[Ads] Save Ads objects';

// export class GetToken implements Action {
//     readonly type =  GET_TOKEN 
// }

export class SaveAds implements Action {
    readonly type =  SAVE_ADS

    constructor(public payload: any) {}

}

export type AdsActions =  SaveAds;