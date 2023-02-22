import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteItemAction, editInfo } from '../redux/actions';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch, expenses } = this.props;
    const deleteItem = expenses.filter((expense) => expense.id !== id);
    dispatch(deleteItemAction(deleteItem));
  };

  handleEdition = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(editInfo(target.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table
        className="
      table is-fullwidth
      table is-hoverable
      is-italic
      has-text-weight-medium"
      >
        <thead>
          <tr>
            <th> Descrição </th>
            <th> Tag </th>
            <th> Método de pagamento </th>
            <th> Valor </th>
            <th> Moeda </th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(
            (
              { description, tag, method, value, exchangeRates, currency, id },
            ) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{parseFloat(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
                <td>Real Brasileiro</td>
                <td className="is-flex">
                  <button
                    className="button is-danger is-small"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClick(id) }
                  >
                    Excluir
                  </button>
                  <button
                    className="button is-info is-small"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ (event) => this.handleEdition(event) }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
