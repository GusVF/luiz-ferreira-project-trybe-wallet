// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  totalExpense: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER:
    return {
      ...state,
      ...action.payload.value,
    };
  default:
    return state;
  }
};

export default userReducer;
