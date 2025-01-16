import React from "react";
import "./Button.css";

export default function ButtonCustom({ children, bgColor, onClick }) {
  return (
    <>
      <button type="button" onClick={onClick} className={`button-custom-${bgColor}`}>{children}</button>
    </>
  );
}
