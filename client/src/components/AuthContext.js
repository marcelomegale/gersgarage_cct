import React, { createContext, useEffect, useState } from 'react';
import {Progress, Toast, ToastBody, ToastHeader} from "reactstrap";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial check
  const [toastInfo, setToastInfo] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userData');
    if (token) {
      if (user) setUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const showToast = (type, message) => {
    setToastInfo({
      isVisible: true,
      message,
      type
    });

    setTimeout(() =>{
      hideToast()
    }, 5000)
  };

  const hideToast = () => {
    setToastInfo({
      isVisible: false,
      message: '',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        showToast,
      }}
    >

      {!loading && children}
      {toastInfo.isVisible &&
        <div className={`bg-${toastInfo.type}`} style={{ position: "absolute", top: "70px", left: "50%", zIndex: 9999 }}>
          <Toast onClick={(e) => hideToast()}>
            {/*<ToastHeader>Reactstrap</ToastHeader>*/}
            <ToastBody>{toastInfo.message}</ToastBody>
            {/*<Progress style={{height: "3px"}}/>*/}
          </Toast>
        </div>
      }
    </AuthContext.Provider>
  );
};
