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
import {K_SIZE} from './my_great_place_with_controllable_hover_styles.js'
import './styles.css'


class JobMap extends Component {
  constructor(props) {
    super(props);
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
//console.log(props)
let {markers} = props
  navigator.geolocation.getCurrentPosition( initialPosition => 
       this.setState({ initialPosition }),
       error => alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
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
    //console.log("_onChildClick")
    //this.props.onCenterChange([childProps.lat, childProps.lng]);
  }

  _onChildMouseEnter = (key /*, childProps */) => {
   // console.log("_onChildMouseEnter: ", key)
    // this.props.onHoverKeyChange(key);
  }

  _onChildMouseLeave = (key, /*childProps */) => {
    //console.log("_onChildMouseLeave")
   // this.props.onHoverKeyChange(null);
  }

  createMapOptions = (map) => {
    //console.log(map)
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: true,
      zoomControl: false,
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
  //   console.log("map: ", map)
  //   if (map) {
  //     const latLng = maps.LatLng(lat, lng);
  //     map.panTo(latLng);
  //   }
  // }

  render() {
    //console.log(this.state)
    const {center, zoom} = this.state
    const {accuracy, altitude, altitudeAccuracy,
      heading, latitude, longitude, speed} = this.state.lastPosition.coords != null ? this.state.lastPosition.coords : 0
    const places = this.state.markers.map(place => {
        const {id, ...coords} = place

        return (
          <MyGreatPlaceWithControllableHover
            key={id}
            {...coords}
            text={id}
            // use your hover state (from store, react-controllables etc...)
            hover={this.props.hoverKey === id} />
        )
      })

    return (
      <div className="GoogleMapContainer">
        <div className="GoogleMapWrapper">
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
            >
            
            
              {places}
            </GoogleMap>
        </div>
        <div className="searchSideBarWrapper">
          <Row className="center">
            <Col lg={11} md={10} sm={8} xs={7}>
              <InputGroup className="searchBar">
                <InputGroup.Addon><FontAwesomeIcon icon={faSearch}/></InputGroup.Addon>
                <FormControl type="text" />
              </InputGroup>
            </Col>

            <Col>
              <Button bsClass="locationButton zoomHover" bsSize="large" onClick={this.locationButton.bind(this)}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg"/>
              </Button>
            </Col>
            <Col>
              <Button bsClass="locationButton zoomHover" bsSize="large" onClick={this.locationButton.bind(this)}>
                <FontAwesomeIcon icon={faListAlt} size="lg"/>
              </Button>
            </Col>
          </Row>
          <p>Accuracy: {accuracy}</p>
          <p>Altitude: {altitude}</p>
          <p>AltitudeAccuracy: {altitudeAccuracy}</p>
          <p>Heading: {heading}</p>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <p>Speed: {speed} </p>
          <br/>
          <p>Center: {center[0]}, {center[0]} </p>
          <p>Zoom: {zoom} </p>
          </div>
      </div>
    );
  }
}
export default (JobMap)