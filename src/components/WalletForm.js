import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valueInput: '',
    descriptionInput: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency(this.state));
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    const { valueInput, descriptionInput } = this.state;
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
        <label htmlFor="currencyInput">
          Moeda
          <select type="select" name="currencyInput" data-testid="currency-input">
            {currencies.map((currency) => (
              <option
                key={ currency }
              >
                {currency}
              </option>))}
          </select>
        </label>
        <label htmlFor="methodInput">
          Modo de pagamento
          <select type="select" name="methodInput" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tagInput">
          Categoria
          <select type="select" name="tagInput" data-testid="tag-input">
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
            name="descriptionInput"
            onChange={ this.handleChange }
            value={ descriptionInput }
          />
        </label>
        <button
          type="button"
          name="button"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
