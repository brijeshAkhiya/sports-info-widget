import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from "@store/auth/auth.reducer";
import * as fromAds from "@store/ads-management/ads.reducer";
import * as fromMetatags from "@store/meta-tags-management/meta-tags.reducer";
import * as fromFavourites from "@store/favourites-management/favourites.reducer";
import * as fromKabaddiTeamLogos from "@store/kabaddi-team-logo/kabaddi-team-logo.reducer";
import * as fromCricketFixtures  from '@store/cricket-fixtures/cricket-fixtures.reducer'
import * as fromCricketResults from "@store/cricket-results/cricket-results.reducer";
import * as fromKabaddiFixtures  from "@store/kabaddi-fixtures/kabaddi-fixtures.reducer";
import * as fromKabaddiResults  from "@store/kabaddi-results/kabaddi-results.reducer";
import * as fromKabaddiMatchData  from "@store/kabaddi-match-data/kabaddi-match-data.reducer";

export interface State {
    auth: fromAuth.State;
    ads: fromAds.Ads,
    Metatags: fromMetatags.MetaTags,
    Favourites: fromFavourites.Favourites,
    KabaddiLogos: fromKabaddiTeamLogos.KabaddiLogos,
    CricketFixtures: fromCricketFixtures.CricketFixtures,
    CricketResults:fromCricketResults.CricketResults,
    KabaddiFixtures:fromKabaddiFixtures.KabaddiFixtures,
    KabaddiResults:fromKabaddiResults.KabaddiResults,
    KabaddiMatchData:fromKabaddiMatchData.KabaddiMatchData
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.authReducer,
    ads: fromAds.adsReducer,
    Metatags: fromMetatags.metaTagsReducer,
    Favourites: fromFavourites.favouritesReducer,
    KabaddiLogos: fromKabaddiTeamLogos.KabaddiTeamLogosReducer,
    CricketFixtures: fromCricketFixtures.CricketFixturesReducer,
    CricketResults:fromCricketResults.CricketResultsReducer,
    KabaddiFixtures:fromKabaddiFixtures.KabaddiFixturesReducer,
    KabaddiResults:fromKabaddiResults.KabaddiResultsReducer,
    KabaddiMatchData:fromKabaddiMatchData.KabaddiMatchDataReducer
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

export const KabaddiTeamLogosState = createFeatureSelector<fromKabaddiTeamLogos.KabaddiLogos>('Favourites');
export const getKabaddiTeamLogosState = createSelector(
    KabaddiTeamLogosState,
    fromKabaddiTeamLogos.getKabaddiTeamLogos
)

//cricket fixtures data


export const CricketFixturesState = createFeatureSelector<fromCricketFixtures.CricketFixtures>('CricketFixtures');
export const getCricketFixtures = createSelector(
    CricketFixturesState,
    fromCricketFixtures.getCricketFixtures
)

//cricket results data 

export const CricketResultsState = createFeatureSelector<fromCricketResults.CricketResults>('CricketResults');
export const getCricketResults = createSelector(
    CricketResultsState,
    fromCricketResults.getCricketResults
)

//Kabaddi fixtures data 

export const KabaddiFixturesState = createFeatureSelector<fromKabaddiFixtures.KabaddiFixtures>('KabaddiFixtures');
export const getKabaddiFixtures = createSelector(
    KabaddiFixturesState,
    fromKabaddiFixtures.getKabaddiFixtures
)

//Kabaddi results data

export const KabaddiResultsState = createFeatureSelector<fromKabaddiResults.KabaddiResults>('KabaddiResults');
export const getKabaddiResults = createSelector(
    KabaddiResultsState,
    fromKabaddiResults.getKabaddiResults
)

//kabaddi match data 


// export const KabaddiMatchDataState = createFeatureSelector<fromKabaddiMatchData.KabaddiMatchData>('');
// export const getKabaddiResults = createSelector(
//     KabaddiResultsState,
//     fromKabaddiResults.getKabaddiResults
// )




