import React, { Component } from "react";
import { connect as reduxConnect } from "react-redux";
import { withRouter } from "react-router-dom";
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

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {};

class Login extends Component {
  constructor(props) {
    super();

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  // handleSignUp = () => {
  //   const path = "/signup";
  //   this.props.history.push(path);
  // };

  render() {
    return (
      <Form className="loginForm">
        <Row>
          <Col md={6} smOffset={3} sm={6}>
            <PageHeader style={{ color: "white" }}>Everhire Login</PageHeader>
            <FormGroup controlId="formHorizontalEmail">
              <FormControl type="email" placeholder="Email" />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6} smOffset={3} sm={6}>
            <FormGroup controlId="formHorizontalPassword">
              <FormControl type="password" placeholder="Password" />
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
              <Button type="submit">Sign in</Button>
            </FormGroup>
          </Col>
          <Col smOffset={3}>
            <FormGroup onClick={() => this.props.history.push("/signup")}>
              <Button type="submit">Sign Up</Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(Login)
);
