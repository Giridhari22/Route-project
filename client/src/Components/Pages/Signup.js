import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import {useFormik} from "formik"
import { signupSchema } from "../Schema";
 
 const initialValues ={
  first_name :"",
  last_name :"",
  email:"",
  password:""

 }

function Signup() {
 const {values , errors ,touched,handleSubmit,  handleBlur , handleChange} =  useFormik({
    initialValues :initialValues,
    validationSchema:signupSchema,
    onSubmit :((values) => {
      const user = {firstName: values.first_name,
       lastName: values.last_name , 
       email:values.email, 
       password:values.password} 
       axios.post('http://localhost:4500/signup', user)
        .then(res => {
         if(res.data.success === false) {
           alert(res.data.msg);
   
         }
         else {
           alert("signup successfully")
           // showToastMessage()
           console.log("register successfully")
           navigate("/")
         }
        })
        .catch(err => console.log(err));
     })
  })
  console.log(errors)

 
  const navigate = useNavigate();
  
  const showToastMessage = () => {
    toast.success('signup successfully !', {
        position: toast.POSITION.TOP_CENTER
    });
};

 

 
  return (
    <div>
      <section class="h-100 bg-dark">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col">
              <div class="card card-registration my-4">
                <div class="row g-0">
                  <div class="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                      alt="img"
                      class="img-fluid"
                      style={{
                        borderTopLeftRadius: ".25rem",
                        borderBottomLeftRadius: ".25rem",
                      }}
                    />
                  </div>
                  <form onSubmit={handleSubmit} class="col-xl-6">
                    <div class="card-body p-md-5 text-black">
                      <h3 class="mb-5 text-uppercase">
                        Product registration form
                      </h3>

                      <div class="row">
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <input
                            value={values.first_name}
                            onChange= {handleChange}
                            onBlur={handleBlur}  
                            type="text"
                              name="first_name"
                              id="form3Example1m"
                              class="form-control form-control-lg"
                              // onChange={e=> setFirstName(e.target.value)}
                            />
                            <label class="form-label" for="form3Example1m">
                              First name
                            </label>
                            {errors.first_name && touched.first_name ? (
                              <p className="form-error" style={{color:"red"}}>{errors.first_name}</p>
                            ):null}
                          </div>
                        </div>
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <input
                            value={values.last_name}
                            onChange= {handleChange}
                            onBlur={handleBlur}  
                            type="text"
                              id="form3Example1n"
                              name="last_name"
                              class="form-control form-control-lg"
                              // onChange={e=> setLastName(e.target.value)}
                            />
                            <label class="form-label" for="form3Example1n">
                              Last name
                            </label>
                            {errors.last_name && touched.last_name ? (
                              <p className="form-error" style={{color:"red"}}>{errors.last_name}</p>
                            ):null}
                          </div>
                        </div>
                      </div>

                      <div class=" justify-content-start col-md-12 mb-4 py-2">
                        <div class="form-outline mb-6 col-md-12 ">
                          <input
                          value={values.email}
                          onChange= {handleChange}
                          onBlur={handleBlur}  
                          type="email"
                            name="email"
                            id="form3Example97"
                            class="form-control form-control-lg"
                            // onChange={e=> setEmail(e.target.value)}
                          />
                          <label class="form-label" for="form3Example97">
                            Email ID
                          </label>
                          {errors.email && touched.email ? (
                            <p style={{color:"red"}} className="form-error">{errors.email}</p>
                          ):null}
                        </div>

                        <div class="form-outline mb-6 col-md-12">
                          <input
                          value={values.password}
                          onChange= {handleChange}
                          onBlur={handleBlur}  
                          type="password"
                            name="password"
                            id="form3Example97"
                            class="form-control form-control-lg"
                            // onChange={e=> setPassword(e.target.value)}
                          />
                          <label class="form-label" for="form3Example97">
                            Password
                          </label>
                          {errors.password && touched.password ? (
                            <p style={{color:"red"}} className="form-error">{errors.password}</p>
                          ):null}
                        </div>

                        <div class="d-flex justify-content-end pt-3">
                          <button
                            type="submit"

                            class="btn btn-warning btn-lg ms-2"
                            onClick={showToastMessage}
                          >
                            Register
                          </button>
                          
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
