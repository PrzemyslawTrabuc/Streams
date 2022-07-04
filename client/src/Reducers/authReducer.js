import {SIGN_IN, SIGN_OUT} from "../Actions/types";

const INITIAL_STATE = {
  currentUserId: null,
  isSignedIn:null
};

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case SIGN_IN:
            return{...state,isSignedIn: true, currentUserId: action.payload}

        case SIGN_OUT:
            return{...state, isSignedIn: false, currentUserId: null}

        default:
            return state;
    }
};