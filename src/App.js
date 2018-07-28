import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import PropTypes from 'prop-types'
import {Nav, Navbar, NavItem, NavDropdown, MenuItem , Grid, Row, Col, Button } from 'react-bootstrap'
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import JobMap from './views/GoogleMap'
//import JobMap from './components/JobMap'
import Login from './components/Login'


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

  getState = props => {
  }

  componentWillUnmount() {
  }

  render() {
    
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
            <Route exact path="/" component={JobMap}/>
            <Route exact path="/Location" component={Location}/>
            <Route exact path="/Login" component={Login}/>
          </div>
     </Router>
    );
  }
}
 
export default reduxConnect(mapStateToProps, mapDispatchToProps)(App)