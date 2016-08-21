import React from 'react';
import merge from 'lodash/merge';
import { hashHistory } from 'react-router';

const emptyState = {
  username: '',
  password: '',
  hasInput: false,
  affiliation: 'individual'
};

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.renderAffiliationField = this.renderAffiliationField.bind(this);
    this.state = merge({}, emptyState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.formType !== this.props.formType) {
      this.props.removeErrors();
      this.setState(Object.assign({}, emptyState));
    }
  }

  componentDidUpdate() {
    if (this.props.loggedIn) {
      hashHistory.push('/');
    }
  }

  allValid() {
    return this.isValid(this.state.password) &&
      this.isValid(this.state.username);
  }

  isValid(value) {
    return value.length >= 6;
  }

  update(field) {
    return (e) => this.setState({
      hasInput: true,
      [field]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.formType === 'signup' && !this.allValid()) {
      this.setState({
        hasInput: true
      });
      return;
    }

    this.props.processForm({user: this.state});
  }

  validityCircle(field) {
    if (this.props.formType === 'login' || !this.state.hasInput) {
      return " ";
    }

    if (this.isValid(this.state[field])) {
      return <i className="fa fa-check-circle-o" aria-hidden="true"></i>;
    } else {
      return <i className="fa fa-times-circle-o" aria-hidden="true"></i>;
    }
  }

  renderErrors() {
    return(
      <ul className="errors">
        {
          this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>{error}</li>
          ))
        }
      </ul>
    );
  }

  demo(e) {
    e.preventDefault();
    let i = 0;
    let j = 0;
    let username = "MaryGardener";
    let password = "password";

    this.setState(emptyState);

    let interval = setInterval(() => {
      if (i < username.length) {
        this.setState({username: this.state.username + username[i]});
        i++;
      } else if (j < password.length) {
        this.setState({password: this.state.password + password[j]});
        j++;
      } else {
        this.props.processForm({user: this.state});
        clearInterval(interval);
      }
    }, 30);
  }

  renderAffiliationField() {
    if (this.props.formType !== 'signup') return;

    return(
      <div className="session-affiliation">
        <label>
          <input type="radio"
            onChange={this.update('affiliation')}
            value="individual"
            checked={this.state.affiliation === 'individual'} />
          Individual
        </label>
        <label>
          <input type="radio"
            onChange={this.update('affiliation')}
            value="organization"
            checked={this.state.affiliation === 'organization'} />
          Organization
        </label>
      </div>
    );
  }

  renderDemoButton() {
    if (this.props.formType === 'signup') return;

    return(
      <button onClick={(e) => this.demo(e)}>Demo Account</button>
    );
  }

  render() {
    return(
      <div className="session-form">
        <div className="session-form-harvst-logo"></div>
        { this.renderErrors() }
        <form onSubmit={e => this.handleSubmit(e)} autoComplete="false" >
          <p>
            <input onChange={this.update('username')} placeholder="username"
              value={this.state.username} type="text" />
            { this.validityCircle('username') }
          </p>
          <p>
            <input onChange={this.update('password')} placeholder="password"
            value={this.state.password} type="password" />
            { this.validityCircle('password') }
          </p>
          { this.renderAffiliationField() }
          <p>
            <input type="submit"
              value={this.props.formType === 'signup' ? "Sign Up" : "Log In"} />
            { this.renderDemoButton() }
          </p>
        </form>
      </div>
    );
  }
}

export default SessionForm;
