import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import './styles.css'

const mapStateToProps = () => ({
})

const mapDispatchToProps = {
}

class Template extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
    };
  }

  static propTypes = { 
  }

  static defaultProps = {
  }
  
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  getState = props => {
    this.setState({
      });
  }

  componentWillMount() {
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }
  componentWillUnmount() {
  }

  render() {
    return (
      <div className="TemplateContainer">
        Template
      </div>
    );
  }
}
export default reduxConnect(mapStateToProps, mapDispatchToProps)(Template)