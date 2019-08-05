import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromRoot from "../../app-reducer";
import * as Soccer from "@store/soccer/soccer.actions";

import { Action, Store } from '@ngrx/store';
import { SportsService } from '@app/shared/providers/sports-service';
import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class SoccerEffects {

    constructor(private actions$: Actions, private sportsService: SportsService,private store: Store<fromRoot.State>) { }

    @Effect()
    loadSoccerFixturesSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Soccer.LOAD_SOCCER_FIXTURES),
        tap(() => console.log('in soccer effect')),
        switchMap((action: any) =>
            this.sportsService.getKabaddiMatchList('1', '10', '1').pipe(
                map((response: any) => new Soccer.LoadSoccerFixturesSuccess(response.data.items)),
                catchError(() => {
                    this.store.dispatch(new Soccer.LoadSoccerFixtures());
                    return EMPTY;
                })
            )),
        take(1)
    );

    @Effect()
    loadSoccerResultsSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Soccer.LOAD_SOCCER_RESULTS),
        tap(() => console.log('in soccer effect')),
        switchMap((action: any) =>
            this.sportsService.getKabaddiMatchList('2', '10', '1').pipe(
                map((response: any) => new Soccer.LoadSoccerResultsSuccess(response.data.items)),
                catchError(() => {
                    this.store.dispatch(new Soccer.LoadSoccerResults());
                    return EMPTY;
                })
            )),
        take(1)
    );

    @Effect()
    loadSoccerLiveSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Soccer.LOAD_SOCCER_LIVE_MATCHES),
        tap(() => console.log('in soccer effect')),
        switchMap((action: any) =>
            this.sportsService.getKabaddiMatchList('3', '10', '1').pipe(
                map((response: any) => new Soccer.LoadSoccerLiveSuccess(response.data.items)),
                catchError(() => {
                    this.store.dispatch(new Soccer.LoadSoccerLive());
                    return EMPTY;
                })
            )),
        take(1)
    );

}







