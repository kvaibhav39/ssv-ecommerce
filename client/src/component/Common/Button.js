import React from "react";

export default function Button(props) {
  const { text, onClick, className, buttonClassName, other, type } = props;

  return (
    <div className={className}>
      <button onClick={onClick} className={buttonClassName} type={type}>
        {other && other}
        {text}
      </button>
    </div>
  );
}
