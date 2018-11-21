import React, { PureComponent } from "react";
import ImmutableProptypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import LoadingScreen from "../../components/LoadingScreen";
import { connect as reduxConnect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Image
} from "react-bootstrap";
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
import { setUserLocation } from "../../actions/App";

const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;

const mapStateToProps = ({ User, userLocation, Jobs }) => ({
  User,
  userLocation,
  Jobs
});

const mapDispatchToProps = {
  setUserLocation
};

class JobMap extends PureComponent {
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
    center: [37.4220862600981 - 121.89071280220037],
    zoom: 10,
    markers: [
      // { id: "Me", lat: null, lng: null },
      // { id: "A", lat: 38.3352, lng: -121.8782 },
      // { id: "B", lat: 37.3346653, lng: -121.87532982 }
    ]
  };

  componentWillMount() {
    this.getState(this.props);
  }

  componentDidMount() {
    console.log("MOUNTED")
    navigator.geolocation.getCurrentPosition(
      lastPosition => {
        const {
          accuracy,
          altitude,
          altitudeAccuracy,
          heading,
          latitude,
          longitude,
          speed
        } = lastPosition.coords;
        this.props.setUserLocation(
          accuracy,
          altitude,
          altitudeAccuracy,
          heading,
          latitude,
          longitude,
          speed
        );
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
    this.watchID = navigator.geolocation.watchPosition(lastPosition => {
      const { timestamp } = lastPosition;
      const {
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed
      } = lastPosition.coords;
      this.props.setUserLocation(
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed
      );
      error => alert(error.message),
        { enableHighAccuracy: true, timeout: Infinity, maximumAge: 0 };
    });
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    let {User, userLocation, Jobs} = props;

    this.setState({User,  markers: Jobs, userLocation, Jobs });
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
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

  locationButton = (latitude, longitude) => {
    const zoom = this.state.zoom + 4 < 18 ? this.state.zoom + 4 : this.state.zoom;
    this._panTo([latitude, longitude], zoom);
  };

  mapCanLoad = () => {
    if (this.state.userLocation != null) {
      const { latitude, longitude } = this.state.userLocation;
      if (this.state.shouldSetInitialCenter) {
        this.setState({
          center: [latitude, longitude],
          shouldSetInitialCenter: false
        });
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

  renderJobCards = markers =>
    markers.filter(job => job.id !== 'Me').map(job => 
      <div className="card">
        <div className="card-img center">
          <Image src={job.image} rounded responsive />
        </div>
        <h4 className="inlineNoWrap">{job.title}</h4>
        <div className="cardSummary">
          <p className="blockNoWrap">{job.description}</p>
        </div>
        <div className="cardDetailButton">
          <Button
          onClick={() => this.locationButton(job.lat, job.lng)}>
            <i class="fas fa-map-marker-alt"/>
          </Button>
          <Button
          onClick={() => this.props.history.push("/jobdetails/" + job.id)}
          >
            <i class="far fa-eye"/>
          </Button>
        </div>
      </div>
    );

  render() {
    const { User, initialCenter, center, zoom, markers } = this.state;
    let { altitude, latitude, longitude, speed } = this.state.userLocation;
    speed = Number(speed * 2.23694); // meters per second to mph
    altitude = Number(altitude * 3.28084); // meters to feet
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

    return !User.token ? (
      <Redirect to="/" />
    ) : (
      <div className="GoogleMapContainer">
        {this.mapCanLoad() ? (
          [
            <div className="searchListWrapper">
              <Row className="center">
                <div className="searchListTab" />
              </Row>
              <Row className="center ht-40 mg-b-20">
                <h4>Explore Jobs</h4>
              </Row>
              <Row className="mg-20">
                <Col className="scrolling-wrapper">
                  {this.renderJobCards(markers)}
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
              <Button
                bsClass="sheenButton locationButton sheen"
                bsSize="large"
                onClick={() => this.locationButton(latitude, longitude)}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
              </Button>
              <Button
                bsClass="sheenButton listButton sheen"
                bsSize="large"
                onClick={() => this.locationButton(latitude, longitude)}
              >
                <FontAwesomeIcon icon={faListAlt} size="lg" />
              </Button>
            </div>
          ]
        ) : (
          <LoadingScreen />
        )}
      </div>
    );
  }
}
export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(JobMap)
);
