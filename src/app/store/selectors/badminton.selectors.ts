import * as fromBadminton from '@store/badminton/badminton.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';



export const getBadmintonState = createFeatureSelector<fromBadminton.BadmintonData>('Badminton');

export const getBadmintonSeasons = createSelector(
    getBadmintonState,
    (state: fromBadminton.BadmintonData) => state.seasons
);
