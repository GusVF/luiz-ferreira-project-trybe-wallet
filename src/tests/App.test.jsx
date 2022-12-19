import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { combineReducers } from 'redux';
import App from '../App';
import renderWithRouterAndRedux from './renderFunc';
import Table from '../components/Table';
import mockData from './helpers/mockData';

const SIX = 6;

describe('Tests the login page', () => {
  test('if login element page renders on screen', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/type your password/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'trybe@trybe.com');
    expect(emailInput.value).toBe('trybe@trybe.com');
    userEvent.type(passwordInput, '123456');
    expect(passwordInput.value).toHaveLength(SIX);
    expect(loginBtn).not.toBeDisabled();
    userEvent.click(loginBtn);
  });

  describe('if wallet page elements render', () => {
    test('the information and render of "wallet" page', () => {
      const initialEntries = ['/carteira'];

      renderWithRouterAndRedux(<App />, { initialEntries });

      const valueInput = screen.getByTestId('value-input');
      const methodInput = screen.getByTestId('method-input');
      const tagInput = screen.getByTestId('tag-input');
      const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
      const emailTextEl = screen.getByText(/email:/i);
      const emailBREl = screen.getByText(/brl/i);

      expect(valueInput).toBeInTheDocument();
      expect(methodInput).toBeInTheDocument();
      expect(tagInput).toBeInTheDocument();
      expect(addButton).toBeInTheDocument();
      expect(emailTextEl).toBeInTheDocument();
      expect(emailBREl).toBeInTheDocument();
    });
  });
});

describe('if table elements exist on screen', () => {
  test('if table head elements exist', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<Table />, { initialEntries });

    const descriptionEl = screen.getByRole('columnheader', { name: 'Descrição' });
    const tagEle = screen.getByRole('columnheader', { name: 'Tag' });
    const methodEle = screen.getByRole('columnheader', { name: 'Método de pagamento' });
    const valueElement = screen.getByRole('columnheader', { name: 'Valor' });
    const currencyEl = screen.getByRole('columnheader', { name: 'Moeda' });
    const exchangeEl = screen.getByRole('columnheader', { name: 'Câmbio utilizado' });
    const conversionValueEl = screen
      .getByRole('columnheader', { name: 'Valor convertido' });
    const exchangeCoinEl = screen
      .getByRole('columnheader', { name: 'Moeda de conversão' });

    expect(descriptionEl).toBeInTheDocument();
    expect(tagEle).toBeInTheDocument();
    expect(methodEle).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
    expect(currencyEl).toBeInTheDocument();
    expect(exchangeEl).toBeInTheDocument();
    expect(conversionValueEl).toBeInTheDocument();
    expect(exchangeCoinEl).toBeInTheDocument();
  });
});

const firstMock = {
  id: 0,
  value: '10',
  currency: 'USD',
  method: 'Cartão de crédito',
  tag: 'Lazer',
  description: 'passeio',
  exchangeRates: mockData,
};

describe('Editing items on the expense list', () => {
  test('if edit feature works as expected', () => {
    const initialEntries = ['/carteira'];
    const initialState = {
      wallet: {
        currencies: Object.keys(mockData),
        expenses: [firstMock],
        editor: false,
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const addEditBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
    const editBtn = screen.getByRole('button', { name: /Editar/i });

    const valueInput = screen.getByTestId('value-input');
    const payMethod = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId('description-input');
    const cellValue = screen.getByRole('cell', { name: /47.53/i });
    const cellExchange = screen.getByRole('cell', { name: /4.75/i });
    const cellCurrName = screen.getByRole('cell', { name: 'Real Brasileiro' });

    expect(cellValue).toBeInTheDocument();
    expect(cellExchange).toBeInTheDocument();
    expect(cellCurrName).toBeInTheDocument();

    expect(editBtn).toBeInTheDocument();
    expect(addEditBtn).toBeInTheDocument();

    userEvent.type(valueInput, '10');
    expect(valueInput.value).toEqual('10');
    userEvent.click(addEditBtn);
    userEvent.clear(valueInput);
    expect(valueInput.value).toBe('');

    userEvent.click(payMethod, 'Dinheiro');
    expect(payMethod.value).toBe('Dinheiro');

    userEvent.click(tagInput, 'Alimentação');
    expect(tagInput.value).toBe('Alimentação');

    userEvent.type(descriptionInput, 'Lanche');
    expect(descriptionInput.value).toBe('Lanche');
    userEvent.click(addEditBtn);
    userEvent.clear(descriptionInput);
    expect(descriptionInput.value).toBe('');

    userEvent.click(editBtn);
    expect(addEditBtn.textContent).toBe('Editar despesa');

    userEvent.clear(valueInput);
    expect(valueInput.value).toBe('');

    userEvent.clear(descriptionInput);
    expect(descriptionInput.value).toBe('');
  });
});

describe('Deleting items in the expense list', () => {
  test('if items are deleted on with button', () => {
    const initialEntries = ['/carteira'];
    const initialState = {
      wallet: {
        currencies: Object.keys(mockData),
        expenses: [firstMock],
        editor: false,
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const deleteBtn = screen.getByRole('button', { name: /Excluir/i });
    const totalField = screen.getByTestId('total-field');

    expect(deleteBtn).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();

    expect(totalField.textContent).toBe('47.53');
    userEvent.click(deleteBtn);
    expect(totalField.textContent).toBe('0.00');
  });
});

describe('Test items with API info', () => {
  test('if edit feature works as expected', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    const initialEntries = ['/carteira'];
    const initialState = {
      wallet: {
        currencies: Object.keys(mockData),
        expenses: [firstMock],
        editor: false,
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const currencyInput = await screen.findByTestId('currency-input');
    const optionCurrency = await screen.findByRole('option', { name: 'CAD' });

    expect(currencyInput).toBeInTheDocument();
    userEvent.selectOptions(currencyInput, optionCurrency);
    expect(currencyInput.value).toBe('CAD');

    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
