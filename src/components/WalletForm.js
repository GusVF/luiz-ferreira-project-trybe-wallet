import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, expenseSuccess, saveEditInfo } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    method: 'Dinheiro',
    currency: 'USD',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency(this.state));
  }

  handleClick = async () => {
    const { dispatch, expenses } = this.props;
    const { value, description, method, currency, tag } = this.state;
    const getAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await getAPI.json();
    delete data.USDT;
    const payload = {
      id: expenses.length,
      value,
      description,
      method,
      currency,
      tag,
      exchangeRates: data,
    };
    dispatch(expenseSuccess(payload));
    this.setState({
      value: '',
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentação',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleEditon = () => {
    const { dispatch } = this.props;
    dispatch(saveEditInfo(this.state));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { description, tag, value, method } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="input"
            name="value"
            value={ value }
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
            onChange={ this.handleChange }
          >
            {currencies.map((currency) => (
              <option
                key={ currency }
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
        <label htmlFor="description">
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
          onClick={ editor ? this.handleEditon : this.handleClick }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);
