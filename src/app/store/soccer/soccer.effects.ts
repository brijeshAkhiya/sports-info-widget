import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromRoot from '../../app-reducer';
import * as Soccer from '@store/soccer/soccer.actions';

import { Action, Store } from '@ngrx/store';
import { SportsService } from '@app/shared/providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';

import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class SoccerEffects {
    date = new Date();
    constructor(private actions$: Actions, private sportsService: SportsService, private commonService: CommonService, private store: Store<fromRoot.State>) { }

    @Effect()
    loadSoccerFixturesSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Soccer.LOAD_SOCCER_FIXTURES),
        tap(() => this.store.dispatch(new Soccer.SoccerStartLoading())
        ),
        switchMap((action: any) =>
            this.sportsService.getSoccerDailySummary(this.commonService.convertDate(this.date)).pipe(
                map((response: any) => new Soccer.LoadSoccerFixturesSuccess(response.data.summaries)),
                tap(() => this.store.dispatch(new Soccer.SoccerStopLoading())),
                catchError(() => {
                    return EMPTY;
                })
            )),

        take(1)
    );

    /* //get soccer tournament list effect */
    @Effect()
    loadSoccerTournamentListSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Soccer.LOAD_SOCCER_TOURNAMENTS_LIST),
        switchMap((action: any) =>
            this.sportsService.getSoccerTournamentList().pipe(
                map((response: any) => new Soccer.LoadSoccerTournamentListSuccess(response.data)),
                catchError(() => {
                    this.store.dispatch(new Soccer.SoccerStopLoading());
                    return EMPTY;
                })
            )),
        take(1)
    );

}







