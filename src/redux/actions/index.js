// Coloque aqui suas actions
export const USER = 'USER';
export const WALLET_REQUEST = 'WALLET_REQUEST';
export const WALLET_SUCCESS = 'WALLET_SUCCESS';
export const EXPENSE_REQUEST = 'EXPENSE_REQUEST';
export const EXPENSE_SUCCESS = 'EXPENSE_SUCCESS';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_INFO = 'EDIT_INFO';
export const SAVE_INFO = 'SAVE_INFO';
// action creator do user email
export const userAction = (email) => ({
  type: USER,
  payload: { email },
});
// action creator e funcao das moedas
export const currencyRequest = () => ({
  type: WALLET_REQUEST,
});

export const currencySuccess = (data) => ({
  type: WALLET_SUCCESS,
  payload: data,
});

export function fetchCurrency() {
  return async (dispatch) => {
    dispatch(currencyRequest);
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    // const result = currency.filter((index) => index !== 'USDT'); funicona igual
    const result = Object.keys(data);
    return dispatch(currencySuccess(result));
  };
}
// action creator e fucao do valor total de gastos
export const expenseRequest = () => ({
  type: EXPENSE_REQUEST,
});

export const expenseSuccess = (data) => ({
  type: EXPENSE_SUCCESS,
  payload: data,
});

export const fetchCotation = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  return data;
};

export const deleteItemAction = (id) => ({
  type: DELETE_ITEM,
  id,
});

export const editInfo = (id) => ({
  type: EDIT_INFO,
  id,
});

export const saveEditInfo = (info) => ({
  type: SAVE_INFO,
  payload: info,
});
