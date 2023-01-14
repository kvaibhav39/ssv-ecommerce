import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routes } from "../../constants";
import { editIcon } from "../../icons";
import { getCustomerPropertyByCustomerId } from "../../store/slice/customerPropertySlice";
// import { getUserById } from "../../store/slice/orderSlice";

const Properties = ({ userId, userType }) => {
  const dispatch = useDispatch();

  const userProperty = useSelector((state) => state.user.userById);

  if (!userProperty[0].project_data) {
    return <h2 className="user_detail-nodata">No Data Found !</h2>;
  }

  return (
    <div className="project_edit_main_content">
      <div className="custom_data_table_content">
        <table className="custom_data_table">
          <thead className="custom_data_table_head">
            <tr>
              <th className="custom_data_table_heading">Project Name</th>
              <th className="custom_data_table_heading">Tower Name</th>
              <th className="custom_data_table_heading">Property Number</th>
              <th className="custom_data_table_heading"></th>
            </tr>
          </thead>
          <tbody className="custom_data_table_body">
            {userType === "CUSTOMER" &&
              userProperty?.map((item, i) => {
                return (
                  <tr className="custom_data_table_row" key={i}>
                    <td className="custom_data_table_item table_item">
                      {item?.project_name}
                    </td>
                    <td className="custom_data_table_item table_item">
                      {item?.tower_name}
                    </td>
                    <td className="custom_data_table_item table_item">
                      {item?.property_number}
                    </td>
                    <td className="custom_data_table_item table_item">
                      <div className="custom_data_table_view_edit_btn_item_row">
                        <Link
                          to={`${routes.customerProperty}/edit/${item?.customer_property_id}/1`}
                          className="custom_data_table_view_edit_item_btn "
                        >
                          {editIcon}
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Properties;
