import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect as reduxConnect } from 'react-redux'
import './styles.css'
import './stylesM.css'
import {Grid, Row, Col, Form, FormGroup, FormControl, DropdownButton, MenuItem, Button, ControlLabel} from 'react-bootstrap'

const mapStateToProps = ({}) => ({
})

const mapDispatchToProps = {
}

class JobPost extends Component {
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
      <Grid className="JobPost">
        <Form>
          <FormGroup controlId="formHorizontalPassword">
            <ControlLabel>Category</ControlLabel>
            <FormControl componentClass="select" mulitple>
              <option value="select">Food Delivery</option>
              <option value="select">Transportation</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <FormControl type="text" placeholder="Title" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl type="text" placeholder="Date/Time" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl componentClass="textarea" placeholder="Description" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl type="text" placeholder="Address" />
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <FormControl type="file" label="Image"/>
          </FormGroup>

          <FormGroup>
            <Col>
              <Button type="submit">Post</Button>
            </Col>
          </FormGroup>
        </Form>
      </Grid>
    )
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(JobPost)
