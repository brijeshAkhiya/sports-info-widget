import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromRoot from '../../app-reducer';
import * as Hockey from '@store/hockey/hockey.actions';

import { Action, Store } from '@ngrx/store';
import { SportsService } from '@app/shared/providers/sports-service';
import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class HockeyEffects {

    constructor(private actions$: Actions, private sportsService: SportsService, private store: Store<fromRoot.State>) { }

    @Effect()
    LoadHockeyCompSeason$: Observable<Action> = this.actions$.pipe(
        ofType(Hockey.LOAD_HOCKEY_COMP_SEASONS),
        switchMap((action: any) =>
            this.sportsService.getCompetitionSeason(action.payload).pipe(
                map((response: any) => new Hockey.LoadHockeyCompSeasonSuccess({ 'comp': action.payload, 'season': response.data.seasons })),
                catchError(() => {
                    return EMPTY;
                })
            )),
    );

    /** Hockey schedule effect */
    @Effect()
    LoadHockeyScheduleSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Hockey.LOAD_HOCKEY_SCHEDULE),
        // tap(() => this.store.dispatch(new Hockey.HockeyStartLoading())),
        switchMap((action: any) =>
            this.sportsService.getHockeySchedule().pipe(
                map((response: any) => new Hockey.LoadHockeyScheduleSuccess(response.data)),
                // tap(() => this.store.dispatch(new Hockey.HockeyStopLoading())),
                catchError(() => {
                    // this.store.dispatch(new Hockey.HockeyStopLoading());
                    return EMPTY;
                })
            )),
        take(1)
    );
}







