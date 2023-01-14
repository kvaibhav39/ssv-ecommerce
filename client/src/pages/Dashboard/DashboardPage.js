import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { routes } from "../../constants";
import { getDashboardDetail } from "../../store/slice/dashboardSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const dashboard = useSelector((state) => state.dashboard.dashboard);
  console.log("dashboard", dashboard);

  useEffect(() => {
    if (!dashboard) {
      dispatch(getDashboardDetail());
    } else {
      setIsLoading(false);
    }
  }, [dispatch, dashboard]);

  if (isLoading) {
    return <div />;
  }

  return (
    <>
      <div className="dashboard_body">
        <div className="dashboard_top_column_row">
          <Link
            to={`${routes.users}/page/1`}
            state={{ user_type: "Customer" }}
            style={{ textDecoration: "none" }}
          >
            <div className="dashboard_top_column">
              <div className="dashboard_top_column_main_icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35.012"
                  height="18.235"
                  viewBox="0 0 35.012 18.235"
                >
                  <g id="user" transform="translate(-8 -12.583)">
                    <g
                      id="Group_1111"
                      dataname="Group 1111"
                      transform="translate(8 14.773)"
                    >
                      <circle
                        id="Ellipse_46"
                        dataname="Ellipse 46"
                        cx="2.917"
                        cy="2.917"
                        r="2.917"
                        transform="translate(2.919)"
                        fill="#c11f3b"
                        opacity="0.5"
                      ></circle>
                      <path
                        id="Path_1020"
                        dataname="Path 1020"
                        d="M17.731,17.5A6.115,6.115,0,0,0,15.3,22.386v.365h-6.2A1.1,1.1,0,0,1,8,21.657v-.729a4.009,4.009,0,0,1,4.011-4.011h3.648A4,4,0,0,1,17.731,17.5Z"
                        transform="translate(-8 -9.623)"
                        fill="#c11f3b"
                        opacity="0.5"
                      ></path>
                      <circle
                        id="Ellipse_47"
                        dataname="Ellipse 47"
                        cx="2.917"
                        cy="2.917"
                        r="2.917"
                        transform="translate(26.259)"
                        fill="#c11f3b"
                        opacity="0.5"
                      ></circle>
                      <path
                        id="Path_1021"
                        dataname="Path 1021"
                        d="M29.283,20.929v.729a1.1,1.1,0,0,1-1.094,1.094h-6.2v-.365A6.112,6.112,0,0,0,19.554,17.5a3.978,3.978,0,0,1,2.072-.584h3.648A4.012,4.012,0,0,1,29.283,20.929Z"
                        transform="translate(5.729 -9.625)"
                        fill="#c11f3b"
                        opacity="0.5"
                      ></path>
                    </g>
                    <circle
                      id="Ellipse_48"
                      dataname="Ellipse 48"
                      cx="4"
                      cy="4"
                      r="4"
                      transform="translate(21 12.583)"
                      fill="#c11f3b"
                    ></circle>
                    <path
                      id="Path_1022"
                      dataname="Path 1022"
                      d="M24.369,17.583H16.344a4.015,4.015,0,0,0-4.011,4.011v2.188a1.1,1.1,0,0,0,1.094,1.094H27.286a1.1,1.1,0,0,0,1.094-1.094V21.594A4.015,4.015,0,0,0,24.369,17.583Z"
                      transform="translate(5.149 5.941)"
                      fill="#c11f3b"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="dashboard_top_column_left_content">
                <h2 className="dashboard_top_column_left_count_text">
                  {dashboard.total_customer_count}
                </h2>
                <p className="dashboard_top_column_left_peragraph_text">
                  Customers
                </p>
              </div>
            </div>
          </Link>
          <Link
            to={`${routes.users}/page/1`}
            state={{ user_type: "Broker" }}
            style={{ textDecoration: "none" }}
          >
            <div className="dashboard_top_column">
              <div className="dashboard_top_column_main_icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35.012"
                  height="18.235"
                  viewBox="0 0 35.012 18.235"
                >
                  <g id="user" transform="translate(-8 -12.583)">
                    <g
                      id="Group_1111"
                      dataname="Group 1111"
                      transform="translate(8 14.773)"
                    >
                      <circle
                        id="Ellipse_46"
                        dataname="Ellipse 46"
                        cx="2.917"
                        cy="2.917"
                        r="2.917"
                        transform="translate(2.919)"
                        fill="#c11f3b"
                        opacity="0.5"
                      ></circle>
                      <path
                        id="Path_1020"
                        dataname="Path 1020"
                        d="M17.731,17.5A6.115,6.115,0,0,0,15.3,22.386v.365h-6.2A1.1,1.1,0,0,1,8,21.657v-.729a4.009,4.009,0,0,1,4.011-4.011h3.648A4,4,0,0,1,17.731,17.5Z"
                        transform="translate(-8 -9.623)"
                        fill="#c11f3b"
                        opacity="0.5"
                      ></path>
                      <circle
                        id="Ellipse_47"
                        dataname="Ellipse 47"
                        cx="2.917"
                        cy="2.917"
                        r="2.917"
                        transform="translate(26.259)"
                        fill="#c11f3b"
                        opacity="0.5"
                      ></circle>
                      <path
                        id="Path_1021"
                        dataname="Path 1021"
                        d="M29.283,20.929v.729a1.1,1.1,0,0,1-1.094,1.094h-6.2v-.365A6.112,6.112,0,0,0,19.554,17.5a3.978,3.978,0,0,1,2.072-.584h3.648A4.012,4.012,0,0,1,29.283,20.929Z"
                        transform="translate(5.729 -9.625)"
                        fill="#c11f3b"
                        opacity="0.5"
                      ></path>
                    </g>
                    <circle
                      id="Ellipse_48"
                      dataname="Ellipse 48"
                      cx="4"
                      cy="4"
                      r="4"
                      transform="translate(21 12.583)"
                      fill="#c11f3b"
                    ></circle>
                    <path
                      id="Path_1022"
                      dataname="Path 1022"
                      d="M24.369,17.583H16.344a4.015,4.015,0,0,0-4.011,4.011v2.188a1.1,1.1,0,0,0,1.094,1.094H27.286a1.1,1.1,0,0,0,1.094-1.094V21.594A4.015,4.015,0,0,0,24.369,17.583Z"
                      transform="translate(5.149 5.941)"
                      fill="#c11f3b"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="dashboard_top_column_left_content">
                <h2 className="dashboard_top_column_left_count_text">
                  {dashboard.total_broker_count}
                </h2>
                <p className="dashboard_top_column_left_peragraph_text">
                  Brokers
                </p>
              </div>
            </div>
          </Link>
         
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

