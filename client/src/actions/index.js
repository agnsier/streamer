import streams from '../apis/streams'
import history from '../history'
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS
} from "./action_types";


export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = formValues => async (dispatch, getState) => {
    const {userId} = getState().auth;
    const response = await streams.post('/streams', {...formValues, userId});
    dispatch({type: CREATE_STREAM, payload: response.data});
    history.push('/')
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({type: FETCH_STREAMS, payload: response.data})
};

export const fetchStream = (stream_id) => async dispatch => {
    const response = await streams.get(`/streams/${stream_id}`);
    dispatch({type: FETCH_STREAM, payload: response.data})
};

export const editStream = (stream_id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${stream_id}`, formValues);
    dispatch({type: EDIT_STREAM, payload: response.data});
    history.push('/')
};

export const deleteStream = (stream_id) => async dispatch => {
    const response = await streams.delete(`/streams/${stream_id}`);
    dispatch({type: DELETE_STREAM, payload: stream_id});
    history.push('/')
};