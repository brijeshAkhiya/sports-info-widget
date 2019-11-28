import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromRoot from '../../app-reducer';
import * as Tennis from '@store/tennis/tennis.actions';

import { Action, Store } from '@ngrx/store';
import { SportsService } from '@app/shared/providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';

import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class TennisEffects {
    date = new Date();
    constructor(private actions$: Actions, private sportsService: SportsService, private commonService: CommonService, private store: Store<fromRoot.State>) { }

    /** Tennis schedule effect */
    @Effect()
    loadTennisScheduleSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Tennis.LOAD_TENNIS_SCHEDULE),
        tap(() => this.store.dispatch(new Tennis.TennisStartLoading())),
        switchMap((action: any) =>
            this.sportsService.getTennisDailySchedule(this.commonService.convertDate(this.date)).pipe(
                map((response: any) => new Tennis.LoadTennisScheduleSuccess(response.data.sport_events.filter((match) => match.status == 'match_about_to_start' || match.status == 'live'))),
                tap(() => this.store.dispatch(new Tennis.TennisStopLoading())),
                catchError(() => {
                    this.store.dispatch(new Tennis.TennisStopLoading());
                    return EMPTY;
                })
            )),
        take(1)
    );

}
