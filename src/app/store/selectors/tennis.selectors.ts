import * as fromTennis from '@store/tennis/tennis.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';



export const getTennisState = createFeatureSelector<fromTennis.TennisData>('Tennis');

export const getTennisMatches = createSelector(
    getTennisState,
    (state: fromTennis.TennisData) => state.matches
);
export const getTennisSchedule = createSelector(
    getTennisState,
    (state: fromTennis.TennisData) => state.schedule
);
export const getTennisLiveIds = createSelector(
    getTennisState,
    (state: fromTennis.TennisData) => state.ids
);
