import * as fromRacing from '@store/racing/racing.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';



export const getRacingState = createFeatureSelector<fromRacing.RacingData>('Racing');

export const getRacingSeasons = createSelector(
    getRacingState,
    (state: fromRacing.RacingData) => state.seasons
);
