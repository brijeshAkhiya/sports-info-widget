import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromRoot from "../../app-reducer";
import * as Cricket from "@store/cricket/cricket.actions";
import { Action, Store } from '@ngrx/store';
import { SportsService } from '@app/shared/providers/sports-service';
import { Observable, EMPTY } from 'rxjs';



@Injectable()
export class CricketsEffects {
    constructor(private actions$: Actions, private sportsService: SportsService, private store: Store<fromRoot.State>) { }

    @Effect()
    loadCricketFixturesSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Cricket.LOAD_CRICKET_FIXTURES),
        tap(() => this.store.dispatch(new Cricket.CricketStartLoading())
        ),
        switchMap((action: any) => this.sportsService.getmatchfixtures().pipe(
            map((response: any) => new Cricket.LoadCricketFixturesSuccess(response.data)),
            tap(() => this.store.dispatch(new Cricket.CricketStopLoading())),
            catchError(() => {
                this.store.dispatch(new Cricket.LoadCricketFixtures());
                return EMPTY;
            })
        )),
        take(1)
    );

    //cricket upper- slider effects

    @Effect()
    loadCricketSliderSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Cricket.LOAD_CRICKET_SLIDER),
        switchMap((action: any) => this.sportsService.getheaderslider().pipe(
            map((response: any) => new Cricket.LoadCricketSliderSuccess(response.data)),
            catchError(() => {
                this.store.dispatch(new Cricket.LoadCricketSlider());
                return EMPTY;
            })
        )),
        take(1)
    );

    //cricket sidebar widget results effects

    @Effect()
    loadCricketResultsSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Cricket.LOAD_CRICKET_RESULTS),
        switchMap((action: any) => this.sportsService.getmatchresults().pipe(
            map((res: any) => {
                res.data = res.data.map((data, matchIndex) => {
                    let home_scoreIndex = data.competitors.findIndex((comp) => comp.qualifier == 'home');
                    let away_scoreIndex = data.competitors.findIndex((comp) => comp.qualifier == 'away');
                    if (data.period_scores) {
                        data.period_scores.map((pscore, index) => {
                            if (pscore.home_score) {
                                (data.competitors[home_scoreIndex].p_new = data.competitors[home_scoreIndex].p_new || []).push(pscore)
                            } else {
                                (data.competitors[away_scoreIndex].p_new = data.competitors[away_scoreIndex].p_new || []).push(pscore)
                            }
                        })
                    }
                    return data;
                });
                return new Cricket.LoadCricketResultsSuccess(res.data)
            }),
            catchError(() => {
                this.store.dispatch(new Cricket.LoadCricketResults());
                return EMPTY;
            })
        )),
        take(1)
    );
}







