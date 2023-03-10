// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER } from '../actions/index';

const INITIAL_STATE = {

  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER:
    return {
      ...state,
      ...action.payload.email,
    };
  default:
    return state;
  }
};

export default userReducer;
