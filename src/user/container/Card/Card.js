

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQty, incrementQty, removeProducts } from '../../../redux/slice/cart.slice';
import { getCoupon } from '../../../redux/slice/coupon.slice';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { current } from '@reduxjs/toolkit';


function Card(props) {

  const cart = useSelector(state => state.cart);
  const products = useSelector(state => state.products);


  const coupon = useSelector(state => state.coupon);
  // console.log(coupon);

  const dispatch = useDispatch();


  // const [discount, setDiscount]

  useEffect(() => {
    dispatch(getCoupon())
  }, [])



  const productsdata = cart.cart.map((v) => {
    const product = products.products.find((v1) => v1.id === v.pid)

    return {
      ...product, qty: v.qty
    }
  })




  const handleInc = (id) => {
    dispatch(incrementQty(id))
  }


  const handleDec = (id) => {
    const pIndex = productsdata.findIndex((p) => p.id === id);
    const currentQty = productsdata[pIndex].qty;

    if (currentQty === 1) {
      return;
    }

    dispatch(decrementQty(id));
  };


  const handleremove = (id) => {
    dispatch(removeProducts(id))
  }

  const Total = productsdata.reduce((acc, v) => acc + v.qty * v.price, 0);
  const total = Total * 1


  let couponSchema = object({
    coupon: string().required("Please enter coupon")
  });


  const formik = useFormik({
    initialValues: {
      coupon: ""
    },
    validationSchema: couponSchema,
    onSubmit: values => {
      handleCoupon(values)
    },
  });

  const handleCoupon = (data) => {
    let flag = 0;
    coupon.coupon.map((v) => {
      if (v.coupon === data.coupon) {
        const correntDate = new Date();

        const expiryDate = new Date(v.expiry);

        if (correntDate <= expiryDate) {
          flag = 1;
        } else {
          flag = 2;
        }
      }
    });


    if (flag === 0) {
      formik.setFieldError("coupon", "Coupon is not valid");
    } else if (flag === 1) {
      formik.setFieldError("coupon", "Coupon is successfully");
    } else if (flag === 2) {
      formik.setFieldError("coupon", "Coupon is expired");
    }
  }

 
  

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <div>
      <div>
        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Cart</h1>
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-white">Cart</li>
          </ol>
        </div>
        {/* Single Page Header End */}
        {/* Cart Page Start */}
        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Products</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    productsdata.map((p) => (
                      <tr>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img src={p.image} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                          </div>
                        </th>
                        <td>
                          <p className="mb-0 mt-4">{p.name}</p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">{p.price} $</p>
                        </td>
                        <td>
                          <div className="input-group quantity mt-4" style={{ width: 100 }}>
                            <div className="input-group-btn">
                              <button onClick={() => handleDec(p.id)} className="btn btn-sm btn-minus rounded-circle bg-light border">
                                <i className="fa fa-minus" />
                              </button>
                            </div>
                            <span className="form-control form-control-sm text-center border-0">
                              {p.qty}
                            </span>
                            <div className="input-group-btn">
                              <button onClick={() => handleInc(p.id)} className="btn btn-sm btn-plus rounded-circle bg-light border">

                                <i className="fa fa-plus" />

                              </button>
                            </div>
                          </div>
                        </td>

                        <td>
                          <p className="mb-0 mt-4">{p.price * p.qty} $</p>
                        </td>

                        <td>
                          <button onClick={() => handleremove(p.id)} className="btn btn-md rounded-circle bg-light border mt-4">
                            <i className="fa fa-times text-danger" />
                          </button>
                        </td>
                      </tr>
                    ))
                  }


                </tbody>
              </table>
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <input
                  name='coupon'
                  type="text"

                  className="border-0 border-bottom rounded me-5 py-3 mb-4"
                  placeholder="Coupon Code"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.coupon}
                />
                {
                  errors.coupon && touched.coupon ? <span> {errors.coupon}</span> : null

                }
                <button
                  className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                  type="submit"
                >Apply Coupon
                </button>
              </form>

            </div>
            <div className="row g-4 justify-content-end">
              <div className="col-8" />
              <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                <div className="bg-light rounded">
                  <div className="p-4">
                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                    <div className="d-flex justify-content-between mb-4">
                      <h5 className="mb-0 me-4">Subtotal:</h5>
                      <p className="mb-0">${total}</p>
                    </div>
                    {/* <div className="d-flex justify-content-between mb-4">
                      <h5 className="mb-0 me-4">Discount:</h5>
                      <p className="mb-0">${discount}</p>
                    </div> */}
                    <div className="d-flex justify-content-between">
                      <h5 className="mb-0 me-4">Shipping</h5>
                      <div className>
                        <p className="mb-0">Flat rate: $3.00</p>
                      </div>
                    </div>
                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                  </div>
                  <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                    <p className="mb-0 pe-4">${total + 3}</p>
                  </div>
                  <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Cart Page End */}
      </div>


    </div>
  );
}

export default Card;







