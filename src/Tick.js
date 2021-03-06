import React from "react";

const style = {
  display: "inline-block",
  verticalAlign: "top",
  padding: "6px 6px 0 0",
  float: "right",
  color: "#adadad",
}

const Tick = ({height, width, color}) =>
  <svg width={width} height={height} style={style} fill={color} viewBox="0 0 24 24">
    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
  </svg>

Tick.defaultProps = {
  color: "#adadad"
}

export default Tick
