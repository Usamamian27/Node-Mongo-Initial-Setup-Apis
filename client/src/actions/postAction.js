import axios from 'axios';

import {
    ADD_POST,
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_POSTS,
    GET_POST,
    POST_LOADING,
    DELETE_POST
} from './types';

// Add Post
export const addpost = (postData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/posts', postData)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Get Posts (ALL)
export const getposts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/posts')
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        );
};


// Get Single Post
export const getpost = (id) => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POST,
                payload: null
            })
        );
};


// Delete post
export const deletePost = (id) => dispatch => {

    axios
        .delete(`/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


//Add likes
export const addLike = (id) => dispatch => {

    axios
        .post(`/api/posts/like/${id}`)
        .then(res =>
            dispatch(getposts())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Remove likes
export const removeLike = (id) => dispatch => {

    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res =>
            dispatch(getposts())
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Add Comments
export const addComment = (postId,commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// Delete Comments
export const deleteComment = (postId,commentId) => dispatch => {

    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};




// Set Loading state
export const setPostLoading = () =>{

    return {
        type: POST_LOADING

    }
};

// Clear Errors
export const clearErrors  = () =>{

    return {
        type: CLEAR_ERRORS

    }
};