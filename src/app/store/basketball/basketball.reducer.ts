import {
    BasketballActions, BASKETBALL_SCHEDULE_MATCHES,
} from './basketball.actions';

export interface BasketballData {
    schedule: [];
}

const initialState = {
    schedule: []
};

export function BasketballReducer(state = initialState, action: BasketballActions): any {
    switch (action.type) {
        case BASKETBALL_SCHEDULE_MATCHES:
            return { ...state, schedule: action.payload };
        default: {
            return state;
        }
    }
}
