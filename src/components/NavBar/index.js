import React, { PureComponent } from "react";
import { connect as reduxConnect } from "react-redux";
import "./styles.css";
import "./stylesM.css";
import { Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import { withAlert } from "react-alert";
import { Logout } from "../../actions/App";

const mapStateToProps = ({ User }) => ({
  User
});

const mapDispatchToProps = {
  Logout
};

class NavBar extends PureComponent {
  componentWillMount() {
    this.getState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    const { User } = props;
    this.setState({
      User
    });
  };

  Logout = () => {
    this.props.Logout();
    this.props.alert.show([<div>GOODBYE</div>]);
    this.props.history.push("/");
  };

  render() {
    const { User } = this.state;
    return (
      <Navbar inverse collapseOnSelect className="NavBar">
        <Navbar.Header>
          <Navbar.Brand>
            <Nav>
              <LinkContainer to="/">
                <NavItem eventKey={1}>
                  <i className="far fa-map" /> EverHire
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/jobpost">
              <NavItem eventKey={2}>
                <i class="far fa-clipboard" /> Create Job
              </NavItem>
            </LinkContainer>
            <NavDropdown
              eventKey={3}
              title={[<i class="far fa-user" />, <span> Account</span>]}
            >
              <LinkContainer to="/profile">
                <NavItem eventKey={3}>
                  <i class="fas fa-user-circle" /> Profile
                </NavItem>
              </LinkContainer>
              {User.token ? (
                <NavItem onClick={this.Logout}>
                  <i class="fas fa-sign-out-alt" /> Logout
                </NavItem>
              ) : null}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default withRouter(
  withAlert(reduxConnect(mapStateToProps, mapDispatchToProps)(NavBar))
);
