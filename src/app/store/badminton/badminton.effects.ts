import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import * as fromRoot from '../../app-reducer';
import * as Badminton from '@store/badminton/badminton.actions';

import { Action, Store } from '@ngrx/store';
import { SportsService } from '@app/shared/providers/sports-service';
import { Observable, EMPTY } from 'rxjs';

@Injectable()
export class BadmintonEffects {

    constructor(private actions$: Actions, private sportsService: SportsService, private store: Store<fromRoot.State>) { }

    @Effect()
    LoadBadmintonCompSeason$: Observable<Action> = this.actions$.pipe(
        ofType(Badminton.LOAD_BADMINTON_COMP_SEASONS),
        switchMap((action: any) =>
            this.sportsService.getBadmintonCompetitionSeason(action.payload).pipe(
                map((response: any) => new Badminton.LoadBadmintonCompSeasonSuccess({ 'comp': action.payload, 'season': response.data.seasons })),
                catchError(() => {
                    return EMPTY;
                })
            )),
    );
}







