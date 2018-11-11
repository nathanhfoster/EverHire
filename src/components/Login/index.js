import React, { Component } from "react";
import { connect as reduxConnect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { login } from "../../actions/App";
import "./styles.css";
import {
  Form,
  FormGroup,
  Row,
  Col,
  ControlLabel,
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

class Login extends Component {
  constructor(props) {
    super();

    this.state = {
      username: "",
      password: "",
      rememberMe: false
    };
  }

  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

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

  render() {
    const { username, password } = this.state;
    const { User } = this.props;

    return !User.token ? (
      <Form className="loginForm">
        <Row>
          <Col md={6} smOffset={3} sm={6}>
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
          <Col md={6} smOffset={3} sm={6}>
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
          <Col smOffset={3} sm={6}>
            <FormGroup>
              <Checkbox>Remember me</Checkbox>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col smOffset={3} sm={1}>
            <FormGroup>
              <Button type="submit" onClick={this.handleLogin}>
                Sign in
              </Button>
            </FormGroup>
          </Col>
          <Col smOffset={3}>
            <FormGroup onClick={() => this.props.history.push("/signup")}>
              <Button>Sign Up</Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    ) : (
      <Redirect to="/map" />
    );
  }
}

export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(Login)
);
