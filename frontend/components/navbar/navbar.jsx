import React from 'react';
import ReactModal from 'react-modal';
import ModalContent from './modal_content';
import { hashHistory, Link } from 'react-router';


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      modalStyles: 'modal-styles modal-opening'
    };
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.isLoggedIn & this.props.isLoggedIn) {
      hashHistory.push("/login");
    }
  }

  logout() {
    this.props.logout();
  }

  logoutButton() {
    return(
      <button onClick={e => this.logout()}>Logout</button>
    );
  }

  openModal() {
    this.setState({modalOpen: true});
    setTimeout(() => this.setState({modalStyles: 'modal-styles'}), 0);
  }

  closeModal() {
    this.setState({modalStyles: 'modal-styles modal-opening'});
    setTimeout(() => this.setState({modalOpen: false}), 500);
  }

  loginLinks() {
    return(
      <div>
        <a onClick={() => this.openModal()}>About</a>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }

  render() {
    const { isLoggedIn, currentUser } = this.props;
    return(
      <nav className="top-nav">
        <ReactModal
          className={this.state.modalStyles}
          isOpen={this.state.modalOpen}
          onRequestClose={() => this.closeModal()}>
          <ModalContent onRequestClose={() => this.closeModal()} />
        </ReactModal>
        <Link to="/"><div className="nav-logo" /></Link>
        { isLoggedIn ? this.logoutButton() : this.loginLinks() }
      </nav>
    );
  }
}

export default Navbar;
