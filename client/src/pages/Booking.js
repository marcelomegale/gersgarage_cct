import React, {useContext, useEffect, useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Label, Button} from 'reactstrap';
import {Link, useNavigate} from "react-router-dom";
import ImgBooking from '../assets/img_Booking.jpeg';
import FormikComboBox from "../components/FormikComboBox";
import {ErrorMessage, Form, Field, Formik} from "formik";
import * as Yup from "yup";
import Axios from "axios";
import {AuthContext} from "../components/AuthContext";

const Booking = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [bookingsData, setBookingsData] = useState([]);

  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState('Confirm');

  const loadBookingDetails = async () => {
    const response = await Axios.get(`/booking/details`);
    const details = response.data.data.items;
    setBookingsData(details)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        await loadBookingDetails();

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getInitialData = (serviceType = '', serviceSize = '') => ({vehicleId: '',serviceType,bookingDate: '',timeslot: '',description: '', serviceSize})

  const toggleModal = () => {
    setError('');
    setModal(!modal);
  };

  const handleBooking = (serviceType, serviceSize) => {
    setBookingData(getInitialData(serviceType, serviceSize))
    toggleModal();
  };

  const handleSubmit = async (values) => {
    try {
      setButtonText('Saving...')
      const response = await Axios.post(`/booking/client/${user.id}`, values);
      navigate('/profile', {routeState: {  }})
    } catch (err) {
      console.log(err);
      setError(err.response.data.message)
    } finally {
      setButtonText('Confirm');
    }
  };

  Yup.addMethod(Yup.date, 'notSunday', function (errorMessage) {
    return this.test('notSunday', errorMessage, function (value) {
      const dayOfWeek = new Date(value).getDay();
      return dayOfWeek !== 0;  // 0 is Sunday in JavaScript's Date API
    });
  });

  const bookingValidationSchema = Yup.object().shape({
    vehicleId: Yup.string().required('Vehicle is required'),
    serviceType: Yup.string().required('Service Type is required'),
    bookingDate: Yup.date().required('Date is required').notSunday('Date should not be a Sunday.'),
    timeslot: Yup.string().required('Timeslot is required'),
    description: Yup.string()
  });

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div id='col1' className="col-7">
          {/* Content first collun */}
          <h1>Booking Area</h1>
          <h2>Make your appointment easy and fast</h2>

          {/* Cards area */}
          <div className='row col-12 BoxCard'>

            {bookingsData.map((booking) => (
              <div className='col-6 GGcard' key={booking.id}>
                <div className='BdCard'>
                  <div className='container'>
                    <div className='row CardTop'>
                      <div className='col-8 BookingTit'>{booking.name}</div>
                      <div className='col-4 BookingPrice'>€ {booking.price}</div>
                    </div>
                  </div>

                  <div className='BookingTxt'>
                    {booking.description}
                  </div>

                  <div>
                    <div>
                      <Button color="warning" className="w-100" onClick={() => handleBooking(booking.id, booking.serviceSize)}>
                        Make a booking
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id='col2' className="col-5">
          {/* Content Second column */}
          <div className="image-wrapper">
            <img src={ImgBooking} alt="Welcome" className='img-fluid'></img>
          </div>
        </div>

        <Modal isOpen={modal} toggle={toggleModal} centered className='Bdteste'>
          <ModalHeader toggle={toggleModal} className='GGtitOrange'>Make your appointment</ModalHeader>
          <ModalBody className='Bdform Bdteste'>
            {/* Conteúdo da modal */}
            <div id='GGform'>
              <Formik
                initialValues={bookingData}
                validationSchema={bookingValidationSchema}
                onSubmit={handleSubmit}
              >
                {({values}) => (

                  <Form>
                    <div className="form-group">
                      <FormikComboBox
                        name='vehicleId'
                        type='VIEW_VEHICLES_BY_PROFILE'
                        filtered={true}
                        filter={user.id}
                        label='Select a registered vehicle'
                      />
                      <ErrorMessage name="vehicleId" component="div" className="form-error"/>
                    </div>

                    <div className="form-group">
                      <FormikComboBox
                        name='serviceType'
                        type='BOOKING_TYPE'
                        label='Choose service type'
                      />
                      <ErrorMessage name="serviceType" component="div" className="form-error"/>
                    </div>

                    <div className="form-group">
                      <Label for="bookingDate">Choose the Date</Label>
                      <Field type="date" name="bookingDate" className="form-control"/>
                      <ErrorMessage name="bookingDate" component="div" className="form-error"/>
                    </div>

                    <div className="form-group">
                      <FormikComboBox
                        name='timeslot'
                        type='BOOKING_TIME_SLOT'
                        label='Choose a time slot'
                      />
                      <ErrorMessage name="timeslot" component="div" className="form-error"/>
                    </div>
                    <div className="form-group">
                      <Label for="description">Extra information:</Label>
                      <Field as="textarea" name="description" className="form-control"/>
                      <ErrorMessage name="description" component="div" className="form-error"/>
                    </div>
                    <div style={{color: "indianred"}}>
                      {error}
                    </div>
                    <div className="d-flex justify-content-between d-100">
                      <Button outline color="warning" className='btn' onClick={(e) => toggleModal()}
                              type="button">Close</Button>
                      <Button color="warning" className="btn" type="submit">{buttonText}</Button>
                    </div>
                    <Field as="hidden" name="serviceSize" />
                  </Form>
                )}
              </Formik>
            </div>
          </ModalBody>
          {/*<ModalFooter className="justify-content-between">*/}
          {/*  <div className="d-flex justify-content-start">*/}
          {/*    <Button outline color="warning" className='btn-lg' onClick={toggleModal}>*/}
          {/*      Close*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*  <div className="d-flex justify-content-end">*/}
          {/*    <Button color="warning" className='btn-lg'>*/}
          {/*      {buttonText}*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*</ModalFooter>*/}
        </Modal>

      </div>
    </div>
  );
}

export default Booking;
