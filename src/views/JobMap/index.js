import React, { PureComponent } from "react";
import ImmutableProptypes from "react-immutable-proptypes";
import PropTypes from "prop-types";
import { LoadingScreen } from "../../components/LoadingScreen";
import { connect as reduxConnect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Row, Col, Button, Image } from "react-bootstrap";
import GoogleMap from "google-map-react";
import MyGreatPlaceWithControllableHover from "./my_great_place_with_controllable_hover";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faMapMarkerAlt from "@fortawesome/fontawesome-free-solid/faMapMarkerAlt";
import {
  K_CIRCLE_SIZE,
  K_STICK_SIZE
} from "./my_great_place_with_controllable_hover_styles.js";
import "./styles.css";
import "./stylesM.css";
import { setUserLocation } from "../../actions/App";
import { getJob, deleteJob } from "../../actions/JobPosts"

const googleKey = process.env.REACT_APP_GOOGLE_API_KEY;

const mapStateToProps = ({ User, userLocation, Jobs }) => ({
  User,
  userLocation,
  Jobs
});

const mapDispatchToProps = {
  setUserLocation,
  getJob,
  deleteJob
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
    markers: []
  };

  componentWillMount() {
    this.getState(this.props);
  }

  componentDidMount() {
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
      error => console.log(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition(lastPosition => {
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
      error => console.log(error.message),
        { enableHighAccuracy: true, timeout: Infinity, maximumAge: 0 };
    });
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    let { User, userLocation, Jobs } = props;

    this.setState({ User, markers: Jobs, userLocation, Jobs });
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  _onBoundsChange = (center, zoom) => {
    this._panTo(center, zoom);
  };

  _distanceToMouse = (markerPos, mousePos) => {
    const x = markerPos.x;
    const y = markerPos.y - K_STICK_SIZE - K_CIRCLE_SIZE / 2;
    const distanceKoef = 2;

    return (
      distanceKoef *
      Math.sqrt(
        (x - mousePos.x) * (x - mousePos.x) +
          (y - mousePos.y) * (y - mousePos.y)
      )
    );
  };

  _panTo = (center, zoom) => this.setState({ center, zoom });

  createMapOptions = () => {
    return {
      disableDefaultUI: true,
      gestureHandling: "greedy"
    };
  };

  locationButton = (latitude, longitude) => {
    const zoom =
      this.state.zoom + 4 < 18 ? this.state.zoom + 4 : this.state.zoom;
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

  renderJobCards = markers => {
    const {User} = this.state
   return markers
      .filter(job => job.id !== "Me")
      .map(job => (
        <div className="card">
          <div className="card-img center">
            <Image src={job.image} rounded responsive />
          </div>
          <h4 className="inlineNoWrap" style={{textAlign: 'center'}}>{job.title}</h4>
          <div className="cardSummary">
            <p className="blockNoWrap">{job.description}</p>
          </div>
          <div className="cardDetailButton">
            <Button onClick={() => this.locationButton(job.lat, job.lng)}>
              <i class="fas fa-map-marker-alt" />
            </Button>
            <Button
              onClick={() => this.props.history.push("/jobdetails/" + job.id)}
            >
              <i class="far fa-eye" />
            </Button>
            {User.id === job.author ? <Button onClick={() => {this.props.getJob(job.id); this.props.history.push(`/jobpost/edit/${job.id}`)}}><i className="fas fa-edit"/></Button> : null}
            {User.id === job.author ? <Button onClick={() => this.props.deleteJob(job.id, User.token)}><i className="fas fa-trash"/></Button> : null}
            <span style={{ float: "right" }}>{job.id ? job.id : ""}</span>
          </div>
        </div>
      ))
    };

  render() {
    let { markers } = this.state;
    const { User, initialCenter, center, zoom } = this.state;
    let { altitude, latitude, longitude, speed } = this.state.userLocation;
    speed = Number(speed * 2.23694); // meters per second to mph
    altitude = Number(altitude * 3.28084); // meters to feet
    if (markers.length > 0 && markers[0].id !== "Me")
      markers.unshift({ id: "Me", lat: latitude, lng: longitude });
    else markers[0] = { id: "Me", lat: latitude, lng: longitude };

    const places = markers.map(place => {
      const { id, ...coords } = place;
      return (
        <MyGreatPlaceWithControllableHover
          key={id}
          {...coords}
          text={id}
          zIndex={1}
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
                apiKey={googleKey}
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
