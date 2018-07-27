import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import PropTypes from 'prop-types'
import {Nav, Navbar, NavItem, NavDropdown, MenuItem , Grid, Row, Col, Button } from 'react-bootstrap'
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import GoogleMap from './views/GoogleMap'
import Login from './components/Login'
import {setcurrentlocation} from './actions'

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {

}

class App extends Component {
  constructor(props) {
    super();
    this.state = {
    };
  }


  static propTypes = {
  }

  static defaultProps = {

  }

  componentDidMount() {
    this.getState()
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps)
  }

  successCallback = (pos) => {
    const {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp} = pos.coords
    window.store.dispatch(setcurrentlocation(accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp))
  }

  errorCallback = () => {
  }

  getState = props => {
    console.log("getState")
  }

  componentWillUnmount() {
  }

  render() {
    navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallback, locationOptions)
    return (
      <Router>
          <div className="App">
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/" className="zoomHover">EverHire</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                <NavItem className="zoomHover">
                  <Link to="/Login">LOGIN</Link>
                </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={GoogleMap}/>
            <Route exact path="/Location" component={Location}/>
            <Route exact path="/Login" component={Login}/>
          </div>
     </Router>
    );
  }
}
 
export default reduxConnect(mapStateToProps, mapDispatchToProps)(App)