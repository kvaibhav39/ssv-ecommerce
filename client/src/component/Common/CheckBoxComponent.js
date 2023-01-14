import React from "react";
const CheckboxComponent = ({ list, onChange }) => {
  return (
    <div className="create-order-checkbox-row">
      {list?.map((item, index) => (
        <div key={item.id} className="create-order-checkbox-col">
          <input
            style={{ fontStyle: "normal" }}
            type="checkbox"
            id={item.productName}
            value={item.productName}
            checked={item.isAdded}
            onChange={(e) => onChange(e, item, index)}
          />
          <label htmlFor={item.productName}>
            <p>{item.productName}</p>
            <span>{item.productDescription}</span>
          </label>
        </div>
      ))}
    </div>
  );
};
export default CheckboxComponent;
