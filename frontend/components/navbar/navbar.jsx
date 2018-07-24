/* globals google */
import React from 'react';
import ReactModal from 'react-modal';
import AboutModal from './about_modal';
import NewHarvstModal from '../harvests/new_harvst_modal';
import LocationManager from '../../util/location_manager';
import { hashHistory, Link } from 'react-router';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.handleLocationUpdate = this.handleLocationUpdate.bind(this);
    this.state = {
      modalOpen: false,
      modalStyles: 'modal-styles modal-opening',
      modalContent: null
    };
  }

  componentWillMount() {
    this.locationManager = new LocationManager(
      this.handleLocationUpdate,
      'nav-autocomplete'
    );
  }

  componentDidMount() {
    this.locationManager.initAutocomplete();
  }

  handleLocationUpdate(place) {
    this.props.setCenter({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    });

    setTimeout(() => {
      document.getElementById('nav-autocomplete').value = "";
    }, 500);
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
      <div>
        <a onClick={this.props.toggleDrawer}>
          <i className="fa fa-star fa-3x" aria-hidden="true"></i>
        </a>
        <a onClick={e => this.openModal('newHarvst')}>
          <i className="fa fa-plus fa-3x" aria-hidden="true"></i>
        </a>
        <a onClick={e => this.logout()}>
          <i className="fa fa-sign-out fa-3x" aria-hidden="true"></i>
        </a>
      </div>
    );
  }

  openModal(content) {
    this.setState({modalOpen: true, modalContent: content});
    setTimeout(() => this.setState({modalStyles: 'modal-styles'}), 0);
  }

  closeModal() {
    this.props.resetForm();
    this.setState({modalStyles: 'modal-styles modal-opening'});
    setTimeout(() => this.setState({modalOpen: false}), 500);
  }

  loginLinks() {
    return(
      <div>
        <a onClick={() => this.openModal('about')}>About</a>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }

  renderModalContent() {
    if (this.state.modalContent === 'about') {
      return <AboutModal />;
    } else {
      return <NewHarvstModal closeModal={this.closeModal}/>;
    }
  }

  searchBar(isLoggedIn) {
    return(
      <p className={isLoggedIn ? "" : "hidden"}>
        <i className="fa fa-search fa-lg" aria-hidden="true"></i>
        <input id="nav-autocomplete"
          className="nav-search"
          placeholder="Search locations..."
          onFocus={this.locationManager.geolocate()}
          type="text"></input>
      </p>
    );
  }

  render() {
    const { isLoggedIn, currentUser } = this.props;
    return(
      <nav className="top-nav">
        <ReactModal
          style={{overlay: {zIndex: 100}}}
          className={this.state.modalStyles}
          isOpen={this.state.modalOpen}
          contentLabel="Create Harvest"
          onRequestClose={this.closeModal}>
          {this.renderModalContent()}
        </ReactModal>
        <Link to="/"><div className="nav-logo" /></Link>
        { this.searchBar(isLoggedIn) }
        { isLoggedIn ? this.logoutButton() : this.loginLinks() }
      </nav>
    );
  }
}

export default Navbar;
