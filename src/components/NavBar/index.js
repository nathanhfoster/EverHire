import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import {Link} from "react-router-dom"
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
    }
  }

  static propTypes = { 
  }

  static defaultProps = {
    navItems: [
      {name: 'Map', link: '/', icon: faMap},
      {name: 'Post Job', link: '/jobpost', icon: faClipboard},
      {name: 'Login', link: '/login', icon: faUserCircle},
    ]
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

  renderNavItems = navItems => Object.keys(navItems).map(k => {
    return (
      <Link to={navItems[k].link} className="sheen">
        <FontAwesomeIcon icon={navItems[k].icon} size="2x"/>
        <div className="center navLinkLabel">{navItems[k].name}</div>
      </Link>
    )
  })

  render() {
    const {navItems} = this.props
    return (
      <div className="NavBarContainer">
        {this.renderNavItems(navItems)}
      </div>
    )
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(NavBar)
