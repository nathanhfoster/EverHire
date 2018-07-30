import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col, InputGroup, FormControl, ButtonToolbar, Button } from 'react-bootstrap'
import shouldPureComponentUpdate from 'react-pure-render/function'
import GoogleMap from 'google-map-react'
import MyGreatPlaceWithControllableHover from './my_great_place_with_controllable_hover.jsx'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import faListAlt from '@fortawesome/fontawesome-free-solid/faListAlt'
import {K_SIZE, K_CIRCLE_SIZE, K_STICK_SIZE} from './my_great_place_with_controllable_hover_styles.js'
import './styles.css'

class JobMap extends Component {
  constructor(props) {
    super(props)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.watchID = null
    this.state = {
      initialPosition: {},
      lastPosition: {},
      center: [37.334665328, -121.875329832],
      zoom: 10,
      seconds: 0,
      markers: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
  }
  
  static propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object,
    coordinates: PropTypes.func.isRequired,
    markers: PropTypes.array,
    center: PropTypes.array, // @controllable
    zoom: PropTypes.number, // @controllable
    hoverKey: PropTypes.string, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn
    markers: PropTypes.array
  };

  static defaultProps = {
    initialPosition: {},
    lastPosition: {},
    center: [37.4220862600981 -121.89071280220037],
    zoom: 10,
    markers: [
      {id: 'Me', lat: null, lng: null},
      {id: 'A', lat: 38.3352, lng: -121.8782},
      {id: 'B', lat: 37.3346653, lng: -121.87532982},
    ]
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  componentDidMount() {
    this.getState(this.props)
  }

  componentWillReceiveProps(nextProps) {
      this.getState(nextProps)
  }

  componentWillMount() {
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

getState = props => {
let {markers} = props
  navigator.geolocation.getCurrentPosition( initialPosition => 
       this.setState({ initialPosition }),
       error => alert(error.message),
    { enableHighAccuracy: true, timeout: Infinity, maximumAge: 0 }
 )
 this.watchID = navigator.geolocation.watchPosition(lastPosition => {
   markers[0] = {id: 'Me', lat: lastPosition.coords.latitude, lng: lastPosition.coords.longitude}
  this.setState({
    markers,
    lastPosition
    })})
}

componentWillUnmount() {
  clearInterval(this.interval)
  navigator.geolocation.clearWatch(this.watchID)
}

onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  })
      
onMapClicked = (props) => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
      })
    }
  }

  _onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
    this.setState({center, zoom})
    //this.props.onCenterChange(center);
    //this.props.onZoomChange(zoom);
  }

  _onChildClick = (key, childProps) => {
    //this.props.onCenterChange([childProps.lat, childProps.lng]);
  }

  _onChildMouseEnter = (key /*, childProps */) => {
    // this.props.onHoverKeyChange(key);
  }

  _onChildMouseLeave = (key, /*childProps */) => {
   // this.props.onHoverKeyChange(null);
  }

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
    const distanceKoef = markerProps.text !== 'A' ? 1.5 : 1;

    // it's just a simple example, you can tweak distance function as you wish
    return distanceKoef * Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
  }

  createMapOptions = (map) => {
    return {
      panControl: true,
      mapTypeControl: false,
      scrollwheel: true,
      zoomControl: true,
      fullscreenControl: true,
      //disableDefaultUI: true
     // styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
    }
  }

  locationButton = (e) => {
    const {latitude, longitude} = this.state.lastPosition.coords != null ? this.state.lastPosition.coords : 0
    const panToLocation = [latitude, longitude]
    this.setState({center: panToLocation})
  }
  
  // apiIsLoaded = (map, maps, lat, lng) => {
  //   if (map) {
  //     const latLng = maps.LatLng(lat, lng);
  //     map.panTo(latLng);
  //   }
  // }

  render() {
    const {center, zoom} = this.state
    const {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed} = this.state.lastPosition.coords != null ? this.state.lastPosition.coords : 0
    const places = this.state.markers.map(place => {
    const {id, ...coords} = place
    return (
      <MyGreatPlaceWithControllableHover
        key={id}
        {...coords}
        text={id}
        zIndex={1}
        // use your hover state (from store, react-controllables etc...)
        hover={this.props.hoverKey === id} />
    )})

    return (
      <div className="GoogleMapContainer">
        <div className="GoogleMapWrapper" id="map">
          <GoogleMap
            //onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, latitude, longitude)}
            apiKey={"AIzaSyAhKIWtI4AG_BvzKo9MkIuVx6Iz5tM6e40"} // set if you need stats etc ...
            defaultCenter={[latitude, longitude]}
            center={center}
            zoom={zoom}
            hoverDistance={K_SIZE / 2}
            onClick={this.onMapClicked}
            onBoundsChange={this._onBoundsChange}
            onChildClick={this._onChildClick}
            onChildMouseEnter={this._onChildMouseEnter}
            onChildMouseLeave={this._onChildMouseLeave}
            options={this.createMapOptions}
            hoverDistance={K_CIRCLE_SIZE / 2}
            distanceToMouse={this._distanceToMouse}
            >            
              {places}
            </GoogleMap>
        </div>
        <div className="searchListWrapper" id="searchList">
        <Row bsClass="center">
          <Col>
          <span className="searchListTab">_</span>
          </Col>
        </Row>
          <Row bsClass="center">
            <Col lg={11} md={10} sm={8} xs={7}>
              <InputGroup className="searchBar">
                <InputGroup.Addon><FontAwesomeIcon icon={faSearch}/></InputGroup.Addon>
                <FormControl type="text" />
              </InputGroup>
            </Col>
            <Col>
              <Button bsClass="locationButton" bsSize="large" onClick={this.locationButton.bind(this)}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg"/>
              </Button>
            </Col>
            <Col>
              <Button bsClass="locationButton" bsSize="large" onClick={this.locationButton.bind(this)}>
                <FontAwesomeIcon icon={faListAlt} size="lg"/>
              </Button>
            </Col>
          </Row>
          <Row bsClass="">
            <Col>
              <p>Accuracy: {accuracy}</p>
              <p>Altitude: {altitude}</p>
              <p>Altitude accuracy: {altitudeAccuracy}</p>
              <p>Heading: {heading}</p>
              <p>Latitude: {latitude}</p>
              <p>Longitude: {longitude}</p>
              <p>Speed: {speed} </p>
              <p>Center: {center[0]}, {center[0]}</p>
              <p>Zoom: {zoom}</p>
            </Col>
          </Row>
          </div>
      </div>
    );
  }
}
export default (JobMap)
