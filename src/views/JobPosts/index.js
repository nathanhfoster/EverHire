import React, { PureComponent } from "react";
import axios from "axios";
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
  Image
} from "react-bootstrap";
import { postJob } from "../../actions/JobPosts";

const mapStateToProps = ({ User, Jobs }) => ({
  User,
  Jobs
});

const mapDispatchToProps = {
  postJob
};

class JobPost extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {Jobs: []};
  }

  static propTypes = {};

  static defaultProps = {};

  componentWillMount() {
    this.getState(this.props);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    const currentJobs = this.state.Jobs;
    const { User, Jobs } = props;
    this.setState({ User, Jobs });
  };

  getCoords = address => {
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: address,
          key: "AIzaSyAhKIWtI4AG_BvzKo9MkIuVx6Iz5tM6e40"
        }
      }).then(res => {
        this.setState({
          address,
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

  render() {
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
              placeholder="PhoneNumber"
            />
          </FormGroup>

          <FormGroup>
          <FormControl
            type="text"
            name="email"
            placeholder="Email"
          />
        </FormGroup>

          <FormGroup>
            <FormControl
              componentClass="textarea"
              name="tags"
              placeholder="Tags"
            />
          </FormGroup>

          <FormGroup>
            <FormControl
              type="text"
              name="address"
              placeholder="Address"
              onChange={e => this.getCoords(e.target.value)}
            />
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
