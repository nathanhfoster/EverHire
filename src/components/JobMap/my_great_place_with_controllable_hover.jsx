import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shouldPureComponentUpdate from 'react-pure-render/function';

import {
  greatPlaceStyle,
  greatPlaceCircleStyle, greatPlaceCircleStyleHover,
  greatPlaceStickStyle, greatPlaceStickStyleHover, greatPlaceStickStyleShadow} from './my_great_place_with_controllable_hover_styles.js';

export default class MyGreatPlaceWithControllableHover extends Component {
  static propTypes = {
    // use hover from controllable
    $hover: PropTypes.bool,
    text: PropTypes.string,
    zIndex: PropTypes.number
  };

  static defaultProps = {}


  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const {text, zIndex} = this.props;

    const style = {
      ...greatPlaceStyle,
      zIndex: this.props.$hover ? 1000 : zIndex
    };

    const circleStyle = this.props.$hover ? greatPlaceCircleStyleHover : greatPlaceCircleStyle;
    const stickStyle = this.props.$hover ? greatPlaceStickStyleHover : greatPlaceStickStyle;

    return (
      <div style={style}>
        <div style={greatPlaceStickStyleShadow} />
          <div style={circleStyle}>
            {text}
          </div>
        <div style={stickStyle} />
    </div>
    );
  }
}