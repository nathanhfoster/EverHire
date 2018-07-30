import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shouldPureComponentUpdate from 'react-pure-render/function';

import {greatPlaceStyle, greatPlaceStyleHover} from './my_great_place_with_controllable_hover_styles.js';

export default class MyGreatPlaceWithControllableHover extends Component {
  static propTypes = {
    // use hover from controllable
    hover: PropTypes.bool,
    text: PropTypes.string,
    zIndex: PropTypes.number
  };

  static defaultProps = {}


  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    //console.log("MyGreatPlaceWithControllableHover: ", this.props.hover )
    const style = this.props.hover ? greatPlaceStyleHover : greatPlaceStyle

    return (
       <div className="center zoomFocus" style={style}>
          <div>{this.props.text}</div>
       </div>
    );
  }
}