import React, {useContext, useState, useEffect} from 'react';
import {
  Collapse,
  Card,
  CardBody,
  CardHeader,
  Button,
  ModalHeader,
  ModalBody,
  Modal, Input
} from 'reactstrap';
import ImgProfile from '../assets/img_profile.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import {AuthContext} from "../components/AuthContext";
import {Profiles} from "../utilities/Enums";
import FormikComboBox from "../components/FormikComboBox";
import {Link} from "react-router-dom";
import {FaFolderOpen} from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [errorProfile, setErrorProfile] = useState(null);
  const [errorVehicle, setErrorVehicle] = useState(null);

  const [modalProfile, setmodalProfile] = useState(false);
  const [modalVehicle, setmodalVehicle] = useState(false);
  const [buttonTextProfile, setButtonTextProfile] = useState('Confirm');
  const [buttonTextVehicle, setButtonTextVehicle] = useState('Confirm');
  const [buttonTextRemoveVehicle, setButtonTextRemoveVehicle] = useState('X');

  const [profileData, setProfileData] = useState({});
  const [vehiclesData, setVehiclesData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);

  const [vehicleData, setVehicleData] = useState({});

  const loadProfile = async () => {
    const userDataResponse = await Axios.get(`/profile/${user.id}`);
    const userData = userDataResponse.data.data;
    setProfileData(userData);
  }

  const loadVehicles = async () => {
    const userVehiclesResponse = await Axios.get(`/vehicle/profile/${user.id}`);
    const userVehicles = userVehiclesResponse.data.data.items;
    setVehiclesData(userVehicles)
  }

  const loadBookings = async () => {
    const userBookingsResponse = await Axios.get(`/booking/client/${user.id}`);
    const userBookings = userBookingsResponse.data.data.items;
    setBookingsData(userBookings)
  }

  useEffect(() => {
    const fetchData = async () => {
      if(!user) return;

      try {

        await loadProfile();
        await loadVehicles();
        await loadBookings();

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleModalProfile = () => { setErrorProfile(''); setmodalProfile(!modalProfile); };
  const toggleModalVehicle = async (id) => {
    setErrorVehicle('')
    if(!modalVehicle) {
      setVehicleData({
        id: '',
        manufacturer: '',
        model: '',
        vehicleType: '',
        engineType: '',
        transmissionType: '',
        register: '',
        yearOfMake: 2000,
      });

      if(id) {
        const vehicleDataResponse = await Axios.get(`/vehicle/${id}`);
        const vehicle = vehicleDataResponse.data.data;

        setVehicleData(vehicle)
      }
    }
    setmodalVehicle(!modalVehicle);
  };

  const toggle1 = () => { setIsOpen1(!isOpen1); setIsOpen2(false); };
  const toggle2 = () => { setIsOpen2(!isOpen2); setIsOpen1(false); };
  const handleSubmitProfile = async (values) => {
    try {
      setButtonTextProfile('Saving...')
      const response = await Axios.put(`/profile/${user.id}`, {
        firstName: values.firstName,
        surName: values.surName,
        phone: values.phone,
      });

      setProfileData(response.data.data);
      toggleModalProfile();
    } catch(err) {
      console.log(err);
      setErrorProfile(err.message)
    } finally {
      setButtonTextProfile('Confirm');
    }
  };
  const handleSubmitVehicle = async (values) => {
    try {
      setButtonTextProfile('Saving...')
      let response;
      if(values.id) response = await Axios.put(`/vehicle/${values.id}/profile/${user.id}`, values);
      else response = await Axios.post(`/vehicle/profile/${user.id}`, values);

      await loadVehicles();

      await toggleModalVehicle();
    } catch(err) {
      console.log(err);
      setErrorVehicle(err.message)
    } finally {
      setButtonTextVehicle('Confirm');
    }
  };

  const removeVehicle = async (id) => {
    try {
      setButtonTextRemoveVehicle('...')

      let response;
      if(!id) return;

      response = await Axios.delete(`/vehicle/${id}`);

      await loadVehicles();
    } catch(err) {
      console.log(err);
    } finally {
      setButtonTextRemoveVehicle('X');
    }
  }

  const profileValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    surName: Yup.string().required('Last Name is required'),
    phone: Yup.string().required('Phone is required'),
  });

  const vehicleValidationSchema = Yup.object().shape({
    manufacturer: Yup.string().required('Manufacturer is required'),
    model: Yup.string().required('Model is required'),
    vehicleType: Yup.string().required('Vehicle Type is required'),
    engineType: Yup.string().required('Engine Type is required'),
    transmissionType: Yup.string().required('Transmission Type is required'),
    register: Yup.string().required('Register is required'),
    yearOfMake: Yup.number().min(1900, "Vehicle must be newer than '1940'").required('Year of make is required'),
  });

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div id='ImgPg' className='col-2'>
          <img src={ImgProfile} alt="Wellcome" className='img-fluid'></img>
        </div>
        <div id='register' className='col-10 align-items-center'>
          <div className="PgTitle">Hello {profileData.firstname} {profileData.surname}</div>
          <div className="PgSubTitle">What do you want to do today?</div>
          <div className='row profileContent'>
            <div className='col-3'>
              <Card>
                <CardHeader>
                  <Button color="link" onClick={toggle1} className="text-left">
                    Profile
                  </Button>
                </CardHeader>
                <Collapse isOpen={isOpen1}>
                  <CardBody>
                    <div className='GGprofileData'>
                      <ul>
                        <li><span>Name:</span> {profileData.firstname}</li>
                        <li><span>Last Name:</span> {profileData.surname}</li>
                        <li><span>E-mail:</span> {profileData.email}</li>
                        <li><span>Phone:</span> {profileData.phone}</li>
                      </ul>
                    </div>
                    <div>
                      <Button outline color="warning" className='w-100' onClick={(e) => {
                        toggleModalProfile()
                      }}>Edit</Button>
                    </div>
                  </CardBody>
                </Collapse>
              </Card>
              <Card>
                <CardHeader>
                  <Button color="link" onClick={toggle2} className="text-left">
                    Vehicle
                  </Button>
                </CardHeader>
                <Collapse isOpen={isOpen2}>
                  <CardBody> 
                    <div className="mb-2">
                      <Button block outline onClick={(e) => toggleModalVehicle()}>+ Add New</Button>
                    </div>
                    {vehiclesData.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="d-flex justify-content-between align-center"
                        style={{ borderTop: "1px solid black", padding: "5px" }}
                      >
                        <div>
                          <div>{vehicle.manufacturer}</div>
                          <div><span>Reg:</span> {vehicle.register}</div>
                        </div>
                        <div>
                          <Button outline size="sm" onClick={(e) => toggleModalVehicle(vehicle.id)}>Edit</Button>
                          <Button outline size="sm" onClick={(e) => removeVehicle(vehicle.id)}>X</Button>
                        </div>
                      </div>
                    ))}
                  </CardBody>
                </Collapse>
              </Card>
              <Card>
                <CardHeader>
                  <Link to="/booking" className="text-left">
                    <Button color="link" className="text-left" style={{cursor: "pointer"}}>
                      Book a new appointment
                    </Button>
                  </Link>
                </CardHeader>
              </Card>
            </div>
            <div className='col-9'>
              <table className="table table-striped">
                <thead>
                <tr>
                  <th>Date</th>
                  <th>Vehicle</th>
                  <th>Service</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th style={{width: '5%'}} className='cnt'>Edit</th>
                </tr>
                </thead>
                <tbody>
                {!bookingsData.length && (
                  <tr><td colSpan={5}>Nothing here yet.</td></tr>
                )}
                {bookingsData.map((row) => (
                <tr key={row.id}>
                  <td>{new Date(row.date).toDateString()}</td>
                  <td>{row.vehicleModel}</td>
                  <td>{row.bookingType}</td>
                  <td>€ {row.tPrice || 0.00}</td>
                  <td>{row.bookingStatus}</td>
                  <td className='cnt'>
                    <Link to={`/invoice/${row.id}`}>
                      <FaFolderOpen size={28} color="#FFA500"/>
                    </Link>
                  </td>
                </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalProfile} toggle={toggleModalProfile} centered className='Bdteste'>
        <ModalHeader toggle={toggleModalProfile} className='GGtitOrange'>Edit your profile data</ModalHeader>
        <ModalBody className='Bdform Bdteste'>
          <div id='GGform'>
            <Formik
              initialValues={{
                firstName: profileData.firstname,
                surName: profileData.surname,
                phone: profileData.phone,
              }}
              validationSchema={profileValidationSchema}
              onSubmit={handleSubmitProfile}
            >
              <Form>
                <div className='FormGroup'>
                  <label htmlFor="firstName">First Name</label>
                  <Field type="text" name="firstName" className="form-control" />
                  <ErrorMessage name="firstName" component="div" className="form-error"/>
                </div>
                <div className='FormGroup'>
                  <label htmlFor="surName">Last Name</label>
                  <Field type="text" name="surName" className="form-control"/>
                  <ErrorMessage name="surName" component="div" className="form-error"/>
                </div>
                <div className='FormGroup'>
                  <label htmlFor="email">E-mail</label>
                  <div className="form-control" style={{backgroundColor: '#ccc'}}>
                    {profileData.email}
                  </div>
                </div>
                <div className='FormGroup'>
                  <label htmlFor="phone">Phone:</label>
                  <Field type="text" name="phone" className="form-control"/>
                  <ErrorMessage name="phone" component="div" className="form-error"/>
                </div>
                <div className="d-flex justify-content-between d-100">
                  <Button outline color="warning" className='btn' onClick={toggleModalProfile} type="button" >Close</Button>
                  <Button color="warning" className="btn" type="submit">{buttonTextProfile}</Button>
                </div>
                <div style={{color: "indianred"}}>
                  {errorProfile}
                </div>
              </Form>
            </Formik>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalVehicle} toggle={toggleModalVehicle} centered className='Bdteste'>
        <ModalHeader toggle={toggleModalVehicle} className='GGtitOrange'>Edit your vehicle's data</ModalHeader>
        <ModalBody className='Bdform Bdteste'>
          <div id='GGform'>
            <Formik
              initialValues={vehicleData}
              validationSchema={vehicleValidationSchema}
              onSubmit={handleSubmitVehicle}
            >
              {({values}) => (
              <Form>

                <Field type="hidden" name="id" className="form-control"/>
                <div className="form-group">
                  <FormikComboBox
                    name='manufacturer'
                    type='VEHICLE_MANUFACTURER'
                    label='Select a manufacturer'
                  />
                  <ErrorMessage name="manufacturer" component="div" className="form-error"/>
                </div>
                <div className="form-group">
                  <FormikComboBox
                    name='model'
                    type='VEHICLE_MANUFACTURER_MODEL'
                    label='Select a model'
                    filtered={true}
                    filter={values.manufacturer}
                  />
                  <ErrorMessage name="model" component="div" className="form-error"/>
                </div>
                <div className="form-group">
                  <FormikComboBox
                    name='vehicleType'
                    type='VEHICLE_TYPE'
                    label='Select a vehicle type'
                  />
                  <ErrorMessage name="vehicleType" component="div" className="form-error"/>
                </div>
                <div className="form-group">
                  <FormikComboBox
                    name='engineType'
                    type='VEHICLE_ENGINE_TYPE'
                    label='Select an engine type'
                  />
                  <ErrorMessage name="engineType" component="div" className="form-error"/>
                </div>
                <div className="form-group">
                  <FormikComboBox
                    name='transmissionType'
                    type='VEHICLE_TRANSMISSION_TYPE'
                    label='Select a transmission type'
                  />
                  <ErrorMessage name="transmissionType" component="div" className="form-error"/>
                </div>
                <div className='FormGroup'>
                  <label htmlFor="register">Register</label>
                  <Field type="text" name="register" className="form-control"/>
                  <ErrorMessage name="register" component="div" className="form-error"/>
                </div>
                <div className='FormGroup'>
                  <label htmlFor="yearOfMake">Year of Make:</label>
                  <Field type="number" name="yearOfMake" className="form-control"/>
                  <ErrorMessage name="yearOfMake" component="div" className="form-error"/>
                </div>
                <div className="d-flex justify-content-between d-100">
                  <Button outline color="warning" className='btn' onClick={(e) => toggleModalVehicle(1)} type="button" >Close</Button>
                  <Button color="warning" className="btn" type="submit">{buttonTextVehicle}</Button>
                </div>
                <div style={{color: "indianred"}}>
                  {errorVehicle}
                </div>
              </Form>
              )}
            </Formik>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default Profile;
