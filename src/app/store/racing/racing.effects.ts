import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromRoot from '../../app-reducer';
import * as Racing from '@store/racing/racing.actions';

import { Action, Store } from '@ngrx/store';
import { SportsService } from '@app/shared/providers/sports-service';
import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class RacingEffects {

    constructor(private actions$: Actions, private sportsService: SportsService, private store: Store<fromRoot.State>) { }

    @Effect()
    LoadRacingCompSeason$: Observable<Action> = this.actions$.pipe(
        ofType(Racing.LOAD_RACING_COMP_SEASONS),
        switchMap((action: any) =>
            this.sportsService.getRacingF1Seasons(action.payload).pipe(
                map((response: any) => new Racing.LoadRacingCompSeasonSuccess({ 'comp': action.payload, 'season': response.stage.teams })),
                catchError(() => {
                    return EMPTY;
                })
            )),
    );

    /** Racing schedule effect */
    // @Effect()
    // LoadRacingScheduleSuccess$: Observable<Action> = this.actions$.pipe(
    //     ofType(Racing.LOAD_RACING_SCHEDULE),
    //     // tap(() => this.store.dispatch(new Racing.RacingStartLoading())),
    //     switchMap((action: any) =>
    //         this.sportsService.getRacingSchedule().pipe(
    //             map((response: any) => new Racing.LoadRacingScheduleSuccess(response.data)),
    //             // tap(() => this.store.dispatch(new Racing.RacingStopLoading())),
    //             catchError(() => {
    //                 // this.store.dispatch(new Racing.RacingStopLoading());
    //                 return EMPTY;
    //             })
    //         )),
    //     take(1)
    // );
}







