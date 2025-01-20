import React from "react";
import "./Button.css";


export default function ButtonCustom({ children, bgColor, onClick, type }) {
  return (
      <button type={type} onClick={onClick} className={`button-custom-${bgColor} cursor-pointer`} >{children}</button>
  );
}
