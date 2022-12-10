import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency(this.state));
  }

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="input"
            name="value"
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
          />
        </label>
      </div>
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
