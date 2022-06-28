import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from '../Actions/types';
import _ from 'lodash';


export default (state = {}, action) =>{
    // [action.payload.id] IS KEY INTERPOLATION ////
    switch(action.type){
        case FETCH_STREAMS:
            //console.log(action.payload);
            let newObject = {};
            action.payload.forEach(stream => newObject[stream.id] = stream);
            return newObject;
            //return {...state, ..._.mapKeys(action.payload, 'id')}; //lodash library approach
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            // return _.omit(state, action.payload); lodash library approach
            return {state, [action.payload.id]: action.payload}
        default:
            return state;
    }
}