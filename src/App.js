import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import PropTypes from 'prop-types'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
//import JobMap from './views/GoogleMap'
import JobMap from './views/JobMap'
import Login from './components/Login'
import BotNavBar from './components/NavBar'

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

  render() {

    return (
      <Router>
        <div className="App">
          <BotNavBar />
          <div className="routeOverlay">
            <Route exact path="/" component={JobMap}/>
            <Route path="/Location" component={Location}/>
            <Route path="/Login" component={Login}/>
          </div>
        </div>
     </Router>
    )
  }
}
 
export default reduxConnect(mapStateToProps, mapDispatchToProps)(App)
