import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routes } from "../../constants";
import { editIcon } from "../../icons";
import { getLeadByUserId } from "../../store/slice/leadSlice";

const LeadList = ({ userId }) => {
  const dispatch = useDispatch();

  const userLead = useSelector((state) => state.lead.leadUserId);

  useEffect(() => {
    dispatch(getLeadByUserId(userId));
  }, []);

  if (userLead?.length === 0) {
    return <h2 className="user_detail-nodata">No Data Found !</h2>;
  }

  return (
    <div className="project_edit_main_content">
      <div className="custom_data_table_content">
        <table className="custom_data_table">
          <thead className="custom_data_table_head">
            <tr>
              <th className="custom_data_table_heading">Name</th>
              <th className="custom_data_table_heading">Phone Number</th>
              <th className="custom_data_table_heading">Project Name</th>
              <th className="custom_data_table_heading">Remarks</th>
              <th className="custom_data_table_heading">Status</th>
              <th className="custom_data_table_heading"></th>
            </tr>
          </thead>
          <tbody className="custom_data_table_body">
            {userLead &&
              userLead.map((item, i) => {
                return (
                  <tr className="custom_data_table_row" key={i}>
                    <td className="custom_data_table_item table_item">
                      {item?.first_name} {item?.last_name}
                    </td>
                    <td className="custom_data_table_item table_item">
                      {item?.phone_number}
                    </td>
                    <td className="custom_data_table_item table_item">
                      {item?.project_name}
                    </td>
                    <td className="custom_data_table_item table_item">
                      {item?.remarks}
                    </td>
                    <td className="custom_data_table_item table_item">
                      {item?.status}
                    </td>
                    <td className="custom_data_table_item table_item">
                      <div className="custom_data_table_view_edit_btn_item_row">
                        <Link
                          to={`${routes.leads}/edit/${item.id}/1`}
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

export default LeadList;
