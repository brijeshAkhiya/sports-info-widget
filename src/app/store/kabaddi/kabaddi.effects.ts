import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromRoot from "../../app-reducer";
import * as Kabaddi from "@store/kabaddi/kabaddi.actions";

import { Action, Store } from '@ngrx/store';
import { SportsService } from '@app/shared/providers/sports-service';
import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class KabaddiEffects {

    constructor(private actions$: Actions, private sportsService: SportsService, private store: Store<fromRoot.State>) { }

    @Effect()
    loadKabaddiFixturesSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Kabaddi.LOAD_KABADDI_FIXTURES),
        tap(() => this.store.dispatch(new Kabaddi.KabaddiStartLoading())
        ),
        switchMap((action: any) =>
            this.sportsService.getKabaddiMatchList('1', '10', '1').pipe(
                map((response: any) => new Kabaddi.LoadKabaddiFixturesSuccess(response.data)),
                tap(() => this.store.dispatch(new Kabaddi.KabaddiStopLoading())),
                catchError(() => {
                    this.store.dispatch(new Kabaddi.LoadKabaddiFixtures());
                    return EMPTY;
                })
            )),
        take(1)
    );

    @Effect()
    loadKabaddiResultsSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Kabaddi.LOAD_KABADDI_RESULTS),
        tap(() => console.log('in kabaddi effect')),
        switchMap((action: any) =>
            this.sportsService.getKabaddiMatchList('2', '10', '1').pipe(
                map((response: any) => new Kabaddi.LoadKabaddiResultsSuccess(response.data)),
                catchError(() => {
                    this.store.dispatch(new Kabaddi.LoadKabaddiResults());
                    return EMPTY;
                })
            )),
        take(1)
    );

    @Effect()
    loadKabaddiLiveSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Kabaddi.LOAD_KABADDI_LIVE_MATCHES),
        tap(() => console.log('in kabaddi effect')),
        switchMap((action: any) =>
            this.sportsService.getKabaddiMatchList('3', '10', '1').pipe(
                map((response: any) => new Kabaddi.LoadKabaddiLiveSuccess(response.data)),
                catchError(() => {
                    this.store.dispatch(new Kabaddi.LoadKabaddiLive());
                    return EMPTY;
                })
            )),
        take(1)
    );


    //

}







