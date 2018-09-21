import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import PropTypes from 'prop-types'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import JobMap from './views/JobMap'
import Login from './components/Login'
import BotNavBar from './components/NavBar'
import JobPost from './views/JobPosts'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  static propTypes = {
  }

  static defaultProps = {
    routeItems: [
      {path: '/', component: JobMap},
      {path: '/login', component: Login},
      {path: '/jobpost', component: JobPost}
    ]
  }

  componentWillMount() {
    this.getState(this.props)
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  componentWillUpdate() {
  }

  /* render() */

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps)
  }

  getState = props => {
    this.setState({
      })
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  renderRouteItems = routeItems => routeItems.map(k => (<Route exact path={k.path} component={k.component}/>))

  render() {
    const {routeItems} = this.props
    return (
      <Router>
        <div className="App">
          <BotNavBar />
          <div className="routeOverlay">
          <Switch>
            {this.renderRouteItems(routeItems)}
          </Switch>
          </div>
        </div>
     </Router>
    )
  }
}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(App)
