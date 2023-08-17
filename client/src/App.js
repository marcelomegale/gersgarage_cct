import './App.css';
//import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Head from './components/Head';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegVehicle from './pages/RegVehicle';
import AnnualService from './pages/AnnualService';
import MajorService from './pages/MajorService';
import RepairFault from './pages/RepairFault';
import MajorRepair from './pages/MajorRepair';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import Management from './pages/Management';
import Invoice from './pages/Invoice';
import Axios from "axios";
import {AuthContextProvider} from "./components/AuthContext";
import AuthGuard from "./components/AuthGuard";
import {Profiles} from "./utilities/Enums";
import profile from "./pages/Profile";


// configurations for whole website
Axios.defaults.baseURL = 'http://localhost:3001'

function App() {
  Axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  Axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          window.location = '/login'; // Redirect to login page
        }
        return Promise.reject(error);
      }
  );


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Head />
        <main>
          <div className="container-fluid">
            <div className='row' >
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/RegVehicle" element={<RegVehicle />} />
                <Route path="/AnnualService" element={<AnnualService />} />
                <Route path="/MajorRepair" element={<MajorRepair />} />
                <Route path="/MajorService" element={<MajorService />} />
                <Route path="/RepairFault" element={<RepairFault />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Booking" element={<AuthGuard component={<Booking/>} allowedProfiles={[Profiles.Customer]} /> } />
                <Route path="/Profile" element={<AuthGuard component={<Profile/>} allowedProfiles={[Profiles.Customer]} /> } />
                <Route path="/Management" element={<AuthGuard component={<Management/>} allowedProfiles={[Profiles.Management, Profiles.Staff]} /> } />
                <Route path="/Invoice/:id" element={<AuthGuard component={<Invoice/>} allowedProfiles={[Profiles.Management, Profiles.Staff, Profiles.Customer]} /> } />
              </Routes>
            </div>
          </div>
        </main>
        <Footer/>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
