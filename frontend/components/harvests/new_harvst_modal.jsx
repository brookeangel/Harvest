import React from 'react';
import { connect } from 'react-redux';
import { createHarvst } from '../../actions/harvst_actions';
import LocationManager from '../../util/location_manager';

class NewHarvstModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleLocationUpdate = this.handleLocationUpdate.bind(this);
    this.state = {
      title: '',
      address: '',
      image_url: '',
      lat: '',
      lng: ''
    };
  }

  componentWillMount() {
    this.locationManager = new LocationManager(this.handleLocationUpdate);
  }

  componentDidMount() {
    this.locationManager.initAutocomplete();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.success) {
      this.props.closeModal();
    }
  }

  handleLocationUpdate(place) {
    this.setState({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      address: place.formatted_address
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createHarvst(this.state);
  }

  update(field) {
    return (e) => this.setState({[field]: e.target.value});
  }

  render() {
    return(
      <div className='harvst-modal-overlay form'>
        <ul className="new-harvst-errors">
          {
            this.props.errors.slice(0, 2).map((error, i) => (
              <li key={`error-${i}`}>{error}</li>
            ))
          }
        </ul>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <p>
            <input onChange={this.update('title')} placeholder="title"
              value={this.state.title} type="text" />
          </p>
          <p>
            <input id="autocomplete" placeholder="address"
               onFocus={this.locationManager.geolocate()} type="text"></input>
          </p>
          <p>
            <input onChange={this.update('image_url')} placeholder="image_url"
            value={this.state.image_url} type="text" />
          </p>
          <p>
            <input type="submit" value="Create Harvest" />
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.creationSuccess.errors,
  success: state.creationSuccess.success
});

const mapDispatchToProps = dispatch => ({
  createHarvst: data => dispatch(createHarvst(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewHarvstModal);
