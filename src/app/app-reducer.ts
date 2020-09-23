import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCricket from '@store/cricket/cricket.reducer';



export interface State {
    Cricket: fromCricket.CricketData;
}

export const reducers: ActionReducerMap<State> = {
    Cricket: fromCricket.CircketReducer,
};
