import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from "./store/auth/auth.reducer";
import * as fromAds from "./store/ads-management/ads.reducer";
import * as fromMetatags from "./store/meta-tags-management/meta-tags.reducer";
import * as fromFavourites from "./store/favourites-management/favourites.reducer";
import * as fromKabaddiTeamLogos from "./store/kabaddi-team-logo/kabaddi-team-logo.reducer";

export interface State {
    auth: fromAuth.State;
    ads: fromAds.Ads,
    Metatags: fromMetatags.MetaTags,
    Favourites: fromFavourites.Favourites,
    KabaddiLogos:fromKabaddiTeamLogos.KabaddiLogos
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.authReducer,
    ads: fromAds.adsReducer,
    Metatags: fromMetatags.metaTagsReducer,
    Favourites: fromFavourites.favouritesReducer,
    KabaddiLogos:fromKabaddiTeamLogos.KabaddiTeamLogosReducer
};


//auth states 

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth)

//ads states
export const adsState = createFeatureSelector<fromAds.Ads>('ads');
export const getAdsState = createSelector(
    adsState,
    fromAds.getAds
)

//meta tags states

export const metaState = createFeatureSelector<fromMetatags.MetaTags>('MetaTags');
export const getMetaState = createSelector(
    metaState,
    fromMetatags.getMetaTags
)


//favourites states

export const favouriteState = createFeatureSelector<fromFavourites.Favourites>('Favourites');
export const getFavouriteState = createSelector(
    favouriteState,
    fromFavourites.getFavourites
)

//kabaddi team logos state


//favourites states

export const KabaddiTeamLogosState = createFeatureSelector<fromKabaddiTeamLogos.KabaddiLogos>('Favourites');
export const getKabaddiTeamLogosState = createSelector(
    KabaddiTeamLogosState,
    fromKabaddiTeamLogos.getKabaddiTeamLogos
)

