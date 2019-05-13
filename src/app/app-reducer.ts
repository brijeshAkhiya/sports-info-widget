import { ActionReducerMap,createFeatureSelector,createSelector } from '@ngrx/store';
import * as fromAuth from "./store/auth/auth.reducer";
import * as fromAds from "./store/ads-management/ads.reducer";


export interface State {
    auth:fromAuth.State;
    ads:fromAds.Ads
}

export const reducers : ActionReducerMap<State> = {
    auth:fromAuth.authReducer,
    ads:fromAds.adsReducer
};


//auth states 

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState,fromAuth.getIsAuth)

//ads states
export const appState = (state) => state;
export const getAdsState = createSelector(
    appState,
    state => state.ads
)
