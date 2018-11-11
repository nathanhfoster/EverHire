import React, { Component } from "react";
import { connect as reduxConnect } from "react-redux";
import PropTypes from "prop-types";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import JobMap from "./views/JobMap";
import Login from "./components/Login";
import JobPost from "./views/JobPosts";
import Account from "./components/Account";
import SignUp from "./components/SignUp";
import { setWindow } from "./actions/App";
import {getJobs} from './actions/JobPosts'

const mapStateToProps = ({ User }) => ({
  User
});

const mapDispatchToProps = {
  setWindow,
  getJobs
};

class App extends Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = {};
  }

  static propTypes = {
    setWindow: PropTypes.func.isRequired
  };

  static defaultProps = {
    routeItems: [
      { path: "/", component: Login },
      { path: "/signup", component: SignUp},
      { path: "/map", component: JobMap },
      { path: "/jobpost", component: JobPost },
      { path: "/account", component: Account }
    ]
  };

  // componentWillMount() {
  //   this.getState(this.props)
  // }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  componentWillUpdate() {}

  /* render() */

  componentDidMount() {
    this.props.getJobs();
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    this.setState({});
  };

  componentDidUpdate() {}

  componentWillUnmount() {}

  updateWindowDimensions() {
    const { innerHeight, innerWidth } = window;
    const isMobile = innerWidth < 676;
    this.props.setWindow({ innerHeight, innerWidth, isMobile });
    this.setState({ height: innerHeight, width: innerWidth, isMobile });
  }

  renderRouteItems = routeItems =>
    routeItems.map(k => <Route exact path={k.path} component={k.component} />);

  render() {
    const { routeItems } = this.props;
    return (
      <Router>
        <div className="App">
          <div className="routeOverlay">
            <Switch>{this.renderRouteItems(routeItems)}</Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(App);
