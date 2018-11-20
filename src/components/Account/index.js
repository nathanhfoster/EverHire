import React, { Component } from "react";
import { FormControl, ControlLabel, FormGroup, Button } from "react-bootstrap";
import { connect as reduxConnect } from "react-redux";
import { login } from "../../actions/App";
import {Redirect} from 'react-router-dom'

const mapStateToProps = ({ User }) => ({
  User
});

const mapDispatchToProps = {
  login
};

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handlePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const { login } = this.props;
    login(username, password);
  };

  render() {
    const { username, password } = this.state;
    return ( !this.props.User.token ? <Redirect to="/"/>
      :<div className="container">
        <div className="Account">
          <h2 style={{ textAlign: "center", color: "white" }}>Account</h2>
          <div className="container">
            <form style={{ marginTop: "10px" }} onSubmit={this.handleSubmit}>
              <FormGroup
                style={{ width: "50%", margin: "auto" }}
                submit={this.handleSubmit}
              >
                <ControlLabel style={{ color: "white" }}>Username</ControlLabel>
                <FormControl
                  value={username}
                  type="text"
                  placeholder="Username"
                  onChange={this.handleUsername}
                />
                <br />
                <ControlLabel style={{ color: "white" }}>Password</ControlLabel>
                <FormControl
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={this.handlePassword}
                />
                <br />
                <Button type="submit">Save</Button>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(Account);
