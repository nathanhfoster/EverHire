import React, { PureComponent } from "react";
import { connect as reduxConnect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./styles.css";
import "./stylesM.css";
import FormData from "form-data";
import {
  Grid,
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
  Image,
  InputGroup
} from "react-bootstrap";
import { postJob } from "../../actions/JobPosts";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

const mapStateToProps = ({ User, Jobs, userLocation }) => ({
  User,
  Jobs,
  userLocation
});

const mapDispatchToProps = {
  postJob
};

class JobPost extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      Jobs: [],
      address: ""
    };
  }

  componentWillMount() {
    this.getState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    const { User, Jobs } = props;
    this.setState({ User, Jobs });
  };

  handleChange = address => this.setState({ address });

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ lat: latLng.lat, lng: latLng.lng }))
      .catch(error => console.error("Error", error));
  };

  postJob = e => {
    e.preventDefault();
    let payload = new FormData();
    const {
      User,
      address,
      title,
      description,
      lat,
      lng,
      phone_number,
      email,
      tags,
      image
    } = this.state;
    const { id, token } = User;
    payload.append("address", address);
    payload.append("title", title);
    payload.append("description", description);
    payload.append("lat", lat);
    payload.append("lng", lng);
    payload.append("phone_number", phone_number);
    payload.append("email", email);
    payload.append("tags", tags);
    payload.append("author", id);
    payload.append("last_modified_by", id);
    payload.append("image", image);
    this.props.postJob(token, payload);

    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  setImage = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.setState({ image: reader.result });
  };

  getUserLocation = () =>
    this.setState({
      lat: this.props.userLocation.latitude,
      lng: this.props.userLocation.longitude
    });

  render() {
    console.log(this.state.lat, this.state.lng);
    const { image } = this.state;
    return (
      <Grid className="JobPost">
        <Form onChange={this.onChange}>
          <FormGroup controlId="formHorizontalEmail">
            <FormControl type="text" name="title" placeholder="Title" />
          </FormGroup>

          <FormGroup>
            <FormControl
              componentClass="textarea"
              name="description"
              placeholder="Description"
            />
          </FormGroup>

          <FormGroup>
            <FormControl
              componentClass="textarea"
              name="phone_number"
              placeholder="Phone number"
            />
          </FormGroup>

          <FormGroup>
            <FormControl type="text" name="email" placeholder="Email" />
          </FormGroup>

          <FormGroup>
            <FormControl
              componentClass="textarea"
              name="tags"
              placeholder="Tags"
            />
          </FormGroup>

          <FormGroup>
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => [
                <InputGroup>
                  <InputGroup.Addon>
                    <i
                      onClick={this.getUserLocation}
                      className="fas fa-map-marker-alt locationButton"
                    />
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    {...getInputProps({
                      placeholder: "Address",
                      className: "location-search-input"
                    })}
                  />
                </InputGroup>,
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              ]}
            </PlacesAutocomplete>
          </FormGroup>

          <FormGroup>
            <Image src={image} className="image" responsive rounded />
            <ControlLabel style={{ color: "white" }}>Job Picture</ControlLabel>
            <FormControl
              type="file"
              label="File"
              name="image"
              onChange={this.setImage}
            />
          </FormGroup>
          <Button onClick={this.postJob}>Post</Button>
        </Form>
      </Grid>
    );
  }
}
export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(JobPost)
);
