import React, { PureComponent } from "react";
import { connect as reduxConnect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { login } from "../../actions/App";
import {
  Grid,
  Form,
  FormGroup,
  Row,
  Col,
  FormControl,
  Checkbox,
  Button,
  PageHeader
} from "react-bootstrap";

const mapStateToProps = ({ User }) => ({
  User
});

const mapDispatchToProps = {
  login
};

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      rememberMe: false
    };
  }

  handleUserName = e => {
    this.setState({
      username: e.target.value
    });
  };

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleLogin = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { login } = this.props;
    login(username, password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { username, password } = this.state;
    const { User } = this.props;

    return !User.token ? (
      <Grid className="loginForm">
        <Row>
          <Col xs={12}>
            <PageHeader style={{ color: "white" }}>Everhire Login</PageHeader>
            <FormGroup>
              <FormControl
                value={username}
                type="username"
                placeholder="Username"
                onChange={this.handleUserName}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <FormGroup controlId="formHorizontalPassword">
              <FormControl
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handlePassword}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <FormGroup>
              <Checkbox><span style={{color: 'white'}}>Remember me</span></Checkbox>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={1} xs={3}>
            <FormGroup>
              <Button onClick={this.handleLogin}>Sign in</Button>
            </FormGroup>
          </Col>
          <Col md={1} xs={3}>
            <FormGroup>
              <Button onClick={() => this.props.history.push("/signup")}>
                Sign Up
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    ) : (
      <Redirect to="/map" />
    );
  }
}

export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(Login)
);
