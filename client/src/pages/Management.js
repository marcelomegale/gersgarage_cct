import React, {useContext, useEffect, useState} from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Label, Button} from 'reactstrap';
import {Link, useLocation} from "react-router-dom";
import {FaFolderOpen} from 'react-icons/fa';
import {BsPlus} from 'react-icons/bs';
import Axios from "axios";
import {AuthContext} from "../components/AuthContext";
import {ErrorMessage, Field, Formik, Form} from "formik";
import * as Yup from "yup";
import FormikComboBox from "../components/FormikComboBox";

const Management = () => {
  const {user} = useContext(AuthContext);
  const {routeState} = useLocation();

  const [modalStaff, setModalStaff] = useState(false);
  const [bookingsData, setBookingsData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  const [buttonTextFilter, setButtonTextFilter] = useState('Filter')

  // Methods for loading state
  const loadBookings = async (filterString = '') => {
    const response = await Axios.get(`/booking${filterString}`);
    const bookings = response.data.data.items;
    setBookingsData(bookings)
  }
  const loadStaffOrders = async () => {
    const response = await Axios.get(`/booking/staff/orders`);
    const staffOrders = response.data.data.items;
    setStaffData(staffOrders)
  }

  const loadStatusOrders = async () => {
    const response = await Axios.get(`/booking/status/orders`);
    const statusOrders = response.data.data.items;
    setStatusData(statusOrders)
  }

  // Effect to run when load
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        await loadBookings();
        await loadStaffOrders();
        await loadStatusOrders();

        //await loadClientsOptions()

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleModalStaff = () => {
    setStaffError('');
    setModalStaff(!modalStaff);
  };

  const [staffError, setStaffError] = useState(null);
  const [buttonTextStaff, setButtonTextStaff] = useState("Save");

  const handleSubmitStaff = async (values) => {
    try {
      setButtonTextStaff('Saving...');

      values.username = values.email
      values.password = 'secret123';

      const response = await Axios.post(`/auth/register/staff`, values);
      setStaffError('User Created');
      await loadStaffOrders();
      toggleModalStaff();
    } catch (err) {
      setStaffError(err.response.data.message);
    } finally {
      setButtonTextStaff('Save');
    }
  };

  const staffValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required.'),
    lastName: Yup.string().required('Last Name is required.'),
    phone: Yup.string().required('Telephone is required.'),
    email: Yup.string().email('Invalid email address.').required('Email is required.'),
  });

  const handleFilterSubmit = async (values) => {
    try {
      setButtonTextFilter('Filtering...')

      let filterString = "?1=1";

      filterString += values.status ? '&status=' + values.status : '';
      filterString += values.staff ? '&staff=' + values.staff : '';
      filterString += values.initialDate ? '&initialDate=' + values.initialDate : '';
      filterString += values.finalDate ? '&finalDate=' + values.finalDate : '';

      await loadBookings(filterString);
    } catch(error) {
      console.error('Error filtering data:', error);
    } finally {
      setButtonTextFilter('Filter')
    }
  }

  function formatDate(date) {
    console.log(date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0, so we add 1
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        {/* Content first collun */}
        <div className='col-9 sideL'>
          <h1>Management Area</h1>
          <div className='dashboards'>
            {/* filters bar */}
            <div id='filterBar'>
              <div className="row">
                <div className="col-12 w-100">
                  <div className="d-flex justify-content-between">
                    <div className='titTableService'>Scheduled services:</div>
                    <Formik
                      initialValues={{
                        status: '',
                        staff: '',
                        initialDate: '',
                        finalDate: '',
                      }}
                      onSubmit={handleFilterSubmit}
                    >
                      <Form>
                        <div className="d-flex justify-content-between">
                          <div className="row">
                            <div className="col-3">
                              <FormikComboBox name="status"
                                              label=""
                                              type="BOOKING_STATUS"
                                              placeholder="Filter By Status"

                              />
                            </div>
                            <div className="col-3">
                              <FormikComboBox name="staff"
                                              label=""
                                              filtered={false}
                                              type="VIEW_STAFF_BY_BOOKINGS"
                                              placeholder="Filter By Staff"
                              />
                            </div>
                            <div className="col-5">
                              <div className="row">
                                <div className="col-6">
                                  <Field type="date" name="initialDate" className="form-control"/>
                                </div>
                                <div className="col-6">
                                  <Field type="date" name="finalDate" className="form-control"/>
                                </div>
                              </div>
                            </div>
                            <div className="col-1">
                              <Button color="warning" className="btn" type="submit">{buttonTextFilter}</Button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-striped table-bordered bdTable">
              <thead>
              <tr className='headTable'>
                <th style={{width: '10%'}}>Date</th>
                <th style={{width: '20%'}}>Client</th>
                <th style={{width: '17%'}}>Vehicle</th>
                <th style={{width: '14%'}}>Service</th>
                <th style={{width: '14%'}}>Staff</th>
                <th style={{width: '16%'}}>Status</th>
                <th style={{width: '5%'}} className='cnt'>Edit</th>
              </tr>
              </thead>
              <tbody>
              {bookingsData.map((row) => (
                <tr key={row.id}>
                  <td>{row.formatedDate}</td>
                  <td>{row.clientName}</td>
                  <td>{row.vehicleModel}</td>
                  <td>{row.bookingType}</td>
                  <td>{row.staffName || '--'}</td>
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
        {/* Content second collun */}
        <div className='col-3 sideR'>
          {/* tabela de Staffs */}
          <div id='staffList' className="row GGtable">
            <div className='container'>
              <div className='row'>
                <div className='col-10 algCT'>
                  <div className='titTableService '>Staff management</div>
                </div>
                <div className='col-2'>
                  <Button color="link" className="text-center" style={{cursor: "pointer"}}
                          onClick={(e) => toggleModalStaff()}>
                    <BsPlus size={32} color='#FFA500'/>
                  </Button>
                </div>
              </div>
            </div>
            <table className="table table-striped table-bordered bdTable">
              <thead>
              <tr className='headTable'>
                <th style={{width: '90%'}}>Name</th>
                <th style={{width: '10%'}} className='cnt'>Orders</th>
              </tr>
              </thead>
              <tbody>
              {staffData.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td className='cnt'>{row.count}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          {/* tabela de status */}
          <div id='statusList' className="statusList">
            {statusData.map((row) => (
              <div className='container statusCont' key={row.id}>
                <div className='row col-12 statusRow'>
                  <div className='col-10 staFont'>{row.name}</div>
                  <div className='col-2 staNumber cnt'>{row.count}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Modal isOpen={modalStaff} toggle={toggleModalStaff} centered className='Bdteste'>
        <ModalHeader toggle={toggleModalStaff} className='GGtitOrange'>Edit your staff's data</ModalHeader>
        <ModalBody className='Bdform Bdteste'>
          <div id='GGform'>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
              }}
              validationSchema={staffValidationSchema}
              onSubmit={handleSubmitStaff}
            >
              {({values}) => (
                <Form>
                  <div className="form-group">
                    <Label for="firstName">First Name:</Label>
                    <Field name="firstName" type="text" className="form-control"/>
                    <ErrorMessage name="firstName" component="div" className="form-error"/>
                  </div>
                  <div className="form-group">
                    <Label for="lastName">Last Name:</Label>
                    <Field name="lastName" type="text" className="form-control"/>
                    <ErrorMessage name="lastName" component="div" className="form-error"/>
                  </div>
                  <div className="form-group">
                    <Label for="phone">Telephone:</Label>
                    <Field name="phone" type="text" className="form-control"/>
                    <ErrorMessage name="phone" component="div" className="form-error"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <Field name="email" type="email" className="form-control"/>
                    <ErrorMessage name="email" component="div" className="form-error"/>
                  </div>
                  <div style={{color: "indianred"}}>
                    {staffError}
                  </div>
                  <div className="d-flex justify-content-between d-100">
                    <Button outline color="warning" className='btn'
                            onClick={(e) => toggleModalStaff()} type="button">Close</Button>
                    <Button color="warning" className="btn"
                            type="submit">{buttonTextStaff}</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Management;
