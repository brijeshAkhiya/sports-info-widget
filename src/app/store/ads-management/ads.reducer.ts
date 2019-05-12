import { Action } from "@ngrx/store";
import { AdsActions, SAVE_ADS } from "./ads.actions";
import * as AdsAction from './ads.actions'

export interface Ads {
    Ads: []
}

const initialState = {
    Ads: []
};

export function adsReducer(state = initialState, action: AdsActions) {
    switch (action.type) {
        case SAVE_ADS:
            return { ...state, Ads: action.payload };
        default: {
            return state
        }
    }
}

export const getAds = (state: Ads) => state.Ads;