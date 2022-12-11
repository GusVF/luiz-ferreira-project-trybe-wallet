// Coloque aqui suas actions
export const USER = 'USER';
export const WALLET_REQUEST = 'WALLET_REQUEST';
export const WALLET_SUCCESS = 'WALLET_SUCCESS';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const userAction = (value) => ({
  type: USER,
  payload: { value },
});

export const currencySuccess = (currencies) => ({
  type: 'WALLET_SUCCESS',
  currencies,
});

export function fetchCurrency() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    console.log(data);
    const currency = Object.keys(data);
    const result = currency.filter((index) => index !== 'USDT');
    return dispatch(currencySuccess(result));
  };
}

export const saveExpense = (totalExpense, coin) => ({
  type: SAVE_EXPENSE,
  payload: [totalExpense, coin],
});

export function saveCurrency() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const datas = await response.json();
    console.log(datas);
  };
}
