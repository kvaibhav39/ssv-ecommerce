import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Loader from "../../component/Common/Loader";
import { routes } from "../../constants";
import { useForm } from "../../hooks/useForm";
import {
  createOrderDetail,
  updateOrderDetail,
  getOrderById,
  getProductsList,
} from "../../store/slice/orderSlice";
import Input from "../../component/Common/Input";
// import { addIcon, editIcon, removeIcon } from "../../icons";
import Button from "../../component/Common/Button";
import CheckboxComponent from "../../component/Common/CheckBoxComponent";

export const OrderUpdateForm = () => {
  const params = useParams();
  const { orderId } = params;

  const [isOrderDetailLoading, setIsOrderDetailLoading] = useState(true);

  const loader = useSelector((state) => state.order.loader);

  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.order.order?.order);

  useEffect(() => {
    if (!orderState) {
      dispatch(getOrderById({ orderId }));
    } else {
      setIsOrderDetailLoading(false);
    }
  }, [orderState, dispatch]);

  if (isOrderDetailLoading) {
    return <div />;
  }

  return (
    <>
      {loader && <Loader />}
      <CreateOrderPage orderState={orderState} />
    </>
  );
};

const CreateOrderPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderState } = props;

  let initialFValues = {
    orderDescription: orderState ? orderState?.orderDescription : "",
    productIds: orderState ? orderState?.product_ids : [],
    pending: false,
  };
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({
    orderDescription: "",
    productIds: "",
  });
  const products = useSelector((state) => state.order.products);
  const loader = useSelector((state) => state.order.loader);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    console.log("productList", productList, products);
    if (products.length === 0) {
      dispatch(getProductsList());
    } else {
      if (productList.length === 0) {
        if (!orderState) {
          let tempProducts = products.map((product) => {
            return { ...product, isAdded: false };
          });
          setProductList(tempProducts);
        } else {
          let tempProducts = products.map((product) => {
            return {
              ...product,
              isAdded: values.productIds.includes(product.id) ? true : false,
            };
          });
          setProductList(tempProducts);
        }
      }
    }
  }, [products]);

  if (productList.length === 0) {
    return <div></div>;
  }

  // let order = orderState;

  const validate = () => {
    if (values.orderDescription.length < 1) {
      setErrors((prevState) => {
        return {
          ...prevState,
          orderDescription: "Please Enter valid order description",
        };
      });
      return false;
    }
    if (values.productIds.length === 0) {
      setErrors((prevState) => {
        return {
          ...prevState,
          productIds: "Please Enter at lease one product",
        };
      });
      return false;
    }

    return true;
  };
  console.log(values, errors);

  const submitOrderHandler = async (e) => {
    e.preventDefault();
    console.log(validate());
    if (validate()) {
      setValues({ ...values, pending: true });

      const data = {
        orderDescription: values.orderDescription,
        productIds: values.productIds,
      };

      console.log("data", data);

      if (orderState) {
        dispatch(
          updateOrderDetail({
            data,
            navigate,
            orderId: orderState.id,
          })
        );
      } else {
        dispatch(
          createOrderDetail({
            data,
            navigate,
          })
        );
      }
      setValues({ ...values, pending: false });
    }
  };

  const handleInputChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOnChange = (event, option, index) => {
    const tempValues = [...productList];
    tempValues[index].isAdded = event.target.checked;
    setProductList(tempValues);
    let tempProductId = [...values.productIds];
    if (event.target.checked) {
      tempProductId.push(tempValues[index].id);
    } else {
      tempProductId.splice(tempProductId.indexOf(5), 1);
    }
    setValues({ ...values, productIds: tempProductId });
  };

  return (
    <>
      {(values.pending || loader) && <Loader />}
      {/* <div className="center_back_button comman_btn_container">
        <Link to={routes.orders} className="comman_btn back_btn">
          Back
        </Link>
      </div> */}
      <div className="project_edit_main_content">
        <div className="creat_edit_project_btn_row">
          <h2 className="common_heading">
            {orderState ? "Update Order" : "New Order"}
          </h2>
        </div>
        <div className="project_edit_feature_media_row">
          <div className="project_edit_detail_column_content">
            <Input
              className="create_from_input_content"
              labelClassName="create_from_label"
              inputClassName="create_from_input"
              errorClassName="err_text"
              type="text"
              placeholder="Enter order description"
              label="Order Description"
              id="orderDescription"
              name="orderDescription"
              value={values.orderDescription}
              onChange={handleInputChange}
              error={errors?.orderDescription || ""}
            />
            <CheckboxComponent
              list={productList}
              onChange={(e, item, index) => handleOnChange(e, item, index)}
            />
          </div>
        </div>

        <div className="legal_doc_button">
          <Button
            buttonClassName="comman_light_btn"
            onClick={() => navigate(routes.orders)}
            text="Cancel"
            other=""
          />
          <Button
            buttonClassName="comman_btn"
            onClick={submitOrderHandler}
            text={orderState ? "Update" : "Submit"}
            other=""
          />
        </div>
      </div>
    </>
  );
};

export default CreateOrderPage;
