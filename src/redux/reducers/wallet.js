// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_SUCCESS, EXPENSE_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_SUCCESS:
    return ({
      ...state,
      currencies: action.payload,
    });
  case EXPENSE_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default walletReducer;
