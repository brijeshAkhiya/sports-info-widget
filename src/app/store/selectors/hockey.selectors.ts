import * as fromHockey from '@store/hockey/hockey.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';



export const getHockeyState = createFeatureSelector<fromHockey.HockeyData>('Hockey');

export const getHockeySeasons = createSelector(
    getHockeyState,
    (state: fromHockey.HockeyData) => state.seasons
);
