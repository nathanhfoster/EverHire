import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shouldPureComponentUpdate from 'react-pure-render/function'

import GoogleMap from 'google-map-react'
import MyGreatPlaceWithControllableHover from './my_great_place_with_controllable_hover.jsx'

import {K_SIZE} from './my_great_place_with_controllable_hover_styles.js'
import './styles.css'

const mapStyle = {
  height: '100%',
  width: '100%',
  position: 'relative'
}

export default class EventsMapPage extends Component {
  constructor(props) {
    super();
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
let {markers, zoom} = props
  navigator.geolocation.getCurrentPosition( initialPosition => 
       this.setState({ initialPosition }),
       error => alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
 )
 this.watchID = navigator.geolocation.watchPosition(lastPosition => {
   markers[0] = {id: 'Me', lat: lastPosition.coords.latitude, lng: lastPosition.coords.longitude}
  this.setState({
    markers,
    zoom,
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


  render() {
    //console.log("STATE: ",this.state)
    const {center, zoom} = this.state
    const {latitude, longitude} = this.state.lastPosition.coords != null ? this.state.lastPosition.coords : 0
    const places = this.state.markers
      .map(place => {
        const {id, ...coords} = place;

        return (
          <MyGreatPlaceWithControllableHover
            key={id}
            {...coords}
            text={id}
            // use your hover state (from store, react-controllables etc...)
            hover={this.props.hoverKey === id} />
        );
      });

    return (
      <div className="GoogleMapContainer">
       <GoogleMap
        style={mapStyle}
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
        >
          {places}
        </GoogleMap>
      </div>
    );
  }
}