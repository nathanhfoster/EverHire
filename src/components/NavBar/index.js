import React, { Component } from "react";
import { connect as reduxConnect } from "react-redux";
import PropTypes from "prop-types";
import "./styles.css";
import "./stylesM.css";
import { Navbar, Nav, NavItem, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {};

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  componentWillMount() {
    this.getState(this.props);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    const { User } = props;
    this.setState({
      User
    });
  };

  componentWillUpdate() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <Navbar inverse collapseOnSelect className="NavBar">
        <Navbar.Header>
          <Navbar.Brand>
            <Nav>
              <LinkContainer to="/">
                <NavItem eventKey={1}>EverHire</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/jobpost">
              <NavItem eventKey={2}>Create Job</NavItem>
            </LinkContainer>
            <LinkContainer to="/account">
              <NavItem eventKey={3}>Account</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(NavBar);
