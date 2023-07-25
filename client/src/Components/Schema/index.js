import * as Yup from "yup";


export const  signupSchema = Yup.object({
    first_name : Yup.string().min(3).max(25).required("please enter your first_name"),
    last_name : Yup.string().min(3).max(25).required("please enter your last_name"),
    email : Yup.string().email().required("please enter your email"),
    password : Yup.string().min(6).required("please enter your password"),
    
})

export const  LoginSchema = Yup.object({
    
    email : Yup.string().email().required("please enter your email"),
    password : Yup.string().min(6).required("please enter your password"),
    
})
 
export const sendPassword =  Yup.object({
    
  email : Yup.string().email().required("please enter your email"),
  
})
 
 
