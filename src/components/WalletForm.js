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
    const { dispatch, expenses } = this.props;
    const { valueInput, description, method, currencies, tag } = this.state;
    const getAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await getAPI.json();
    const payload = {
      id: expenses.length,
      valueInput,
      description,
      method,
      currencies,
      tag,
      exchangeRates: data,
    };
    dispatch(expenseSuccess(payload));
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
    const { currencies } = this.props;
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
            {currencies.map((currency, index) => (
              <option
                key={ `${currency}-${index}` }
              >
                {currency}
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
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
