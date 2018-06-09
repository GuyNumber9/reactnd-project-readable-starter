import { GET_CATEGORIES, RECEIVE_POSTS, ON_SORTBY_CHANGE, SET_BREADCRUMBS, FETCHED_POST } from '../actions';

const initialState = {
    categories: [],
    posts: [],
    sortby: 'posted',
    currentPost: {
        id: "",
        title: "",
        body: "",
        category: "",
        voteScore: 0
    }
};

export function mainReducer(state = initialState, action){
    switch(action.type){
        case GET_CATEGORIES:
            return {...state, categories: action.categories};
        case RECEIVE_POSTS:
            return {...state, posts: action.posts}
        case ON_SORTBY_CHANGE:
            return {...state, sortby: action.sortby}
        case SET_BREADCRUMBS:
            return {...state, breadcrumbs: action.breadcrumbs}
        case FETCHED_POST:
            return {
                ...state,
                currentPost: action.post
            }
        default:
            return state;
    }
}