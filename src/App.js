import React, { Component } from "react";
import { connect as reduxConnect } from "react-redux";
import { withAlert } from "react-alert";
import PropTypes from "prop-types";
import "./App.css";
import { withRouter, Route, Switch } from "react-router-dom";
import JobMap from "./views/JobMap";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import JobDetail from "./views/JobDetail";
import JobPost from "./views/JobPosts";
import Account from "./components/Account";
import SignUp from "./components/SignUp";
import { clearApiResponse, setApiResponse, setWindow } from "./actions/App";
import { getJobs } from "./actions/JobPosts";

const mapStateToProps = ({ ApiResponse, Window, User }) => ({
  ApiResponse,
  Window,
  User
});

const mapDispatchToProps = {
  clearApiResponse,
  setApiResponse,
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
      { path: "/signup", component: SignUp },
      { path: "/map", component: JobMap },
      { path: "/jobdetails/:id", component: JobDetail },
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
    const { ApiResponse, Window, User, location } = props;
    if (ApiResponse) this.alertApiResponse(ApiResponse);
    this.setState({});
  };

  componentDidUpdate() {}

  componentWillUnmount() {}

  alertApiResponse = ApiResponse => {
    const { data, status, statusText, headers, config, request } = ApiResponse;
    const { alert } = this.props;

    if (status === 200 || status === 201) alert.success([<div>Success</div>]);
    if (status === 400 || status === 401)
      alert.error([<div>Sorry something went wrong, please try again</div>]);

    this.props.clearApiResponse();
  };

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
      <div className="App">
        <NavBar />
        <div className="routeOverlay">
          <Switch>{this.renderRouteItems(routeItems)}</Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(
  withAlert(reduxConnect(mapStateToProps, mapDispatchToProps)(App))
);
