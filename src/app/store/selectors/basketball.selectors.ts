import * as fromBasketball from '@store/basketball/basketball.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';



export const getBasketballState = createFeatureSelector<fromBasketball.BasketballData>('Basketball');

export const getBasketballMatches = createSelector(
    getBasketballState,
    (state: fromBasketball.BasketballData) => state.matches
);
export const getBasketballSchedule = createSelector(
    getBasketballState,
    (state: fromBasketball.BasketballData) => state.schedule
);
