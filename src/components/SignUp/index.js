import React, { PureComponent } from "react";
import { FormControl, ControlLabel, FormGroup, Button } from "react-bootstrap";
import { connect as reduxConnect } from "react-redux";
import { createUser } from "../../actions/User";
import { Redirect } from "react-router-dom";

const mapStateToProps = ({ User }) => ({
  User
});

const mapDispatchToProps = {
  createUser
};

class SignUp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
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

  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password, email } = this.state;
    const { createUser } = this.props;
    createUser(username, password, email);
  };

  render() {
    const { username, password, email } = this.state;
    return this.props.User.token ? (
      <Redirect to="/map" />
    ) : (
      <div className="container">
        <div className="Account">
          <h2 style={{ textAlign: "center", color: "white" }}>
            Create Account
          </h2>
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
                <ControlLabel style={{ color: "white" }}>Email</ControlLabel>
                <FormControl
                  value={email}
                  type="text"
                  placeholder="Email"
                  onChange={this.handleEmail}
                />
                <br />
                <Button type="submit">Create</Button>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(SignUp);
