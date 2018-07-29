const K_SIZE = 40

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
    transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    color: "white",
    backgroundColor: "#2196f3",
    padding: "0",
    minWidth: "0",
    height: "13px",
    width: "13px",
    borderRadius: "50%",
    border: "0",
    minHeight: "36px",
    boxSizing: "border-box",
    lineHeight: "1.4em",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    cursor: 'pointer'
}

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: '5px solid #3f51b5',
  color: 'white'
}

export {greatPlaceStyle, greatPlaceStyleHover, K_SIZE}
