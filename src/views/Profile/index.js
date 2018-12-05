import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Row,
  Col,
  PageHeader,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar,
  Image
} from "react-bootstrap";
import { connect as reduxConnect } from "react-redux";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
import { updateProfile } from "../../actions/User";
import "./styles.css";
import "./stylesM.css";
import FormData from "form-data";

const mapStateToProps = ({ User }) => ({
  User
});

const mapDispatchToProps = {
  updateProfile
};

class Profile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      id: "",
      username: "",
      password: "",
      email: "",
      first_name: "",
      last_name: "",
      profile_image: null,
      date_joined: "",
      last_login: "",
      bio: ""
    };
  }

  static propTypes = {
    User: PropTypes.object,
    token: PropTypes.number,
    id: PropTypes.number,
    username: PropTypes.string,
    profile_image: PropTypes.object,
    bio: PropTypes.string
  };

  componentWillMount() {
    this.getState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    const {
      token,
      id,
      profile_image,
      username,
      email,
      first_name,
      last_name,
      date_joined,
      last_login,
      bio
    } = this.state.token ? this.state : props.User;
    const { password } = this.state;
    this.setState({
      token,
      id,
      username,
      password,
      email,
      first_name,
      last_name,
      profile_image,
      date_joined,
      last_login,
      bio
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  setImage = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.setState({ profile_image: reader.result });
  };

  validateUsername() {
    const { username } = this.state;
    if (username) {
      const { length } = username;
      if (length > 4) return "success";
      else if (length > 2) return "warning";
      else if (length > 0) return "error";
    }
    return null;
  }

  validatePassword() {
    const { password } = this.state;
    const { length } = password;
    if (this.hasSpecialChar(password)) return "success";
    else if (length === 0) return null;
    else if (length > 7) return "warning";
    else if (length > 0 && length < 7) return "error";
    return null;
  }

  validateEmail() {
    const validator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { email } = this.state;
    const { length } = email;
    if (length === 0) return null;
    else if (validator.test(email)) return "success";
    else if (!validator.test(email)) return "error";
    return null;
  }

  cantSubmit = () => {
    if (
      (this.validateUsername() === "success" ||
        this.validateUsername() === "warning") &&
      (this.validatePassword() === null ||
        this.validatePassword() === "success" ||
        this.validatePassword() === "warning") &&
      (this.validateEmail() === null ||
        this.validateEmail() === "success" ||
        this.validateEmail() === "warning")
    )
      return true;

    return false;
  };

  hasSpecialChar = s => /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(s);

  updateProfile = () => {
    const {
      token,
      id,
      username,
      password,
      email,
      first_name,
      last_name,
      profile_image,
      bio
    } = this.state;

    let payload = new FormData();
    payload.append("profile_image", profile_image);
    payload.append("username", username);
    if (password) payload.append("password", password);
    payload.append("email", email);
    payload.append("first_name", first_name);
    payload.append("last_name", last_name);
    payload.append("bio", bio);
    this.props.updateProfile(id, token, payload);
  };

  render() {
    const canSubmit = !this.cantSubmit();
    const {
      token,
      id,
      username,
      password,
      email,
      first_name,
      last_name,
      profile_image,
      date_joined,
      last_login,
      bio
    } = this.state;
    return !token ? (
      <Redirect to={this.props.history.push("/login")} />
    ) : (
      <Grid className="Profile fadeIn-2">
        <Row>
          <PageHeader className="pageHeader">PROFILE</PageHeader>
        </Row>
        <Row>
          <Col xs={12} className="ActionToolbar" componentClass={ButtonToolbar}>
            <Button
              onClick={() => this.props.history.push("/profile/" + id)}
              className="pull-right"
            >
              Public Profile
            </Button>
          </Col>
        </Row>
        <Row>
          <h2 className="headerBanner">ACCOUNT</h2>
        </Row>
        <Row className="Center borderedRow">
          <Col md={4}>
            <Image
              src={profile_image}
              className="ProfileImages"
              responsive
              rounded
            />
            <ControlLabel className="center">Profile Picture</ControlLabel>
            <FormControl
              style={{ margin: "20px auto" }}
              type="file"
              label="File"
              name="profile_image"
              onChange={this.setImage}
            />
          </Col>
          <Col md={4} xs={12}>
            <h3>
              <i class="fas fa-birthday-cake" />{" "}
              <Moment format="MMM DD, YYYY">{date_joined}</Moment>
            </h3>
          </Col>
          <Col md={4} xs={12}>
            <h3>
              <i class="fas fa-sign-in-alt" />{" "}
              <Moment fromNow>{last_login}</Moment>
            </h3>
          </Col>
        </Row>
        <Row className="borderedRow">
          <Col md={3}>
            <FormGroup validationState={this.validateUsername()}>
              <ControlLabel>Username</ControlLabel>
              <FormControl
                value={username}
                type="text"
                name="username"
                placeholder="Username"
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup validationState={this.validatePassword()}>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={password}
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.onChange}
              />
              <FormControl.Feedback />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup validationState={this.validateEmail()}>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                value={email}
                type="email"
                name="email"
                placeholder="Email"
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col md={2} sm={6}>
            <FormGroup>
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                value={first_name}
                type="text"
                name="first_name"
                placeholder="First Name"
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                value={last_name}
                type="text"
                name="last_name"
                placeholder="Last Name"
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <ControlLabel>Biography</ControlLabel>
              <FormControl
                value={bio}
                componentClass="textarea"
                type="textarea"
                name="bio"
                wrap="hard"
                placeholder="Bio"
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{ textAlign: "center", margin: "20px" }}>
            <Button onClick={this.updateProfile} disabled={canSubmit}>
              Update
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(Profile);
