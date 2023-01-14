import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintDetailByUserId } from "../../store/slice/complaintSlice";

const Feedback = ({ userId }) => {
  const dispatch = useDispatch();

  const userFeedback = useSelector(
    (state) => state.complaint.complaintDetailUserId
  );

  useEffect(() => {
    dispatch(
      getComplaintDetailByUserId({ userId: userId, reqType: "suggestion" })
    );
  }, []);

  if (userFeedback?.length === 0) {
    return <h2 className="user_detail-nodata">No Data Found !</h2>;
  }

  return (
    <div className="project_edit_main_content">
      <div className="custom_data_table_content">
        <table className="custom_data_table">
          <thead className="custom_data_table_head">
            <tr>
              <th className="custom_data_table_heading">Subject</th>
              <th className="custom_data_table_heading">Phone Number</th>
              <th className="custom_data_table_heading">Project Name</th>
              <th className="custom_data_table_heading">Tower Name</th>
              <th className="custom_data_table_heading">Property Number</th>
              <th className="custom_data_table_heading">Status</th>
            </tr>
          </thead>
          <tbody className="custom_data_table_body">
            {userFeedback &&
              userFeedback.map((item, i) => {
                return (
                  <tr className="custom_data_table_row" key={i}>
                    <td className="custom_data_table_item table_item">
                      {item?.subject}
                    </td>
                    <td className="custom_data_table_item table_item">
                      {item?.phone_number}
                    </td>
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
                      {item?.status}
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

export default Feedback;
