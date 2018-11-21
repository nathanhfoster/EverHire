import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col, Well, Image} from 'react-bootstrap'
import { connect as reduxConnect } from 'react-redux'
import './styles.css'
import './stylesM.css'
import {getUser} from '../../../actions/App'
import {withRouter} from 'react-router-dom'
import Moment from 'react-moment'

const mapStateToProps = ({UserPublicProfile}) => ({
  UserPublicProfile
})

const mapDispatchToProps = {
  getUser
}

class PublicProfile extends Component {
  constructor(props) {
    super(props)
 
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

  componentWillUpdate() {
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.getUser(id)
  }
  
  componentWillReceiveProps(nextProps) {
    this.getState(nextProps)
  }

  getState = props => {
    const {UserPublicProfile} = props
    this.setState({UserPublicProfile})
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  renderRoles = roles => Object.keys(roles).map(k => {
    if(roles[k]) {
      if(k === 'is_raid_leader') return [<span>Raid Leader</span>, <span>|</span>]
      if(k === 'is_banker') return [<span>Banker</span>, <span>|</span>]
      if(k === 'is_recruiter') return [<span>Recruiter</span>, <span>|</span>]
      if(k === 'is_class_lead') return [<span>Class Lead</span>, <span>|</span>]
      if(k === 'is_crafter_lead') return [<span>Crafter Lead</span>, <span>|</span>]
    }
    return null
  })

  render() {
    const {UserPublicProfile} = this.state
    const {is_leader, is_council, is_general_officer, is_officer, is_senior_member, is_junior_member, is_recruit,
    is_raid_leader, is_banker, is_recruiter, is_class_lead, is_crafter_lead} = UserPublicProfile ? UserPublicProfile : {}
    const UserStatus = {is_leader, is_council, is_general_officer, is_officer, is_senior_member, is_junior_member, is_recruit}
    const UserRoles = {is_raid_leader, is_banker, is_recruiter, is_class_lead, is_crafter_lead}
    return (
      UserPublicProfile ? 
      <Grid className="PublicProfile Container fadeIn-2">
        <Row className="Center">
          <Col md={4} xs={12} className="Center"><Image title="Profile Image" src={UserPublicProfile.profile_image} className="ProfileImages" responsive rounded/></Col>
          <Col md={5} xs={12}>
            <h1 title="UserPublicProfile Name">{UserPublicProfile.username.toUpperCase()}</h1>
            <span title="First and Last Name" className="help">{UserPublicProfile.first_name} {UserPublicProfile.last_name}</span>
          </Col>
          <Col md={3} xs={12} className="Center">
            <h3 title="Date Joined"><i class="fas fa-birthday-cake"/> <Moment format="MMM DD, YYYY">{UserPublicProfile.date_joined}</Moment></h3>
            <h3 title="Last Login"><i class="fas fa-sign-in-alt"/> <Moment fromNow>{UserPublicProfile.last_login}</Moment></h3>
          </Col>
        </Row>
        <Row className="Center">
          <Col xs={12}><Well className="userBio" bsSize="large">{UserPublicProfile.bio ? UserPublicProfile.bio : 'No biography given.'}</Well></Col>
        </Row>
      </Grid> : null 
    )
  }
}
export default withRouter(reduxConnect(mapStateToProps, mapDispatchToProps)(PublicProfile))
