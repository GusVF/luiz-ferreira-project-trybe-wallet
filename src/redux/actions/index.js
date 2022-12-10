// import getCurrencyAPI from '../../services/Currency.API';
// Coloque aqui suas actions
export const USER = 'USER';
export const WALLET_REQUEST = 'WALLET_REQUEST';
export const WALLET_SUCCESS = 'WALLET_SUCCESS';

export const userAction = (value) => ({
  type: USER,
  payload: { value },
});

export const requestCurrency = () => ({
  type: 'WALLET_REQUEST',
});

export const currencySuccess = (currencies) => ({
  type: 'WALLET_SUCCESS',
  currencies,
});

export function fetchCurrency() {
  return async (dispatch) => {
    dispatch(requestCurrency());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currency = Object.keys(data);
    const result = currency.filter((index) => index !== 'USDT');
    return dispatch(currencySuccess(result));
  };
}
