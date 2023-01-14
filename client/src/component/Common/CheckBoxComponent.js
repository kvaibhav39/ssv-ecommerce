import React from "react";
const CheckboxComponent = ({ list, onChange }) => {
  return (
    <div>
      {list?.map((item, index) => (
        <div key={item.id}>
          <input
            style={{ fontStyle: "normal" }}
            type="checkbox"
            id={item.productName}
            value={item.productName}
            checked={item.isAdded}
            onChange={(e) => onChange(e, item, index)}
          />
          <label htmlFor={item.productName}>{item.productName}</label>
        </div>
      ))}
    </div>
  );
};
export default CheckboxComponent;
