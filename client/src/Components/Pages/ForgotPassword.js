import axios from 'axios';
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import {useFormik} from "formik"
import { sendPassword } from "../Schema";

const initialValues = {
  email:"",
  
}

function ForgotPassword() {
  const [show, setShow] = useState(false);
  // const [email, setEmail] = useState('');
  
  const navigate = useNavigate();
  const {values , errors ,touched,handleSubmit,  handleBlur , handleChange} =  useFormik({
    initialValues :initialValues,
    validationSchema:sendPassword,
    onSubmit:(values) => {
      axios.post('http://localhost:4500/forgot-password', { email:values.email})
      .then(res => {
       if(res.data.success === false) {
         alert(res.data.msg);
       }
       else {
        alert("password sent")
        navigate("/")
       }
      })
      .catch(err => console.log(err));
     setShow(true);
    }
  
  })

  // const handleEmailSubmit = (event) => {
  //   event.preventDefault();
  //   axios.post('http://localhost:4500/forgot-password', { email})
  //    .then(res => {
  //     if(res.data.success === false) {
  //       alert(res.data.msg);
  //     }
  //     else {
  //      alert("password sent")
  //      navigate("/")
  //     }
  //    })
  //    .catch(err => console.log(err));
  //   setShow(true);
  // };

 

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              Email Verification
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                          value={values.email}
                          onChange= {handleChange}
                          onBlur={handleBlur}  
                            type="email"
                            id="form2Example17"
                            name="email"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" for="form2Example17">
                          Email address
                        </label>
                        {errors.email && touched.email ? (
                          <p className="form-error" style={{color:"red"}}>{errors.email}</p>
                        ):null}
                </div>
                <button type="submit" className="btn btn-primary">Generate Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
