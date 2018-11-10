import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect as reduxConnect } from 'react-redux'
import './styles.css'
import './stylesM.css'
import {Grid, Row, Col, Form, FormGroup, FormControl, DropdownButton, MenuItem, Button, ControlLabel} from 'react-bootstrap'
import {postJob} from '../../actions/JobPosts'

const mapStateToProps = ({User}) => ({
  User
})

const mapDispatchToProps = {
  postJob
}

class JobPost extends Component {
  constructor(props) {
    super(props)
    //this.onChange = this.onChange.bind(this)

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

  /* render() */

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps)
  }

  getState = props => {
    const {User} = props

    this.setState({User})
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  postJob = e => {
    e.preventDefault()
    //Author and last_modified_by
    const {User, address, title, description, latitude, longitude, phone_number, tags} = this.state
    const token = 'c022a7316c83e3013371ef555fa9d54684be37cb'
    const payload = {address, title, description, latitude, longitude, phone_number, tags, author: User.id, last_modified_by: User.id}
    console.log(payload)
    this.props.postJob(token, payload)
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})

  render() {
    console.log(this.state)
    return (
      <Grid className="JobPost">
        <Form onChange={this.onChange}>
          <FormGroup controlId="formHorizontalPassword">
            <ControlLabel>Category</ControlLabel>
            <FormControl componentClass="select" mulitple>
              <option value="select">Food Delivery</option>
              <option value="select">Transportation</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <FormControl type="text" name="title" placeholder="Title" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl type="text" name="date" placeholder="Date/Time" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl componentClass="textarea" name="description" placeholder="Description" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl type="text" name="address" placeholder="Address" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl type="file" label="Image"/>
          </FormGroup>

          <Button>Post</Button>
        </Form>
      </Grid>
    )
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(JobPost)
