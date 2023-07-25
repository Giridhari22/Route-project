import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Grid } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ConfirmPassword = () => {
  const navigate = useNavigate()

  const initialValues = {
    email:'',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email : Yup.string().email().required("please enter your email"),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    currentPassword: Yup.string().required('Current Password is required'),
  });
  
  

  const handleSubmit=async(values) => {
    try {
      
      const user = {
        email : values.email,
        currentPassword:values.currentPassword,
        newPassword:values.newPassword,
        confirmNewPassword:values.confirmPassword,
       }
      const res = await axios.post('http://localhost:4500/verify-password',user);
       
      console.log("Api response : ", res.data)
      if(res.data.success === false) {
        alert(res.data.msg);
      }
      else {
       alert("password change")
       navigate("/")
       
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={6}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
              <Grid item xs={12}>
              <Field
                as={TextField}
                type="email"
                label="email"
                name="email"
                variant="outlined"
                fullWidth
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
              />
            </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="password"
                    label="Current Password"
                    name="currentPassword"
                    variant="outlined"
                    fullWidth
                    error={errors.currentPassword && touched.currentPassword}
                    helperText={errors.currentPassword && touched.currentPassword && errors.currentPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="password"
                    label="Password"
                    name="newPassword"
                    variant="outlined"
                    fullWidth
                    error={errors.newPassword && touched.newPassword}
                    helperText={errors.newPassword && touched.newPassword && errors.newPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    variant="outlined"
                    fullWidth
                    error={errors.confirmPassword && touched.confirmPassword}
                    helperText={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default ConfirmPassword;
