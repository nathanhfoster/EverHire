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
    const payload = {address, title, description, latitude, longitude, phone_number, tags, author: 1, last_modified_by: 1}
    console.log(payload)
    this.props.postJob(token, payload)
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})

  // address:115 Who Cares St
  // title:First Job
  // description:DESCRIPTION OF FIRST JOB
  // latitude:101.123
  // longitude:150.123
  // phone_number:209-123-4563
  // author:1
  // last_modified_by:1
  // tags:Job

  render() {
    return (
      <Grid className="JobPost">
        <Form onChange={this.onChange}>
          <FormGroup controlId="formHorizontalPassword">
            <ControlLabel>Category</ControlLabel>
            <FormControl componentClass="select" name="tags" mulitple>
              <option value="Food Delivery">Food Delivery</option>
              <option value="Transportation">Transportation</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <FormControl type="text" name="title" placeholder="Title" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl componentClass="textarea" name="description" placeholder="Description" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl componentClass="textarea" name="latitude" placeholder="Latitude" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl componentClass="textarea" name="longitude" placeholder="Longitude" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl componentClass="textarea" name="phone_number" placeholder="PhoneNumber" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl componentClass="textarea" name="tags" placeholder="Tags" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl type="text" name="address" placeholder="Address" />
          </FormGroup>

          <Button onClick={this.postJob}>Post</Button>
        </Form>
      </Grid>
    )
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(JobPost)
