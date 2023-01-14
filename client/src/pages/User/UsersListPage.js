import React, { useEffect } from "react";
import Select from "react-select";
import "../../css/ProjectForm.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../store/slice/orderSlice";
import Loader from "../../component/Common/Loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../constants";
// import UserItem from "../../component/Orders/OrderItem";
import { searchIcon } from "../../icons";
import { useForm } from "../../hooks/useForm";
import Input from "../../component/Common/Input";
import Button from "../../component/Common/Button";
import Pagination from "../../component/Pagination/Pagination";

const userTypeOptions = [
  { value: "Customer", label: "Customer" },
  { value: "Broker", label: "Broker" },
];

const userStatusOptions = [
  { value: "verified", label: "verified" },
  { value: "unverified", label: "unverified" },
];

const UsersListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { page_number } = params;
  const location = useLocation();
  const { state } = location;

  const initialFValues = {
    mobileNum: "",
    userStatus: "",
    userType: { label: state?.user_type, value: state?.user_type } || "",
  };

  const { values, setValues, handleInputChange } = useForm(
    initialFValues,
    true
  );

  const userList = useSelector((state) => state.order.orders?.data);
  const filteredusers = userList?.filter(
    (item, i) => item.user_type !== "ADMIN"
  );
  const totalCount = useSelector((state) => state.user.users?.totalCount);
  const loader = useSelector((state) => state.user.loader);

  const mobileUserHandler = (e) => {
    page_number !== 1 && navigate(`${routes.users}/page/1`);
    setValues({ ...values, mobileNum: e.target.value });
    let page_num;
    if (page_number === 1) {
      page_num = 0;
    } else {
      page_num = (page_number - 1) * 2;
    }
    dispatch(
      getOrderList({
        userType: values.userType.value,
        mobileNum: e.target.value,
        userStatus: values.userStatus.value,
        start: page_num,
        limit: 10,
      })
    );
  };
  useEffect(() => {
    if (+page_number === 1)
      dispatch(
        getOrderList({
          userType: values.userType.value,
          mobileNum: values.mobileNum,
          userStatus: values.userStatus.value,
        })
      );
  }, [
    dispatch,
    values.userType,
    values.userStatus,
    values.mobileNum,
    page_number,
  ]);

  const onClickHandle = (id, userType) => {
    navigate(`${routes.users}/${id}/${page_number}`, { state: userType });
  };

  const onPageChange = (page_number) => {
    dispatch(
      getOrderList({
        start: page_number,
        userType: values.userType.value,
        mobileNum: values.mobileNum,
        userStatus: values.userStatus.value,
        limit: 10,
      })
    );
  };

  return (
    <>
      {loader && <Loader />}
      <div className="project_edit_main_content">
        <div className="user_data_search_select_box_row">
          <div className="user_data_search">
            <Input
              inputClassName="user_data_search_input"
              type="tel"
              placeholder="Search by Mobile-number"
              id="mobileNum"
              name="mobileNum"
              maxLength={10}
              value={values.mobileNum}
              onChange={mobileUserHandler}
            />
            <Button buttonClassName="user_data_search_btn" text={searchIcon} />
          </div>
          <div className="user_data_search">
            <Select
              value={values.userType}
              onChange={(e) => handleInputChange(e, "userType")}
              className="basic-multi-select"
              classNamePrefix="select"
              name="userType"
              options={userTypeOptions}
            />
          </div>
          <div className="user_data_select">
            <Select
              value={values.status}
              onChange={(e) => handleInputChange(e, "userStatus")}
              className="basic-multi-select"
              classNamePrefix="select"
              name="userStatus"
              options={userStatusOptions}
            />
          </div>
        </div>
        <div className="custom_data_table_content">
          <table className="custom_data_table">
            <thead className="custom_data_table_head">
              <tr>
                <th className="custom_data_table_heading">First Name</th>
                <th className="custom_data_table_heading">Last Name</th>
                <th className="custom_data_table_heading">User Type</th>
                <th className="custom_data_table_heading">Phone Number</th>
                <th className="custom_data_table_heading">Address</th>
                <th className="custom_data_table_heading">Created At</th>
                <th className="custom_data_table_heading"></th>
              </tr>
            </thead>
            <tbody className="custom_data_table_body">
              {filteredusers &&
                filteredusers.map((item, i) => {
                  // return (
                  //   <UserItem
                  //     key={i}
                  //     item={item}
                  //     i={i}
                  //     onClickHandle={onClickHandle}
                  //   />
                  // );
                })}
            </tbody>
          </table>
        </div>
        {<Pagination totalRecords={totalCount} onPageChange={onPageChange} />}
      </div>
    </>
  );
};

export default UsersListPage;
