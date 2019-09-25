import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromRoot from '../../app-reducer';
import * as Basketball from '@store/basketball/basketball.actions';

import { Action, Store } from '@ngrx/store';
import { SportsService } from '@app/shared/providers/sports-service';
import { CommonService } from '@app/shared/providers/common-service';

import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class BasketballEffects {
    constructor(private actions$: Actions, private sportsService: SportsService, private commonService: CommonService, private store: Store<fromRoot.State>) { }

    /** Basketball schedule effect */
    @Effect()
    loadBasketballScheduleSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(Basketball.LOAD_BASKETBALL_SCHEDULE),
        tap(() => this.store.dispatch(new Basketball.BasketballStartLoading())
        ),
        tap(() => { console.log('in effect basketball'); }),
        switchMap((action: any) =>
            this.sportsService.getBasketballSchedule().pipe(
                map((response: any) => new Basketball.LoadBasketballScheduleSuccess(response.data)),
                tap(() => this.store.dispatch(new Basketball.BasketballStopLoading())),
                catchError(() => {
                    this.store.dispatch(new Basketball.LoadBasketballSchedule());
                    return EMPTY;
                })
            )),
        take(1)
    );

}







