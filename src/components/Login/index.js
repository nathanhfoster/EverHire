import React, { Component } from "react";
import { connect as reduxConnect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
<<<<<<< HEAD
import { login } from "../../actions/App";
=======
import {login} from '../../actions/App'
>>>>>>> origin/master
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

<<<<<<< HEAD
const mapStateToProps = ({ User }) => ({
  User
});
=======
const mapStateToProps = ({User}) => ({
  User
})
>>>>>>> origin/master

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

<<<<<<< HEAD
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
=======
  handleLogin = () => {
    const {username, password} = this.state
    const {login} = this.props
    login(username, password)
  }

  // handleSignUp = () => {
  //   const path = "/signup";
  //   this.props.history.push(path);
  // };
>>>>>>> origin/master

  onChange = e => this.setState({[e.target.name]: e.target.value})

  render() {
<<<<<<< HEAD
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
=======
    const {User} = this.props
    return (
      !User.token ?
      <Form className="loginForm" onChange={this.onChange}>
        <Row>
          <Col md={6} smOffset={3} sm={6}>
            <PageHeader style={{ color: "white" }}>Everhire Login</PageHeader>
            <FormGroup controlId="formHorizontalEmail">
              <FormControl name="username" type="username" placeholder="Username" />
>>>>>>> origin/master
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6} smOffset={3} sm={6}>
            <FormGroup controlId="formHorizontalPassword">
<<<<<<< HEAD
              <FormControl
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handlePassword}
              />
=======
              <FormControl name="password" type="password" placeholder="Password" />
>>>>>>> origin/master
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
<<<<<<< HEAD
              <Button type="submit" onClick={this.handleLogin}>
                Sign in
              </Button>
=======
              <Button onClick={this.handleLogin}>Sign in</Button>
>>>>>>> origin/master
            </FormGroup>
          </Col>
          <Col smOffset={3}>
            <FormGroup onClick={() => this.props.history.push("/signup")}>
              <Button>Sign Up</Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
<<<<<<< HEAD
    ) : (
      <Redirect to="/map" />
=======
      : <Redirect to="/map" />
>>>>>>> origin/master
    );
  }
}

export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(Login)
);
