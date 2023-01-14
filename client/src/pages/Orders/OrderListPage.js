import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearOrderState, getOrderList } from "../../store/slice/orderSlice";

import { useForm } from "../../hooks/useForm";

import Loader from "../../component/Common/Loader";
import { routes } from "../../constants";
import OrderItem from "../../component/Orders/OrderItem";
import Input from "../../component/Common/Input";

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { page_number } = params;
  const location = useLocation();
  const { state } = location;

  const [searchField, setSearchField] = useState("");
  const deleteOrder = useSelector((state) => state.order.deleteOrder);

  useEffect(() => {
    dispatch(clearOrderState());
  }, []);
  useEffect(() => {
    dispatch(getOrderList(searchField));
  }, [dispatch, searchField, deleteOrder]);

  const orders = useSelector((state) => state.order.orders);

  console.log("orders", orders);

  const onHandleChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <>
      {/* {loader && <Loader />} */}
      <div className="project_edit_main_content about_page_edit_create_btn">
        <div className="creat_edit_project_btn_row">
          <h2 className="common_heading">Order Management</h2>
          <Input
            inputClassName="common_input"
            type="text"
            placeholder="Search by order description"
            id="searchField"
            name="searchField"
            value={searchField}
            onChange={onHandleChange}
          />
        </div>

        <div className="custom_data_table_content">
          <table className="custom_data_table">
            <thead className="custom_data_table_head">
              <tr>
                <th className="custom_data_table_heading">Order Id</th>
                <th className="custom_data_table_heading">Order Description</th>
                <th className="custom_data_table_heading">Count of Products</th>
                <th className="custom_data_table_heading">Created At</th>
                <th className="custom_data_table_heading">Actions</th>
              </tr>
            </thead>
            <tbody className="custom_data_table_body">
              {orders &&
                orders.map((item, i) => {
                  return <OrderItem key={i} item={item} i={i} />;
                })}
            </tbody>
          </table>
        </div>
        <div className="custom_data_table_footer_btn">
          <Link to={routes.createOrder} className="comman_btn ml-auto">
            Create Order
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderListPage;
