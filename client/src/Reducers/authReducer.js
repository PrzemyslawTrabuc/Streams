import {SIGN_IN, SIGN_OUT} from "../Actions/types";

const INITIAL_STATE = {
  //userData: {'id':null, 'name':null},
  userName: null,
  userId: null,
  isSignedIn:null
};

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case SIGN_IN:
            return{...state,isSignedIn: true, userId: action.payload.id, userName: action.payload.name};

        case SIGN_OUT:
            return{...state, isSignedIn: false, userName: null, userId: null}

        default:
            return state;
    }
};