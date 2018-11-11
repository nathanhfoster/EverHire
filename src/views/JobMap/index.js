import React, { Component } from "react";
import ImmutableProptypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import LoadingScreen from "../../components/LoadingScreen";
import { connect as reduxConnect } from "react-redux";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import GoogleMap from "google-map-react";
import MyGreatPlaceWithControllableHover from "./my_great_place_with_controllable_hover";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faMapMarkerAlt from "@fortawesome/fontawesome-free-solid/faMapMarkerAlt";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import faListAlt from "@fortawesome/fontawesome-free-solid/faListAlt";
import {
  K_CIRCLE_SIZE,
  K_STICK_SIZE
} from "./my_great_place_with_controllable_hover_styles.js";
import "./styles.css";
import "./stylesM.css";
import { setUserLocation, getUserLocation } from "../../actions/App";

const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;

const mapStateToProps = ({ userLocation, Jobs }) => ({
  userLocation,
  Jobs
});

const mapDispatchToProps = {
  setUserLocation,
  getUserLocation
};

class JobMap extends Component {
  constructor(props) {
    super(props);
    this.watchID = null;
    this.state = {
      userLocation: {},
      shouldSetInitialCenter: true,
      initialCenter: [39.81363019660378, -101.42108394461178],
      center: null,
      zoom: 11,
      markers: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      userLocation: {}
    };
  }

  static propTypes = {
    userLocation: PropTypes.object,
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object,
    markers: PropTypes.array,
    zoom: PropTypes.number,
    onCenterChange: PropTypes.func,
    onZoomChange: PropTypes.func,
    onHoverKeyChange: PropTypes.func,
    markers: PropTypes.array,
    userLocation: ImmutableProptypes.map,
    setUserLocation: PropTypes.func.isRequired,
    getUserLocation: PropTypes.func.isRequired
  };

  static defaultProps = {
    userLocation: new Map(),
    center: [37.4220862600981 -121.89071280220037],
    zoom: 10,
    markers: [
      { id: "Me", lat: null, lng: null },
      { id: "A", lat: 38.3352, lng: -121.8782 },
      { id: "B", lat: 37.3346653, lng: -121.87532982 }
    ]
  };

  componentWillMount() {
    this.getState(this.props);
  }
  componentWillUpdate() {}

  componentDidMount() {
    this.props.getUserLocation();
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  componentWillUpdate() {}

  componentDidUpdate() {}

  getState = props => {
    let {userLocation, Jobs, markers} = props
    console.log(Jobs)
    let JobMarkers
    this.watchID = navigator.geolocation.watchPosition(lastPosition => {
      const {timestamp} = lastPosition
      const {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed} = lastPosition.coords
      JobMarkers = [{id: 'Me', lat: lastPosition.coords.latitude, lng: lastPosition.coords.longitude}].concat(markers)
      this.props.setUserLocation(accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed)
        error => alert(error.message),
        { enableHighAccuracy: true, timeout: Infinity, maximumAge: 0 }
      })
    this.setState({markers: Jobs, userLocation, Jobs})
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  _onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
    this._panTo(center, zoom);
    //this.props.onCenterChange(center);
    //this.props.onZoomChange(zoom);
  };

  _onChildClick = (key, childProps) => {
    // const center = [childProps.lat, childProps.lng]
    // const zoom = this.state.zoom + 1 < 18 ? this.state.zoom + 1 : this.state.zoom
    // this._panTo(center, zoom)
  };

  _onChildMouseEnter = (key, childProps) => {
    // this.props.onHoverKeyChange(key);
  };

  _onChildMouseLeave = (key /*childProps */) => {
    // this.props.onHoverKeyChange(null);
  };

  _distanceToMouse = (markerPos, mousePos, markerProps) => {
    const x = markerPos.x;
    // because of marker non symmetric,
    // we transform it central point to measure distance from marker circle center
    // you can change distance function to any other distance measure
    const y = markerPos.y - K_STICK_SIZE - K_CIRCLE_SIZE / 2;

    // and i want that hover probability on markers with text === 'A' be greater than others
    // so i tweak distance function (for example it's more likely to me that user click on 'A' marker)
    // another way is to decrease distance for 'A' marker
    // this is really visible on small zoom values or if there are a lot of markers on the map
    const distanceKoef = 2;

    // it's just a simple example, you can tweak distance function as you wish
    return (
      distanceKoef *
      Math.sqrt(
        (x - mousePos.x) * (x - mousePos.x) +
          (y - mousePos.y) * (y - mousePos.y)
      )
    );
  };

  _panTo = (center, zoom) => this.setState({ center, zoom });

  createMapOptions = map => {
    return {
      disableDefaultUI: true,
      gestureHandling: "greedy"
      // panControl: true,
      // mapTypeControl: false,
      // scrollwheel: true,
      // zoomControl: false,
      // fullscreenControl: false,
      // scaleControl: false,
      // streetViewControl: true,
      // overviewMapControl: true,
      // rotateControl: true
      // styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
    };
  };

  locationButton = e => {
    const { latitude, longitude } =
      this.state.lastPosition.coords != null
        ? this.state.lastPosition.coords
        : this.props.userLocation != null
          ? this.props.userLocation
          : 0;
    const zoom =
      this.state.zoom + 4 < 18 ? this.state.zoom + 4 : this.state.zoom;
    this._panTo([latitude, longitude], zoom);
  };

  mapCanLoad = () => {
    if(this.state.userLocation != null) {
      const {latitude, longitude} = this.state.userLocation
      if(this.state.shouldSetInitialCenter) {
        this.setState({center: [latitude, longitude], shouldSetInitialCenter: false})
      }
      return true;
    } else return false;
  };

  // apiIsLoaded = (map, maps, lat, lng) => {
  //   if (map) {
  //     const latLng = maps.LatLng(lat, lng);
  //     map.panTo(latLng);
  //   }
  // }

  render() {
    const {initialCenter, center, zoom, markers} = this.state
    let {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp} = this.state.userLocation
    speed = parseInt(speed * 2.23694) // meters per second to mph
    altitude = parseInt(altitude * 3.28084) // meters to feet
    const places = markers.map(place => {
      const { id, ...coords } = place;
      return (
        <MyGreatPlaceWithControllableHover
          key={id}
          {...coords}
          text={id}
          zIndex={1}
          // use your hover state (from store, react-controllables etc...)
          $hover={this.props.hoverKey === id}
        />
      );
    });

    return (
      <div className="GoogleMapContainer">
      {this.mapCanLoad() ? [
        <div className="searchListWrapper">
        <Row className="center">
          <div className="searchListTab"/>
        </Row>
        <Row className="center ht-40 mg-b-20">
          <h3>Explore Jobs</h3>
        </Row>
          <Row className="mg-20">
            <Col className="scrolling-wrapper">
              <div class="card"><h2>Card</h2></div>
              <div class="card"><h2>Card</h2></div>
              <div class="card"><h2>Card</h2></div>
              <div class="card"><h2>Card</h2></div>
              <div class="card"><h2>Card</h2></div>
              <div class="card"><h2>Card</h2></div>
              <div class="card"><h2>Card</h2></div>
              <div class="card"><h2>Card</h2></div>
              <div class="card"><h2>Card</h2></div>
            </Col>
          </Row>
        </div>,
        <div className="GoogleMapWrapper">
          <GoogleMap
            //onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, latitude, longitude)}
            apiKey={googleKey} // set if you need stats etc ...
            defaultCenter={[latitude, longitude]}
            initialCenter={initialCenter}
            center={center}
            zoom={zoom}
            onClick={this.onMapClicked}
            onBoundsChange={this._onBoundsChange}
            onChildClick={this._onChildClick}
            onChildMouseEnter={this._onChildMouseEnter}
            onChildMouseLeave={this._onChildMouseLeave}
            options={this.createMapOptions}
            hoverDistance={K_CIRCLE_SIZE / 2}
            distanceToMouse={this._distanceToMouse}
            panTo={this._panTo}
          >            
            {places}
          </GoogleMap>
          <Button bsClass="sheenButton locationButton sheen" bsSize="large" onClick={this.locationButton.bind(this)}>
           <FontAwesomeIcon icon={faMapMarkerAlt} size="lg"/>
          </Button>
          <Button bsClass="sheenButton listButton sheen" bsSize="large" onClick={this.locationButton.bind(this)}>
            <FontAwesomeIcon icon={faListAlt} size="lg"/>
          </Button>
        </div>
        ] : <LoadingScreen />
      }
      </div>
    );
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(JobMap);
