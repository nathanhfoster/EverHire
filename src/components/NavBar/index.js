import React, { PureComponent } from "react";
import { connect as reduxConnect } from "react-redux";
import "./styles.css";
import "./stylesM.css";
import { Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withAlert } from 'react-alert'
import {Logout} from '../../actions/App'

const mapStateToProps = ({User}) => ({
  User
})

const mapDispatchToProps = {
  Logout
}

class NavBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  componentWillMount() {
    this.getState(this.props);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    const { User } = props;
    this.setState({
      User
    });
  };

  Logout = () => {
    this.props.Logout()
    this.props.alert.show([
      <div>GOODBYE</div>
    ])
  }

  render() {
    const {User} = this.state
    return (
      <Navbar inverse collapseOnSelect className="NavBar">
        <Navbar.Header>
          <Navbar.Brand>
            <Nav>
              <LinkContainer to="/">
                <NavItem eventKey={1}>EverHire</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/jobpost">
              <NavItem eventKey={2}>Create Job</NavItem>
            </LinkContainer>
            <NavDropdown eventKey={3} title={<i className="fas fa-user"> Account</i>}>
              <LinkContainer to="/account"><NavItem eventKey={3}>Profile</NavItem></LinkContainer> 
              {User.token ? <NavItem onClick={this.Logout}>Logout</NavItem> : null}
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default withAlert(reduxConnect(mapStateToProps, mapDispatchToProps)(NavBar))
