import React from 'react';
import { connect } from 'react-redux';
import {
  createHarvst,
  uploadImage } from '../../actions/harvst_actions';
import LocationManager from '../../util/location_manager';
import Dropzone from 'react-dropzone';

class NewHarvstModal extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.handleLocationUpdate = this.handleLocationUpdate.bind(this);
    this.state = {
      title: '',
      address: '',
      lat: '',
      lng: '',
      isUploading: false
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
      setTimeout(() => {
        this.props.closeModal();
      }, 1700);
    }

    if(nextProps.image_url !== this.props.image_url) {
      this.setState({isUploading: false});
    }
  }

  onDrop(files) {
    this.setState({
      isUploading: true
    });

    this.props.uploadImage(files[0]);
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
    const harvst = {
      title: this.state.title,
      lat: this.state.lat,
      lng: this.state.lng,
      address: this.state.address,
      image_url: this.props.image_url
    };

    this.props.createHarvst(harvst);
  }

  update(field) {
    return (e) => this.setState({[field]: e.target.value});
  }

  getStyle() {
    let color = this.state.isUploading ? 'grey' : 'white';
    return {
      backgroundImage: `url('${this.props.image_url}')`,
      backgroundColor: color
    };
  }

  dropzoneText() {
    if (this.state.isUploading) {
      return 'uploading...';
    } else if (this.props.image_url.length === 0) {
      return 'Upload harvest image!';
    } else {
      return '';
    }
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
          {
            this.props.success ? <li>Successful Upload!</li> : ''
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
          <Dropzone className='dropzone'
            multiple={false}
            accept="image/*"
            style={this.getStyle()}
            onDrop={this.onDrop}>
            <div>
              { this.dropzoneText() }
            </div>
          </Dropzone>
          <p>
            <input type="submit"
              disabled={this.props.isUploading ? true : false}
              value="Create Harvest" />
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.creationSuccess.errors,
  success: state.creationSuccess.success,
  image_url: state.creationSuccess.image_url
});

const mapDispatchToProps = dispatch => ({
  createHarvst: data => dispatch(createHarvst(data)),
  uploadImage: image => dispatch(uploadImage(image))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewHarvstModal);
