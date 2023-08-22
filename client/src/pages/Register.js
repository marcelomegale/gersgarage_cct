import ImgRegister from '../assets/img_register.jpg';

import {Button, Label} from 'reactstrap';
import React, {useState, useContext} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Formik, Form} from "formik";
import {AuthContext} from "../components/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const {user, showToast} = useContext(AuthContext); // show message
    const [error, setError] = useState(null);
    const [buttonText, setButtonText] = useState("Register");

    const handleSubmit = async (values) => {
        try {
            setButtonText('Saving...');

            values.username = values.email
            const response = await Axios.post(`/auth/register/client`, values);

            showToast('success', "Your register was made with success! Make the login please!") // show message

            navigate('/login', {routeState: { message: 'User created successfuly, you can log in now.'}})
        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setButtonText('Confirm');
        }
    };

    const registerValidationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required.'),
        lastName: Yup.string().required('Last Name is required.'),
        phone: Yup.string().required('Telephone is required.'),
        email: Yup.string().email('Invalid email address.').required('Email is required.'),
        password: Yup.string().min(6, 'Password must be at least 6 characters long.').required('Password is required.'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match.')
            .required('Confirm Password is required.')
    });

    return (

        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div id='ImgPg' className='col-7'>
                        <img src={ImgRegister} alt="Wellcome" className='img-fluid'></img>
                    </div>
                    <div id='register' className='col-5 align-items-center'>
                        <div className="PgTitle">
                            New account
                        </div>
                        <div className="PgSubTitle">Welcome to Garage Ger’s</div>
                        <div className="PgText">Make your registration in an easy and fast way and access several
                            facilities and
                            advantages at Ger's Garage. You will receive a voucher for a free car wash.
                        </div>
                        <div className="GGform">
                            <div className='GGtitleCard'>Personal form</div>
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    phone: '',
                                    email: '',
                                    password: '',
                                    passwordConfirmation: ''
                                }}
                                onSubmit={handleSubmit}
                                validationSchema={registerValidationSchema}
                            >
                                {({values}) => (
                                    <Form>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <Label for="firstName">First Name:</Label>
                                                    <Field name="firstName" type="text" className="form-control"/>
                                                    <ErrorMessage name="firstName" component="div" className="form-error"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <Label for="lastName">Last Name:</Label>
                                                    <Field name="lastName" type="text" className="form-control"/>
                                                    <ErrorMessage name="lastName" component="div" className="form-error"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <Label for="phone">Telephone:</Label>
                                                    <Field name="phone" type="text" className="form-control"/>
                                                    <ErrorMessage name="phone" component="div" className="form-error"/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email:</label>
                                                    <Field name="email" type="email" className="form-control"/>
                                                    <ErrorMessage name="email" component="div" className="form-error"/>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label htmlFor="password">Password:</label>
                                                    <Field name="password" type="password" className="form-control"/>
                                                    <ErrorMessage name="password" component="div" className="form-error"/>
                                                </div>

                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label htmlFor="passwordConfirmation">Confirm Password:</label>
                                                    <Field name="passwordConfirmation" type="password" className="form-control"/>
                                                    <ErrorMessage name="passwordConfirmation" component="div" className="form-error"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between d-100">
                                            <Button color="warning" className="btn" type="submit">{buttonText}</Button>
                                        </div>
                                        <div style={{color: "indianred"}}>
                                            {error}
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register;
