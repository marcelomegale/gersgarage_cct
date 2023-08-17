import React, {useContext, useEffect} from 'react';
import {AuthContext} from "./AuthContext";
import {useNavigate} from "react-router-dom";
import Axios from "axios";


const AuthGuard = ({component, allowedProfiles}) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        //Validates wether the user has the required profile
        if(!user || !allowedProfiles.includes(user?.profile_type_id)) navigate('/login');
    }, []);

    return <React.Fragment>{component}</React.Fragment>
}

export default AuthGuard;
