import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getOrderList } from "../../store/slice/orderSlice";

import { useForm } from "../../hooks/useForm";

import Loader from "../../component/Common/Loader";
import { routes } from "../../constants";
import OrderItem from "../../component/Orders/OrderItem";

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { page_number } = params;
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    console.log("jkdhakdahd");
    dispatch(getOrderList());
  }, [dispatch]);

  const initialFValues = {
    mobileNum: "",
    userStatus: "",
    userType: { label: state?.user_type, value: state?.user_type } || "",
  };

  const { values, setValues, handleInputChange } = useForm(
    initialFValues,
    true
  );

  const orders = useSelector((state) => state.order.orders);
  console.log("orders", orders);

  return (
    <>
      {/* {loader && <Loader />} */}
      <div className="project_edit_main_content about_page_edit_create_btn">
        <div className="creat_edit_project_btn_row">
          <Link to={routes.createOrder} className="comman_btn ml-auto">
            Create Order
          </Link>
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
                  return (
                    <OrderItem
                      key={i}
                      item={item}
                      i={i}
                      // onClickHandle={onClickHandle}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderListPage;
