import { ActionReducerMap,createFeatureSelector,createSelector } from '@ngrx/store';
import * as fromAuth from "./store/auth/auth.reducer";
import * as fromAds from "./store/ads-management/ads.reducer";
import * as fromMetatags from "./store/meta-tags-management/meta-tags.reducer";



export interface State {
    auth:fromAuth.State;
    ads:fromAds.Ads,
    Metatags:fromMetatags.MetaTags
}

export const reducers : ActionReducerMap<State> = {
    auth:fromAuth.authReducer,
    ads:fromAds.adsReducer,
    Metatags:fromMetatags.metaTagsReducer
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

//meta tags states

export const metaState = (state) => state;
export const getMetaState = createSelector(
    metaState,
    state => state.ads
)
