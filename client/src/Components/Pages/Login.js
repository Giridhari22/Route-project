import axios from "axios";
import React from "react";
import {useState} from "react"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useFormik} from "formik"
import { LoginSchema } from "../Schema";

const initialValues = {
  email:"",
  password:""
}

function Login() {
  const navigate = useNavigate();
  const {values , errors ,touched,handleSubmit,  handleBlur , handleChange} =  useFormik({
    initialValues :initialValues,
    validationSchema:LoginSchema,
    onSubmit:(values) => {
       const user = {
        email : values.email,
        password:values.password
       }
      axios.post('http://localhost:4500/login', user)
        .then(res => {
          console.log(res)
          if (res.data.success === true) {
         
         
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            toast.success('login suceessfully', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout (()=>{
              
              navigate("/home")
            },2000)
          }else{
            toast.error(res.data.error)
          }
        })
        .catch(err => {
         
          console.log(err)
        });
    }
  
  })
 


  return (
    <div>
      <section className="vh-100" style={{backgroundColor: "#9A616D;"}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius: "1rem;"}}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid"
                      style={{borderRadius: "1rem 0 0 1rem;"}}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form  onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{color:" #ff6219;"}}
                          ></i>
                          <span className="h1 fw-bold mb-0">Logo</span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{letterSpacing: "1px;"}}
                        >
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
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

                        <div className="form-outline mb-4">
                          <input
                          value={values.password}
                          onChange= {handleChange}
                          onBlur={handleBlur} 
                            type="password"
                            name="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" for="form2Example27">
                            Password
                          </label>
                          {errors.password && touched.password ? (
                            <p className="form-error" style={{color:"red"}}>{errors.password}</p>
                          ):null}
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          
                          >
                            Login
                          </button>
                          <ToastContainer />
                        </div>

                       
                        <p className="mb-5 pb-lg-2" style={{color: "#393f81;"}}>
                          Don't have an account?{" "}
                          <a href="/signup" style={{color: "#393f81;"}}>
                            Register here
                          </a>
                        </p>
                        <p className="mb-5 pb-lg-2" style={{color: "#393f81;"}}>
                        Need To Change Password?{" "}
                        <a href="/forgotPassword" style={{color: "#393f81;"}}>
                          forgot password
                        </a>
                      </p>
                       
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
