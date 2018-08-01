import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import {Link } from "react-router-dom"
import './styles.css'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faUserCircle from '@fortawesome/fontawesome-free-solid/faUserCircle'
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt'
import faMap from '@fortawesome/fontawesome-free-solid/faMap'

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
      <div className="center NavBarContainer">
        <Link to="/" className="zoomHover"><FontAwesomeIcon icon={faMap} size="2x"/></Link>
        <Link to="/" className="zoomHover"><FontAwesomeIcon icon={faMapMarkerAlt} size="2x"/></Link>
        <Link to="/Login" className="zoomHover"><FontAwesomeIcon icon={faUserCircle} size="2x"/></Link>
      </div>
    );
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(NavBar)