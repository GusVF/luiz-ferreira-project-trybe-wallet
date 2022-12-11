import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, totalExpense } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">{`Email: ${email}`}</div>
          <div data-testid="total-field">{`Despesa Total:R$${totalExpense}`}</div>
          <span data-testid="header-currency-field">BRL</span>
        </header>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpense: state.user.totalExpense,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpense: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
