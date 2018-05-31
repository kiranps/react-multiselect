import React from "react";

const Arrow = ({height, width, color, style, isOpen}) =>
  isOpen ?
    <svg width={width} height={height} style={{boxSizing: "border-box", marginTop: "2px"}} fill={color} viewBox="0 0 24 24">
      <path d="M7,15L12,10L17,15H7Z" />
    </svg>
    :
    <svg width={width} height={height} style={{boxSizing: "border-box", marginTop: "2px"}} fill={color} viewBox="0 0 24 24">
      <path d="M7,10L12,15L17,10H7Z" />
    </svg>

Arrow.defaultProps = {
  height: "20",
  width: "20",
  color: "#000000",
  isOpen: false
}

export default Arrow
