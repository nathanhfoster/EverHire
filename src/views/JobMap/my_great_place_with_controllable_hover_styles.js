const K_CIRCLE_SIZE = 34
const K_STICK_SIZE = 10
const K_STICK_WIDTH = 3

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE + K_STICK_SIZE,
  left: -K_CIRCLE_SIZE / 2,
  top: -(K_CIRCLE_SIZE + K_STICK_SIZE)
}

const greatPlaceCircleStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE,
  border: "2px solid var(--primaryColor)",
  borderRadius: K_CIRCLE_SIZE,
  color: "var(--primaryColor)",
  backgroundColor: "white",
  textAlign: 'center',
  boxShadow: "0px 1px 5px 0px var(--primaryBoxShadow), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  fontSize: 12,
  fontWeight: 'bold',
  padding: 0,
  cursor: 'pointer',
  boxShadow: '0 0 0 1px white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const userLocation = {
  
}

const greatPlaceCircleStyleHover = {
  ...greatPlaceCircleStyle,
  border: '2px solid var(--secondaryColor)',
  color: 'var(--secondaryColor)'
}

const greatPlaceStickStyleShadow = {
  position: 'absolute',
  left: K_CIRCLE_SIZE / 2 - K_STICK_WIDTH / 2,
  top: K_CIRCLE_SIZE,
  width: K_STICK_WIDTH,
  height: K_STICK_SIZE,
  backgroundColor: '#f44336',
  boxShadow: '0 0 0 1px white'
}


const greatPlaceStickStyle = {
  position: 'absolute',
  left: K_CIRCLE_SIZE / 2 - K_STICK_WIDTH / 2,
  top: K_CIRCLE_SIZE,
  width: K_STICK_WIDTH,
  height: K_STICK_SIZE,
  backgroundColor: 'var(--primaryColor)'
}

const greatPlaceStickStyleHover = {
  ...greatPlaceStickStyle,
  backgroundColor: 'var(--secondaryColor)'
}


export {
  greatPlaceStyle,
  greatPlaceCircleStyle, greatPlaceCircleStyleHover,
  greatPlaceStickStyle, greatPlaceStickStyleHover, greatPlaceStickStyleShadow,
  K_CIRCLE_SIZE, K_STICK_SIZE}