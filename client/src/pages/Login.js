import ImgLogin from '../assets/img_login.png';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {AuthContext} from "../components/AuthContext";
import {Profiles} from "../utilities/Enums";

const Login = () => {
    const navigate = useNavigate();
    const {routeState} = useLocation();

    const {setUser} = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [buttonText, setButtonText] = useState("Login");

    const handleClickLogin = async (values) => {
        try {
            setButtonText('Logging in...')
            const response = await Axios.post("/auth/login", values);

            // Axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userData', JSON.stringify(response.data.user));

            setUser(response.data.user);
            setError(null)

            const route = response.data.user.profile_type_id == Profiles.Customer ? '/Profile' : '/Management'
            navigate(route, {routeState: {}})
        } catch (err) {
            console.log(err);
            setError(err.message)
            // setError(err.response.data.message)
        } finally {
            setButtonText('Login');
        }
    }

    const validationLogin = Yup.object().shape({
        username: Yup
            .string()
            .email().required(),
        password: Yup
            .string()
            .min(4)
            .required(),
    });

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div id='ImgPg' className='col-6'>
                    <img src={ImgLogin} alt="Wellcome" className='img-fluid'></img>
                </div>
                <div id='login' className='col-6 d-flex align-items-center testGrey'>
                    <div className="container">
                        <div id='loginForm' className='row GGloginForm'>
                            <div className='col'>
                                <div className='GGtitleCard'>Welcome to Garage Ger’s</div>
                                <Formik
                                    initialValues={{
                                        username: '',
                                        password: ''
                                    }}
                                    onSubmit={handleClickLogin}
                                    validationSchema={validationLogin}
                                >
                                    <Form>
                                        <div>
                                            <Field name="username" placeholder="E-mail" className="form-control"></Field>
                                            <ErrorMessage component="span" name="username" className="form-error"/>
                                        </div>
                                        <div>
                                            <Field name="password" placeholder="Password" type="password"
                                                   className="form-control"></Field>
                                            <ErrorMessage component="span" name="password" className="form-error"/>
                                        </div>
                                        <div>
                                            <button className='btn btn-warning' type='submit'
                                                    style={{margin: "10px 0"}}>{buttonText}</button>
                                            <div id='MakeProfile'>
                                                <Link to="/Register" style={{color: "black"}}>
                                                    Don’t have a profile? Click here
                                                </Link>
                                            </div>
                                        </div>
                                        <div style={{color: "indianred"}}>
                                            {error}
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
