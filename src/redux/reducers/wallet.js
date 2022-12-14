// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_SUCCESS, EXPENSE_SUCCESS, DELETE_ITEM } from '../actions';

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
  case DELETE_ITEM:
    return {
      ...state,
      expenses: action.id,
    };
  default:
    return state;
  }
};

export default walletReducer;
