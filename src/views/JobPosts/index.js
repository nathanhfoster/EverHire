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
    const {User, address, title, description, lat, lng, phone_number, tags} = this.state
    const {id, token} = User
    const payload = {address, title, description, lat, lng, phone_number, tags, author: id, last_modified_by: id}
    this.props.postJob(token, payload)
  }

  onChange = e => this.setState({[e.target.name]: e.target.value})

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
            <FormControl componentClass="textarea" name="lat" placeholder="Latitude" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl componentClass="textarea" name="lng" placeholder="Longitude" />
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
