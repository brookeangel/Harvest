/* global google */
class LocationManager {
  constructor(autocompleteCb, elementId) {
    this.autocompleteCallback = autocompleteCb;
    this.elementId = elementId;
  }

  initAutocomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById(this.elementId),
      {types: ['geocode']}
    );
    this.autocomplete.addListener('place_changed',
      this.fillInAddress.bind(this));
  }

  fillInAddress() {
    const place = this.autocomplete.getPlace();
    this.autocompleteCallback(place);
  }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        let circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });

        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  }
}

export default LocationManager;
