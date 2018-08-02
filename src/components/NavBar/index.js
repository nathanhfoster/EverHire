import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import {Link } from "react-router-dom"
import './styles.css'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faMap from '@fortawesome/fontawesome-free-solid/faMap'
import faClipboard from '@fortawesome/fontawesome-free-solid/faClipboard'
import faUserCircle from '@fortawesome/fontawesome-free-solid/faUserCircle'

const mapStateToProps = () => ({
})

const mapDispatchToProps = {
}

class NavBar extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
    };
  }

  static propTypes = { 
  }

  static defaultProps = {
  }
  
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  getState = props => {
    this.setState({
      });
  }

  componentWillMount() {
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }
  
  componentWillUnmount() {
  }

  render() {
    return (
      <div className="NavBarContainer">
        <Link to="/" className="zoomHover"><FontAwesomeIcon icon={faMap} size="2x"/> <span className="center navLinkLabel">Map</span></Link>
        <Link to="/" className="zoomHover"><FontAwesomeIcon icon={faClipboard} size="2x"/><span className="center navLinkLabel">Post Job</span></Link>
        <Link to="/Login" className="zoomHover"><FontAwesomeIcon icon={faUserCircle} size="2x"/><span className="center navLinkLabel">Profile</span></Link>
      </div>
    );
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(NavBar)