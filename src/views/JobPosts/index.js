import React, { PureComponent } from "react";
import { connect as reduxConnect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
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
import { postJob, updateJob, clearJob } from "../../actions/JobPosts";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

const mapStateToProps = ({ User, JobDetail, userLocation }) => ({
  User,
  JobDetail,
  userLocation
});

const mapDispatchToProps = {
  postJob,
  updateJob,
  clearJob
};

class JobPost extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      title: "",
      description: "",
      phone_number: "",
      email: "",
      tags: "",
      address: "",
      image: ""
    };
  }

  componentWillMount() {
    this.getState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  componentWillUnmount() {
    this.props.clearJob();
  }
  getState = props => {
    const { User, JobDetail, match } = props;
    const {
      id,
      title,
      description,
      phone_number,
      email,
      tags,
      address,
      image
    } = match.params.id ? JobDetail : this.state;
    this.setState({
      User,
      JobDetail,
      match,
      id,
      title,
      description,
      phone_number,
      email,
      tags,
      address,
      image
    });
  };

  handleChange = address => this.setState({ address });

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        this.setState({ address, lat: latLng.lat, lng: latLng.lng })
      )
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

  updateJob = id => {
    const {
      User,
      title,
      description,
      phone_number,
      email,
      tags,
      address,
      image
    } = this.state;
    let payload = new FormData();
    payload.append("last_modified_by", User.id);
    payload.append("title", title);
    payload.append("description", description);
    payload.append("phone_number", phone_number);
    payload.append("email", email);
    payload.append("tags", tags);
    payload.append("address", address);
    payload.append("image", image);
    this.props.updateJob(id, User.token, payload);
  };

  render() {
    const {
      User,
      JobDetail,
      match,
      id,
      title,
      description,
      phone_number,
      email,
      tags,
      address,
      image
    } = this.state;
    return (match.params.id &&
      JobDetail.author &&
      JobDetail.author !== User.id) ||
      (match.params.id && JobDetail.id && match.params.id != JobDetail.id) ? (
      <Redirect to="/map" />
    ) : (
      <Grid className="JobPost">
        <Form onChange={this.onChange}>
          <FormGroup
            style={{ marginTop: "20px" }}
            controlId="formHorizontalEmail"
          >
            <FormControl
              value={title}
              type="text"
              name="title"
              placeholder="Title"
            />
          </FormGroup>

          <FormGroup>
            <FormControl
              value={description}
              componentClass="textarea"
              name="description"
              placeholder="Description"
            />
          </FormGroup>

          <FormGroup>
            <FormControl
              value={phone_number}
              componentClass="textarea"
              name="phone_number"
              placeholder="Phone number"
            />
          </FormGroup>

          <FormGroup>
            <FormControl
              value={email}
              type="text"
              name="email"
              placeholder="Email"
            />
          </FormGroup>

          <FormGroup>
            <FormControl
              value={tags}
              componentClass="textarea"
              name="tags"
              placeholder="Tags"
            />
          </FormGroup>

          <FormGroup>
            <PlacesAutocomplete
              value={address}
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
          {match && match.params.id ? (
            <Button onClick={() => this.updateJob(id)}>Update</Button>
          ) : (
            <Button onClick={this.postJob}>Post</Button>
          )}
        </Form>
      </Grid>
    );
  }
}
export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(JobPost)
);
