import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../store/slice/orderSlice";
import moment from "moment";
import { routes } from "../../constants";
import { getLead } from "../../store/slice/leadSlice";
import Button from "../../component/Common/Button";
import LeadList from "./LeadList";
import Properties from "./Properties";
import Complaints from "./Complaints";
import Feedback from "./Feedback";

const UserDetailPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const params = useParams();
  const { id, page_number } = params;

  useEffect(() => {
    dispatch(getOrderById({ id: id, user_type: state }));
  }, [dispatch, id]);

  const getUserData = useSelector((state) => state.user.userById);

  const [menu, setMenu] = useState("basicInfo");

  return (
    <>
      <div className="project_edit_content">
        <ul className="project_edit_navbar user-detail_navbar">
          <li
            className={`project_edit_items 
          ${menu === "basicInfo" ? "open" : "close"}
          `}
          >
            <Button
              buttonClassName="project_edit_link"
              text="Basic Info"
              onClick={() => setMenu("basicInfo")}
            />
          </li>
          <li
            className={`project_edit_items ${
              menu === "leads" ? "open" : "close"
            }`}
          >
            <Button
              buttonClassName="project_edit_link"
              text="Leads"
              onClick={() => setMenu("leads")}
            />
          </li>
          <li
            className={`project_edit_items ${
              menu === "rewardsHistory" ? "open" : "close"
            }`}
          ></li>
          {getUserData && getUserData[0]?.user_type === "CUSTOMER" && (
            <li
              className={`project_edit_items ${
                menu === "properties" ? "open" : "close"
              }`}
            >
              <Button
                buttonClassName="project_edit_link"
                text="Properties"
                onClick={() => setMenu("properties")}
              />
            </li>
          )}
          <li
            className={`project_edit_items ${
              menu === "complaints" ? "open" : "close"
            }`}
          >
            <Button
              buttonClassName="project_edit_link"
              text="Complaints"
              onClick={() => setMenu("complaints")}
            />
          </li>
          <li
            className={`project_edit_items ${
              menu === "feedback" ? "open" : "close"
            }`}
          >
            <Button
              buttonClassName="project_edit_link"
              text="Feedback"
              onClick={() => setMenu("feedback")}
            />
          </li>
          <div className="user_wallet_status">
            <span className="user_detail-walletbalance">
              Wallet Balance
              <span className="user_detail-balance">
                {getUserData && getUserData[0]?.wallet_balance}
              </span>
            </span>
          </div>
        </ul>
      </div>

      <div
        className="comman_btn_container center_back_btn"
        style={{ marginTop: "3rem" }}
      >
        <Link
          to={`${routes.users}/page/${page_number}`}
          className="comman_btn back_btn"
        >
          Back
        </Link>
      </div>

      {/* <div className="project_edit_main_content">
        <div className="about_page_section"> */}
      {menu === "leads" && <LeadList userId={getUserData[0]?.id} />}
      {/* {menu === "rewardsHistory" && (
        <RewardsHistory userId={getUserData[0]?.id} />
      )} */}
      {menu === "properties" && (
        <Properties
          userId={getUserData[0]?.id}
          userType={getUserData[0]?.user_type}
        />
      )}
      {menu === "complaints" && <Complaints userId={getUserData[0]?.id} />}
      {menu === "feedback" && <Feedback userId={getUserData[0]?.id} />}
      {/* </div>
      </div> */}
    </>
  );
};

export default UserDetailPage;
