// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_SUCCESS:
    return ({
      ...state,
      currencies: action.currencies,
    });
  default:
    return state;
  }
};

export default walletReducer;
