/* globals google */

export default class MarkerManager {
  constructor(map, handleClick){
    this.map = map;
    this.handleClick = handleClick;
    this.markers = [];
    //permanently bind instance methods
    this._createMarkerFromHarvst = this._createMarkerFromHarvst.bind(this);
    this._removeMarker = this._removeMarker.bind(this);
  }

  updateMarkers(harvsts){
    this.harvsts = harvsts;
    this._harvstsToAdd().forEach(this._createMarkerFromHarvst);
    this._markersToRemove().forEach(this._removeMarker);
  }

  _harvstsToAdd(){
    const currentHarvstIds = this.markers.map(marker => marker.harvstId);
    const newHarvsts = this.harvsts;
    const newHarvstIds = Object.keys(newHarvsts);

    return newHarvstIds.reduce((collection, harvstId) => {
      if (!currentHarvstIds.includes(harvstId)) {
        return (collection.concat([newHarvsts[harvstId]]));
      }
    }, []);
  }

  _markersToRemove(){
    return this.markers.filter(marker => {
      return !this.harvsts.hasOwnProperty(marker.harvstId);
    });
  }

  _createMarkerFromHarvst(harvst) {
    const pos = new google.maps.LatLng(harvst.lat, harvst.lng);
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      harvstId: harvst.id
    });
    marker.addListener('click', () => this.handleClick(harvst));
    this.markers.push(marker);
  }

  _removeMarker(marker) {
    const idx = this.markers.indexOf(marker);
    this.markers[idx].setMap(null);
    this.markers.splice(idx, 1);
  }

  hover(hoveredHarvst) {
    this.markers.forEach(marker => {
      if(hoveredHarvst && hoveredHarvst.id === marker.harvstId) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      } else {
        marker.setAnimation(null);
      }
    });
  }
}
