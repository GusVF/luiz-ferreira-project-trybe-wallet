import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleClick = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    dispatch(userAction(this.state));
    history.push('/carteira');
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.enableButton());
  };

  enableButton = () => {
    const { email, password } = this.state;
    const six = 6;
    const emailRegex = /^[a-z0-9._-]+@[a-z0-9]+?\.[a-z]+\.?[a-z]+?$/i;
    const invalidEmail = !emailRegex.test(email);
    const invalidPass = password.length < six;
    const disabled = invalidEmail || invalidPass;
    this.setState({
      isDisabled: disabled,
    });
  };

  render() {
    const { isDisabled, email, password } = this.state;
    return (
      <form onSubmit={ this.handleClick } className="emailDiv px-6 field">
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              type="email"
              data-testid="email-input"
              name="email"
              value={ email }
              placeholder="type your e-mail"
              onChange={ this.handleChange }
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope" />
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              type="password"
              data-testid="password-input"
              name="password"
              value={ password }
              placeholder="type your password"
              onChange={ this.handleChange }
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock" />
            </span>
          </p>
        </div>
        <button
          className="button px-6"
          type="submit"
          name="button"
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
