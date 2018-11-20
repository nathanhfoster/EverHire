import React, { Component } from "react";
import axios from "axios";
import { connect as reduxConnect } from "react-redux";
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
  Image
} from "react-bootstrap";
import { postJob } from "../../actions/JobPosts";

const mapStateToProps = ({ User }) => ({
  User
});

const mapDispatchToProps = {
  postJob
};

class JobPost extends Component {
  constructor(props) {
    super(props);
    //this.onChange = this.onChange.bind(this)

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  componentWillMount() {
    this.getState(this.props);
  }

  componentWillUpdate() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    const { User } = props;

    this.setState({ User });
  };

  componentDidUpdate() {}

  componentWillUnmount() {}

  getCoords = address => {
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: address,
          key: "AIzaSyAhKIWtI4AG_BvzKo9MkIuVx6Iz5tM6e40"
        }
      })
      .then(res => {
        this.setState({
          lat: res.data.results[0].geometry.location.lat,
          lng: res.data.results[0].geometry.location.lng
        });
      })
      .catch(err => console.log(err));
  };

  postJob = e => {
    e.preventDefault();
    let payload = new FormData();
    // Author and last_modified_by
    const {
      User,
      address,
      title,
      description,
      lat,
      lng,
      phone_number,
      tags,
      image
    } = this.state;
    const { id, token } = User;
    this.getCoords(address);
    payload.append("address", address);
    payload.append("title", title);
    payload.append("description", description);
    payload.append("lat", lat);
    payload.append("lng", lng);
    payload.append("phone_number", phone_number);
    payload.append("tags", tags);
    payload.append("author", id);
    payload.append("last_modified_by", id);
    payload.append("image", image);
    this.props.postJob(token, payload);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  setImage = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.setState({ image: reader.result });
  };

  render() {
    const { image } = this.state;
    return (
      <Grid className="JobPost">
        <Form onChange={this.onChange}>
          <FormGroup controlId="formHorizontalEmail">
            <FormControl type="text" name="title" placeholder="Title" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl
              componentClass="textarea"
              name="description"
              placeholder="Description"
            />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl
              componentClass="textarea"
              name="phone_number"
              placeholder="PhoneNumber"
            />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl
              componentClass="textarea"
              name="tags"
              placeholder="Tags"
            />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl type="text" name="address" placeholder="Address" />
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
export default reduxConnect(mapStateToProps, mapDispatchToProps)(JobPost);
