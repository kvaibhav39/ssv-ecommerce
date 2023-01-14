import moment from "moment";
import React from "react";
import Button from "../Common/Button";

const OrderItem = ({ item, i, onClickHandle }) => {
  return (
    <tr className="custom_data_table_row" key={i}>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        {item.id}
      </td>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        {item.orderDescription}
      </td>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        {item.count_of_product}
      </td>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        {moment(item.created_at).format("MMMM Do YYYY, h:mm:ss a")}
      </td>
      <td className="custom_data_table_item" style={{ textAlign: "center" }}>
        <Button
          buttonClassName="custom_data_table_button"
          onClick={(e) => onClickHandle(item.id, item.user_type)}
          text="Details"
        />
      </td>
    </tr>
  );
};

export default OrderItem;
