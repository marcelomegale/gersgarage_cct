import React, {useContext, useEffect, useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Label, Button} from 'reactstrap';
import {Link, useLocation} from "react-router-dom";
import {FaFolderOpen} from 'react-icons/fa';
import Axios from "axios";
import {AuthContext} from "../components/AuthContext";
import {ErrorMessage, Field, Formik, Form} from "formik";
import * as Yup from "yup";

const Management = () => {
    const {user} = useContext(AuthContext);
    const {routeState} = useLocation();

    const [modalStaff, setModalStaff] = useState(false);
    const [bookingsData, setBookingsData] = useState([]);
    const [staffData, setStaffData] = useState([]);

    const loadBookings = async () => {
        const response = await Axios.get(`/booking`);
        const bookings = response.data.data.items;
        setBookingsData(bookings)
    }
    const loadStaffOrders = async () => {
        const response = await Axios.get(`/booking/staff/orders`);
        const staffOrders = response.data.data.items;
        setStaffData(staffOrders)
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            try {
                await loadBookings();
                await loadStaffOrders();

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


    return (
        <div className='container-fluid'>
            {/*<pre>{JSON.stringify(routeState, null, 2)}</pre>*/}
            <div className='row'>
                <div id='table' className='col-9'>
                    {/* Content first collun */}
                    <h1>Management Area</h1>
                    <div className='dashboards'>
                        <div className='titTableService'>Scheduled services</div>
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th style={{width: '10%'}}>Date</th>
                                <th style={{width: '26%'}}>Client</th>
                                <th style={{width: '17%'}}>Vehicle</th>
                                <th style={{width: '14%'}}>Service</th>
                                <th style={{width: '14%'}}>Staff</th>
                                <th style={{width: '10%'}}>Status</th>
                                <th style={{width: '5%'}} className='cnt'>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bookingsData.map((row) => (
                                <tr key={row.id}>
                                    <td>{new Date(row.date).toDateString()}</td>
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
                <div className='col-3'>
                    {/* Content first collun */}
                    <h1>Numbers</h1>
                    {/* tabela de Staffs */}
                    <div id='staffList' className="row GGtable">
                        <div className='titTableService'>Staff management</div>
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th style={{width: '80%'}}>Name</th>
                                <th style={{width: '10%'}} className='cnt'>Orders</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colSpan={2} className="text-center">
                                    <Button color="link" className="text-center" style={{cursor: "pointer"}} onClick={(e) => toggleModalStaff()}>
                                        Register new staff
                                    </Button>
                                </td>
                            </tr>
                            {staffData.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.name}</td>
                                    <td className='cnt'>{row.count}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
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
