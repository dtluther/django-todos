import _ from 'lodash';
import {
    GET_TODOS,
    CREATE_TODO,
    GET_TODO,
    DELETE_TODO,
    EDIT_TODO
} from '../actions/types';

export default (state = {}, action) => {
    // Object.freeze(state); # app academy way
    // let nextState = {};

    switch(action.type) {
        case GET_TODOS:
            return {
                ...state,
                ..._.mapKeys(action.payload, 'id')
            };
        case CREATE_TODO:
        case GET_TODO:
        case EDIT_TODO:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_TODO:
            return _.omit(state, action.payload)
        default:
            return state;
        
    };
};