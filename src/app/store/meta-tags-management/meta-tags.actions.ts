import { Action } from '@ngrx/store';
import { metaTagsReducer } from './meta-tags.reducer';
export const SAVE_META_TAGS = '[Meta tags] Save Meta tags objects';

// export class GetToken implements Action {
//     readonly type =  GET_TOKEN
// }

export class SaveMetaTags implements Action {
    readonly type = SAVE_META_TAGS;
    constructor(public payload: any) { }
}

export type MetaTagsActions = SaveMetaTags;
