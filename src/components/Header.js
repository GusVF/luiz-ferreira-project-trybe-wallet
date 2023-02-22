import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, curr) => +acc + (+curr.value
        * +curr.exchangeRates[curr.currency].ask), 0);
    return (
      <div>
        <header
          className="
          ml-3
          has-text-white-bis
          is-size-5
          has-text-weight-bold
          pt-5"
        >
          <div data-testid="email-field">{`Email: ${email}`}</div>
          <span data-testid="total-field">
            {`Total: ${total.toFixed(2)}`}
          </span>
          <span data-testid="header-currency-field" className="ml-4">BRL</span>
        </header>
      </div>
    );
  }
}

Header.defaultProps = {
  expenses: [],
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
