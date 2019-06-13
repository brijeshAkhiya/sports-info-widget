import { Action } from "@ngrx/store";
import { MetaTagsActions, SAVE_META_TAGS } from "./meta-tags.actions";


export interface MetaTags {
    MetaTags: []
}

const initialState = {
    MetaTags: []
};

export function metaTagsReducer(state = initialState, action: MetaTagsActions) {
    switch (action.type) {
        case SAVE_META_TAGS:
            return { ...state, MetaTags: action.payload };
        default: {
            return state
        }
    }
}

export const getMetaTags = (state: MetaTags) => state.MetaTags;