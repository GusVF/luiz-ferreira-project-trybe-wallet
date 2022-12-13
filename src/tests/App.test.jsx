import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderFunc';

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

  test('the information and render of "wallet" page', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const valueInput = screen.getByTestId('value-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    const emailTextEl = screen.getByText(/email:/i);
    const emailBREl = screen.getByText(/brl/i);
    const tableEl = screen.getByText(/table/i);

    expect(valueInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(emailTextEl).toBeInTheDocument();
    expect(emailBREl).toBeInTheDocument();
    expect(tableEl).toBeInTheDocument();
  });
});
