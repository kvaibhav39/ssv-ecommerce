import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteIcon, editIcon, removeIcon } from "../../icons";
import { deleteOrderById } from "../../store/slice/orderSlice";
import Button from "../Common/Button";

const OrderItem = ({ item, i, onClickHandle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEditHandler = (id) => {
    navigate(`/orders/update/${id}`);
  };

  const onDeleteHandler = (id) => {
    dispatch(deleteOrderById({ orderId: id, navigate }));
  };
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
        <div className="custom_data_table_icon_button_row">
          <Button
            buttonClassName="custom_data_table_icon_button"
            onClick={(e) => onEditHandler(item.id)}
            text={editIcon}
          />
          <Button
            buttonClassName="custom_data_table_icon_button"
            onClick={(e) => onDeleteHandler(item.id)}
            text={deleteIcon}
          />
        </div>
      </td>
    </tr>
  );
};

export default OrderItem;
