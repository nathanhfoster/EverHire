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
    this.state = {
      seconds: 0,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: null,
      longitude: null,
      speed: null,
      timestamp: null,
      name: '',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  tick = () => {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }))
  }

  static propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object,
    coordinates: PropTypes.func.isRequired
  }

  static defaultProps = {
    seconds: 0,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
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

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

  getState = props => {
    this.interval = setInterval(() => this.tick(), 1000)
    navigator.geolocation.getCurrentPosition(pos => {this.setState({ latitude: pos.coords.latitude, longitude: pos.coords.longitude})},
      error => console.log(error)
    )
    const {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp} = window.store.getState().currentlocation
    this.setState({accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp})
  }

  successCallback = (pos) => {
    const {timestamp} = pos
    const {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed} = pos.coords
    window.store.dispatch(setcurrentlocation(accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp))
  }

  errorCallback = () => {
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log(this.state)
    if (!this.props.google) {
      return <div>Loading...</div>;
    }
  const {latitude, longitude} = this.state
    return (
      <div className="GoogleMapContainer">
        <div className="GoogleMapWrapper">
          <Map
            google={this.props.google}
            style={mapStyle}
            zoom={16}
            onClick={this.onMapClicked}
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
                            <h2>Lat: {this.state.latitude}</h2>
                            <h2>Lng: {this.state.longitude}</h2>
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