export const GET_CATEGORIES = 'GET_CATEGORIES';
export const FETCHING_POSTS = 'FETCHING_POST';
export const FETCHING_POST = 'FETCHING_POST';
export const FETCHED_POST = 'FETCH_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ON_SORTBY_CHANGE = 'ON_SORTBY_CHANGE';
export const SET_BREADCRUMBS = 'SET_BREADCRUMBS';

export function fetchPost(id){
    return (dispatch) => {
        dispatch({
            type: FETCHING_POST
        });
            fetch(`http://localhost:3001/posts/${id}`, {
            headers: {
                'Authorization': 'whatever-you-want'
            }
        }).then((resp) => {
            console.log('resp', resp);
            return resp.json();
        }).then((data) => {
            console.log('data', data);
            dispatch({
                type: FETCHED_POST,
                post: data
            });
        });
    }
    
}

export function sortByChange(sortby){
    return {
        type: ON_SORTBY_CHANGE,
        sortby
    }
}

export function vote(id, vote, type, optionalCallback){
    return (dispatch) => {
        let url = type === 'comment' ? `http://localhost:3001/comments/${id}` : `http://localhost:3001/posts/${id}`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'whatever-you-want',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "option": vote
            })
        }).then((resp) => resp.json()).then((data) => {
            if(type !== 'comment'){
                dispatch({
                    type: FETCHED_POST,
                    post: data
                });
                dispatch(fetchPosts());
            }

            if(optionalCallback){
                optionalCallback();
            }
            
            
        }, (error) => console.log('Error', error));
    }
}

export function fetchPosts(category){
    return (dispatch) => {
        dispatch({
            type: FETCHING_POSTS
        });
        let url = category ? `http://localhost:3001/${category}/posts` : 'http://localhost:3001/posts';
        return fetch(url, {
            headers: {
                'Authorization': 'whatever-you-want'
            }
        }).then((resp) => resp.json()).then((data) => {
            return dispatch(receivePosts(data));
        }, (error) => console.log('Error', error));
    }
}

export function fetchCategories() {
    return (dispatch) => {
        return fetch('http://localhost:3001/categories', { 
            headers: { 
                'Authorization': 'whatever-you-want'
            }
        }).then((resp) => resp.json()).then(
            (data) => {
                return dispatch(getCategories(data.categories));
            },
            (error) => {
                console.log('Error', error);
            });
    };
}

function getCategories(categories) {
    return {
        type: GET_CATEGORIES,
        categories
    }
}

function receivePosts(posts){
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export function setBreadcrumbs(breadcrumbs){
    return {
        type: SET_BREADCRUMBS,
        breadcrumbs
    }
}