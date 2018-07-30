const K_SIZE = 40
const K_CIRCLE_SIZE = 30
const K_STICK_SIZE = 10
const K_STICK_WIDTH = 3

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
    boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    color: "white",
    backgroundColor: "#2196f3",
    padding: "0",
    minWidth: "26px",
    height: "26px",
    width: "26px",
    borderRadius: "50%",
    border: "1px solid white",
    minHeight: "26px",
    boxSizing: "border-box",
    lineHeight: "70%",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    cursor: 'pointer'
}

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: '5px solid #3f51b5',
  color: 'white',
  backgroundColor: "red",
}

export {greatPlaceStyle, greatPlaceStyleHover, K_SIZE, K_CIRCLE_SIZE, K_STICK_SIZE, K_STICK_WIDTH}
