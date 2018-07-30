import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import PropTypes from 'prop-types'
import {Nav, Navbar, NavItem} from 'react-bootstrap'
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
//import JobMap from './views/GoogleMap'
import JobMap from './components/JobMap'
import Login from './components/Login'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faUserCircle from '@fortawesome/fontawesome-free-solid/faUserCircle'
import Logo from './images/everHire-36.png'

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

  componentWillMount() {
    
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
                  <Link to="/" className="zoomHover">Ever<img src={Logo} />Hire</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                <NavItem>
                  <Link to="/Login" divider>LOGIN</Link>
                </NavItem>
                <NavItem>
                  <Link to="/Account"><FontAwesomeIcon icon={faUserCircle} size="lg"/></Link>
                </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={JobMap}/>
            <Route path="/Location" component={Location}/>
            <Route path="/Login" component={Login}/>
          </div>
     </Router>
    );
  }
}
 
export default reduxConnect(mapStateToProps, mapDispatchToProps)(App)
