import React, { Component } from "react";
import PropTypes from "prop-types";
import shouldPureComponentUpdate from "react-pure-render/function";

import {
  infoBoxStyle,
  greatPlaceStyle,
  greatPlaceCircleStyle,
  greatPlaceCircleStyleHover,
  greatPlaceStickStyle,
  greatPlaceStickStyleHover,
  greatPlaceStickStyleShadow
} from "./my_great_place_with_controllable_hover_styles.js";

class MyGreatPlaceWithControllableHover extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  shouldComponentUpdate = shouldPureComponentUpdate;

  static propTypes = {
    $hover: PropTypes.bool,
    text: PropTypes.string,
    zIndex: PropTypes.number
  };

  static defaultProps = {};

  render() {
    const { text, zIndex, address, phone_number, title } = this.props;
    const style = {
      ...greatPlaceStyle,
      zIndex: this.props.$hover ? 1000 : zIndex
    };

    const circleStyle = this.props.$hover
      ? greatPlaceCircleStyleHover
      : greatPlaceCircleStyle;
    const stickStyle = this.props.$hover
      ? greatPlaceStickStyleHover
      : greatPlaceStickStyle;

    return (
      <div style={style} className="center">
        {!this.props.$hover ? [
              <div style={greatPlaceStickStyleShadow} />,
              <div style={circleStyle}>{text}</div>,
              <div style={stickStyle} />
            ]
          : text !== 'Me' ? [ 
              <div style={infoBoxStyle}>
                {`${title ? title : ""} \n`}
                <div>{`${address ? address : ""}`}</div>
                <div>{`${phone_number ? phone_number : ""}`}</div>
              </div>,
              <div style={greatPlaceStickStyleShadow} />,
              <div style={circleStyle}>{text}</div>,
              <div style={stickStyle} />
            ] : [
              <div style={greatPlaceStickStyleShadow} />,
              <div style={circleStyle}>{text}</div>,
              <div style={stickStyle} />
            ]}
      </div>
    );
  }
}
export default MyGreatPlaceWithControllableHover;
