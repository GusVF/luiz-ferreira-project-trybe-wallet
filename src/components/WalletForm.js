import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, expenseSuccess } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valueInput: '',
    description: '',
    method: 'Dinheiro',
    currencies: 'USD',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency(this.state));
  }

  handleClick = async () => {
    const { dispatch, expenses, currency } = this.props;
    const { valueInput, description, method, currencies, tag } = this.state;
    const payload = {
      id: expenses.length,
      valueInput,
      description,
      method,
      currencies,
      tag,
      exchangeRates: currency,
    };
    dispatch(expenseSuccess(payload));
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    console.log(data);
    this.setState({
      valueInput: '',
      description: '',
      method: 'Dinheiro',
      currencies: 'USD',
      tag: 'Alimentação',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { description, tag, valueInput, method } = this.state;
    const { currency } = this.props;
    return (
      <form>
        <label htmlFor="valueInput">
          Valor:
          <input
            data-testid="value-input"
            type="input"
            name="valueInput"
            value={ valueInput }
            onChange={ this.handleChange }
            placeholder="$ 0.00"
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            type="select"
            name="currency"
            data-testid="currency-input"
          >
            {currency.map((curr, index) => (
              <option
                key={ `${curr}-${index}` }
              >
                {curr}
              </option>))}
          </select>
        </label>
        <label htmlFor="method">
          Modo de pagamento
          <select
            type="select"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            type="select"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="descriptionInput">
          Descrição
          <input
            data-testid="description-input"
            type="input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          name="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currency: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
