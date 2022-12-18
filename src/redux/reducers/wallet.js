// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_SUCCESS,
  EXPENSE_SUCCESS,
  DELETE_ITEM,
  EDIT_INFO, SAVE_INFO } from '../actions';

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
  case EDIT_INFO:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case SAVE_INFO:
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense.id === Number(state.idToEdit)
          ? ({ id: expense.id, ...action.payload, exchangeRates: expense.exchangeRates })
          : expense)),
      editor: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
