import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '@store/auth/auth.reducer';
import * as fromAds from '@store/ads-management/ads.reducer';
import * as fromMetatags from '@store/meta-tags-management/meta-tags.reducer';
import * as fromFavourites from '@store/favourites-management/favourites.reducer';
import * as fromCricket from '@store/cricket/cricket.reducer';
import * as fromKabaddi from '@store/kabaddi/kabaddi.reducer';
import * as fromSoccer from '@store/soccer/soccer.reducer';


export interface State {
    auth: fromAuth.State;
    ads: fromAds.Ads;
    Metatags: fromMetatags.MetaTags;
    Favourites: fromFavourites.Favourites;
    Cricket: fromCricket.CricketData;
    Kabaddi: fromKabaddi.KabaddiData;
    Soccer: fromSoccer.SoccerData;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.authReducer,
    ads: fromAds.adsReducer,
    Metatags: fromMetatags.metaTagsReducer,
    Favourites: fromFavourites.favouritesReducer,
    Cricket: fromCricket.CircketReducer,
    Kabaddi: fromKabaddi.KabaddiReducer,
    Soccer: fromSoccer.SoccerReducer
};


/* //auth states  */

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

/* //ads states */
export const adsState = createFeatureSelector<fromAds.Ads>('ads');
export const getAdsState = createSelector(
    adsState,
    fromAds.getAds
);

/* //meta tags states */

export const metaState = createFeatureSelector<fromMetatags.MetaTags>('MetaTags');
export const getMetaState = createSelector(
    metaState,
    fromMetatags.getMetaTags
);


/* //favourites states */

export const favouriteState = createFeatureSelector<fromFavourites.Favourites>('Favourites');
export const getFavouriteState = createSelector(
    favouriteState,
    fromFavourites.getFavourites
);

