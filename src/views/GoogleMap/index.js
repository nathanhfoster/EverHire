import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect as reduxConnect } from 'react-redux'
import './styles.css'
import {setcurrentlocation} from '../../actions'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import SearchBar from '../../components/SearchBar'
import Styles from './styles.css'

const mapStyle = {
  height: '100vh',
  width: '100vw',
  boxShadow: '0 10px 6px -6px #1a2327'
}

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = {

}

class GoogleMap extends Component {
  constructor(props) {
    super();
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.watchID = null
    this.state = {
      initialPosition: {},
      lastPosition: {},
      center: {},
      seconds: 0,
      name: '',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
  }

  tick = () => {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }))
  }

  static propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    center: PropTypes.object,
    initialCenter: PropTypes.object,
    coordinates: PropTypes.func.isRequired
  }

  static defaultProps = {
    initialPosition: {},
    lastPosition: {},
    seconds: 0,
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

  componentDidMount() {
      this.getState()
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
    // this.interval = setInterval(() => this.tick(), 1000)
    navigator.geolocation.getCurrentPosition( initialPosition => 
         this.setState({ initialPosition }),
         error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
   )
   this.watchID = navigator.geolocation.watchPosition(lastPosition => this.setState({lastPosition}))
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    navigator.geolocation.clearWatch(this.watchID)
  }

  updateMapCenter(coords)  {
    this.setState({
        center: coords
    })
} 

_onBoundsChange = (center, zoom /* , bounds, marginBounds */) => {
  //this.props.onCenterChange(center);
  //this.props.onZoomChange(zoom);
}

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }
    const {center} = this.state
  const {latitude, longitude} = this.state.lastPosition.coords != null ? this.state.lastPosition.coords : 0
    return (
      <div className="GoogleMapContainer">
        <div className="GoogleMapWrapper">
          <Map
            google={this.props.google}
            style={mapStyle}
            zoom={16}
            onClick={this.onMapClicked.bind(this)}
            onBoundsChange={this._onBoundsChange}
            initialCenter={{
              lat: 37.334665328,
              lng: -121.875329832
              }}
            center={{
            lat: latitude,
            lng: longitude
            }}
              
            >
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} 
                        position={{lat: latitude, lng: longitude}} />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    >
                        <div className="infoWindow">
                            <h2>Lat: {latitude}</h2>
                            <h2>Lng: {longitude}</h2>
                        </div>
                </InfoWindow>
            </Map>
            : <div>Getting the location data&hellip; </div>
          </div>

          <div className="searchSideBarWrapper">
            <h1>SEARCHBAR</h1>
          </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: ("AIzaSyAhKIWtI4AG_BvzKo9MkIuVx6Iz5tM6e40")
})(GoogleMap)
