import React, { Component } from "react";
import { connect as reduxConnect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import {login} from '../../actions/App'
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

const mapStateToProps = ({User}) => ({
  User
})

const mapDispatchToProps = {
  login
};

class Login extends Component {
  constructor(props) {
    super();

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  handleLogin = () => {
    const {username, password} = this.state
    const {login} = this.props
    login(username, password)
  }

  // handleSignUp = () => {
  //   const path = "/signup";
  //   this.props.history.push(path);
  // };

  onChange = e => this.setState({[e.target.name]: e.target.value})

  render() {
    const {User} = this.props
    return (
      !User.token ?
      <Form className="loginForm" onChange={this.onChange}>
        <Row>
          <Col md={6} smOffset={3} sm={6}>
            <PageHeader style={{ color: "white" }}>Everhire Login</PageHeader>
            <FormGroup controlId="formHorizontalEmail">
              <FormControl name="username" type="username" placeholder="Username" />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6} smOffset={3} sm={6}>
            <FormGroup controlId="formHorizontalPassword">
              <FormControl name="password" type="password" placeholder="Password" />
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
              <Button onClick={this.handleLogin}>Sign in</Button>
            </FormGroup>
          </Col>
          <Col smOffset={3}>
            <FormGroup onClick={() => this.props.history.push("/signup")}>
              <Button type="submit">Sign Up</Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      : <Redirect to="/map" />
    );
  }
}

export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(Login)
);
