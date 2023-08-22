import React, {useContext, useEffect, useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // modal invoice
import {FaArrowLeft, FaPlus, FaSync} from 'react-icons/fa';
import Axios from "axios";
import {useNavigate, useParams} from 'react-router-dom';

import {Profiles} from "../utilities/Enums";
import FormikComboBox from "../components/FormikComboBox";
import {BsTrashFill} from "react-icons/bs";
import {AuthContext} from "../components/AuthContext";
import logo_gg from "../assets/logotype.png";

const Invoice = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const {id} = useParams();

    const [invoice, setInvoice] = useState({});
    const [invoiceItems, setInvoiceItems] = useState([]);

    const [errorStaff, setErrorStaff] = useState('');
    const [errorStatus, setErrorStatus] = useState('');
    const [errorAdd, setErrorAdd] = useState('');

    const [optionsStaff, setOptionsStaff] = useState([]);
    const [optionsStatus, setOptionsStatus] = useState([]);
    const [optionsParts, setOptionsParts] = useState([]);
    const [optionsAccessories, setOptionsAccessories] = useState([]);
    const [optionsServices, setOptionsServices] = useState([]);

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
    setModal(!modal);
    };

    const loadInvoice = async () => {
        const response = await Axios.get(`/booking/${id}`);
        const data = response.data.data;
        setInvoice(data);
    }

    const loadInvoiceItems = async () => {
        const response = await Axios.get(`/booking/${id}/items`);
        const data = response.data.data.items;

        setInvoiceItems(data);
    }

    const loadComboStaff = async () => {
        const response = await Axios.get(`/domain/combo/VIEW_STAFF`);
        const data = response.data.data;
        setOptionsStaff(data);
    }
    const loadComboStatus = async () => {
        const response = await Axios.get(`/domain/combo/BOOKING_STATUS`);
        const data = response.data.data;
        setOptionsStatus(data);
    }
    const loadComboParts = async () => {
        const response = await Axios.get(`/domain/combo/BOOKING_PARTS_TYPE`);
        const data = response.data.data;

        setOptionsParts(data);
    }
    const loadComboAccessories = async () => {
        const response = await Axios.get(`/domain/combo/BOOKING_ACCESSORIES_TYPE`);
        const data = response.data.data;
        setOptionsAccessories(data);
    }
    const loadComboServices = async () => {
        const response = await Axios.get(`/domain/combo/BOOKING_SERVICES_TYPE`);
        const data = response.data.data;
        setOptionsServices(data);
    }

    const [selectedValueStaff, setSelectedValueStaff] = useState("");
    const handleChangeStaff = (event) => { setSelectedValueStaff(event.target.value); }

    const [selectedValueStatus, setSelectedValueStatus] = useState("");
    const handleChangeStatus = (event) => { setSelectedValueStatus(event.target.value); }

    const [selectedValueParts, setSelectedValueParts] = useState("");
    const handleChangeParts = (event) => { setSelectedValueParts(event.target.value); }

    const [selectedValueAccessories, setSelectedValueAccessories] = useState("");
    const handleChangeAccessories = (event) => { setSelectedValueAccessories(event.target.value); }

    const [selectedValueServices, setSelectedValueServices] = useState("");
    const handleChangeServices = (event) => { setSelectedValueServices(event.target.value); }


    useEffect(() => {
        const fetchData = async () => {
            try {

                await loadInvoice();
                await loadInvoiceItems();

                if(user.profile_type_id  == Profiles.Management) {
                    await loadComboStaff();
                    await loadComboStatus();
                    await loadComboParts();
                    await loadComboAccessories();
                    await loadComboServices();
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const saveNewStaff = async () => {
        if(selectedValueStaff) {
            try {
                setErrorStaff('')
                const response = await Axios.put(`/booking/${id}/staff`, {
                    staffId: selectedValueStaff
                });

                await loadInvoice()
                setSelectedValueStaff('')
            } catch (err) {
                setErrorStaff(err.response.data.message)
            }
        } else {
            setErrorStaff('Select something to save first!')
        }
    }

    const saveNewStatus = async () => {
        if(selectedValueStatus) {
            try {
                setErrorStatus('')
                const response = await Axios.put(`/booking/${id}/status`, {
                    statusId: selectedValueStatus
                });

                await loadInvoice()
                setSelectedValueStatus('')
            } catch (err) {
                setErrorStatus(err.response.data.message)
            }
        } else {
            setErrorStatus('Select something to save first!')
        }
    }

    const handleAddParts = async () => {
        if(selectedValueParts) {
            try {
                setErrorAdd('')
                const response = await Axios.post(`/booking/${id}/items`, {
                    bookingId: id,
                    categoryName: 'BOOKING_PARTS_TYPE',
                    itemId: selectedValueParts
                });

                await loadInvoiceItems()
                setSelectedValueParts('')
            } catch (err) {
                setErrorAdd(err.response.data.message)
            }
        } else {
            setErrorAdd('Select something to add first!')
        }
    }
    const handleAddAccessories = async () => {
        if(selectedValueAccessories) {
            try {
                setErrorAdd('')
                const response = await Axios.post(`/booking/${id}/items`, {
                    bookingId: id,
                    categoryName: 'BOOKING_ACCESSORIES_TYPE',
                    itemId: selectedValueAccessories
                });

                await loadInvoiceItems()
                setSelectedValueAccessories('')
            } catch (err) {
                setErrorAdd(err.response.data.message)
            }
        } else {
            setErrorAdd('Select something to add first!')
        }
    }
    const handleAddServices = async () => {
        if(selectedValueServices) {
            try {
                setErrorAdd('')
                const response = await Axios.post(`/booking/${id}/items`, {
                    bookingId: id,
                    categoryName: 'BOOKING_SERVICES_TYPE',
                    itemId: selectedValueServices
                });

                await loadInvoiceItems()
                setSelectedValueServices('')
            } catch (err) {
                setErrorAdd(err.response.data.message)
            }
        } else {
            setErrorAdd('Select something to add first!')
        }
    }

    const handleDeleteRowItem = async (itemId) => {
        try {
            setErrorAdd('')
            const response = await Axios.delete(`/booking/${id}/items/${itemId}`);

            await loadInvoiceItems()
            setSelectedValueAccessories('')
        } catch (err) {
            setErrorAdd(err.response.data.message)
        }
    }

    const handleBack = async (e) => {
        navigate(-1);
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                {/* FIRST COLUMN */}
                <div className='col-9 sideL'>
                    {/* personal data */}
                    <h1>
                        <Button style={{marginRight: "10px"}} color="white" onClick={e => handleBack()} title="Go back">
                            <FaArrowLeft size={28} color="#FFA500"/>
                        </Button>
                        Register Nº {invoice.id}
                    </h1>
                    <div id='Dashboards' className='dashboards'>
                        <div className='infoBooking'>
                            <div className='dataBooking'>
                                <ul className='dataInvoice'>
                                    <li><b>Client: </b>{invoice.clientName}</li>
                                    <li><b>Vehicle: </b>{invoice.vehicleModel} </li>
                                    <li><b>Register: </b>{invoice.vehicleRegister}</li>
                                    <li><b>Date: </b>{invoice.formatedDate}</li>
                                    <li><b>Service: </b>{invoice.bookingType}</li>
                                </ul>
                            </div>
                            <div className='dscriBooking'>
                                <b>Description:</b> {invoice.description}
                            </div>
                        </div>
                        <div className='row w-100'>
                            <div className='col-4'>
                                <div id='staffBoard' className='col'>
                                    {/* Responsible Staff */}
                                    <div className='borderTable cardInvoice'>
                                        <div className='cardTitle'>Responsible Staff</div>
                                        <div className='cardStaff'><span>Current staff:</span> <b>{invoice.staffName || "--"}</b></div>
                                        { user.profile_type_id === Profiles.Management &&
                                            <>
                                            <div className='row'>
                                                <div className='col'>
                                                    <FormGroup className='FormGroup'>
                                                        <Input
                                                            type="select"
                                                            value={selectedValueStaff}
                                                            onChange={handleChangeStaff}
                                                            className='w-100 form-select custom-select'
                                                        >
                                                            <option value="">Change Staff</option>
                                                            {optionsStaff.map((opt) => (<option key={opt.id} value={opt.id}>{opt.name}</option>))}
                                                        </Input>
                                                        <i className="fas fa-chevron-down fa-lg"></i>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div style={{color: "indianred"}}>
                                                {errorStaff}
                                            </div>
                                            <Button color="warning" outline className='btn-lg w-100'  onClick={(e) => saveNewStaff(e)}>
                                                Change
                                            </Button>
                                        </>}
                                    </div>
                                </div>
                                <div id='statusBoard' className='col'>

                                    <div className='borderTable cardInvoice'>
                                        <div className='cardTitle'>Status Service</div>
                                        <div className='cardStaff'><span>Current status:</span> <b>{invoice.bookingStatus}</b></div>
                                        { user.profile_type_id !== Profiles.Customer &&
                                        <>
                                            <div className='row'>
                                                <div className='col'>
                                                    <FormGroup className='FormGroup'>
                                                        <Input
                                                            type="select"
                                                            className='w-100 form-select custom-select'
                                                            value={selectedValueStatus}
                                                            onChange={handleChangeStatus}
                                                        >
                                                            <option value="">Change Status</option>
                                                            {optionsStatus.map((opt) => (<option key={opt.id} value={opt.id}>{opt.name}</option>))}
                                                        </Input>
                                                        <i className="fas fa-chevron-down fa-lg"></i>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div style={{color: "indianred"}}>
                                                {errorStatus}
                                            </div>
                                            <Button color="warning" outline className='btn-lg w-100' onClick={(e) => saveNewStatus(e)}>
                                                Change
                                            </Button>
                                        </>}
                                    </div>
                                </div>
                            </div>
                            <div className='col-8'>
                                <div className='row extrasArea'>
                                    <div className='col-6'>
                                        <div className='cardInvoice'>
                                            <div className='cardTitle'>Extras</div>
                                            <>
                                                <div className='row'>
                                                    <div className='col-10'>
                                                        <FormGroup className='FormGroup'>
                                                            <Label htmlFor="selStaff">Parts Supply</Label>
                                                            <Input
                                                                type="select"
                                                                value={selectedValueParts}
                                                                onChange={handleChangeParts}
                                                                className='w-100 form-select custom-select'
                                                            >
                                                                <option value="">Select Parts</option>
                                                                {optionsParts.map((opt) => (<option key={opt.id} value={opt.id}>{opt.name}</option>))}
                                                            </Input>
                                                        </FormGroup>
                                                    </div>
                                                    <div className='col-2 d-flex butAdd'>
                                                        <Button color="warning" outline className='btn-lg mt-auto' disabled={user.profile_type_id == Profiles.Customer}
                                                                onClick={(e) => handleAddParts(e)}>
                                                            <FaPlus size={24}/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </>
                                        </div>
                                        <div className='cardInvoice'>
                                            <>
                                                <div className='row'>
                                                    <div className='col-10'>
                                                        <FormGroup className='FormGroup'>
                                                            <Label htmlFor="selStaff">Accessories</Label>
                                                            <Input
                                                                type="select"
                                                                value={selectedValueAccessories}
                                                                onChange={handleChangeAccessories}
                                                                className='w-100 form-select custom-select'
                                                            >
                                                                <option value="">Select accessories</option>
                                                                {optionsAccessories.map((opt) => (<option key={opt.id} value={opt.id}>{opt.name}</option>))}
                                                            </Input>
                                                        </FormGroup>
                                                    </div>
                                                    <div className='col-2 d-flex butAdd'>
                                                        <Button color="warning" outline className='btn-lg mt-auto' disabled={user.profile_type_id == Profiles.Customer}
                                                                onClick={(e) => handleAddAccessories(e)}>
                                                            <FaPlus size={24}/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </>
                                        </div>
                                        <div className='cardInvoice'>
                                            <>
                                                <div className='row'>
                                                    <div className='col-10'>
                                                        <FormGroup className='FormGroup'>
                                                            <Label htmlFor="selStaff">Services</Label>
                                                            <Input
                                                                type="select"
                                                                value={selectedValueServices}
                                                                onChange={handleChangeServices}
                                                                className='w-100 form-select custom-select'
                                                            >
                                                                <option value="">Select Service</option>
                                                                {optionsServices.map((opt) => (<option key={opt.id} value={opt.id}>{opt.name}</option>))}
                                                            </Input>
                                                        </FormGroup>
                                                    </div>
                                                    <div className='col-2 d-flex butAdd'>
                                                        <Button color="warning" outline className='btn-lg mt-auto' disabled={user.profile_type_id == Profiles.Customer}
                                                                onClick={(e) => handleAddServices(e)}>
                                                            <FaPlus size={24}/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </>
                                            <div style={{color: "indianred"}}>
                                                {errorAdd}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        {/* List */}
                                        <div className='borderTable cardInvoice'>
                                            <div className='cardTitle'>List Extras</div>

                                            <div className='row tableList'>
                                                <table className='table'>
                                                    <tbody>
                                                    {invoiceItems.map((row) => (
                                                        <tr key={row.id}>
                                                            <td style={{ width: '60%' }} className='lft'>{row.name}</td>
                                                            <td style={{ width: '40%' }} className='rgt'>€ {row.price}</td>
                                                            <td style={{ width: '10%' }} className='rgt'>
                                                            { (user.profile_type_id != Profiles.Customer && row.categoryName != 'Service') &&
                                                                    <>
                                                                        <Button color="white" style={{cursor: "pointer"}} onClick={(e) => handleDeleteRowItem(row.id)}>
                                                                            <BsTrashFill size={24} color="#FFA500" />
                                                                        </Button>
                                                                    </>}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    
                                                    { !invoiceItems.length && <>
                                                        <tr><td colSpan={3}>Nothing here yet.</td></tr>
                                                    </>}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SECOND COLUMN */}
                <div className='col-3 sideR'>
                    {/* Content second collun */}
                    <h1>Invoice</h1>
                    {/* invoice list */}
                    
                    {/* header */}
                    <div id='dataInvoice' className="row GGtable">
                        <div>
                            <div className='container ivStyle'>
                                <div className='row'>
                                    <div className='row col-12'>
                                        <div className='col-6'>
                                            <b>Client: </b>{invoice.clientName}
                                        </div>
                                        <div className='col-6'>
                                            <b>Date: </b>{invoice.formatedDate}
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <b>Vehicle: </b>{invoice.vehicleModel}
                                    </div>
                                    <div className='col-12'>
                                        <b>Register: </b>{invoice.vehicleRegister}
                                    </div>
                                    <div className='col-12'>
                                        <b>Service: </b>{invoice.bookingType}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* list parts invoice */}
                    <div id='partList' className="row">
                        <p>Parts list</p>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th className='rgt'>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            {invoiceItems.map((row) => (
                                <tr key={row.id}>
                                    <td style={{ width: '60%' }} className='lft'>{row.name}</td>
                                    <td style={{ width: '40%' }} className='rgt'>€ {row.price}</td>
                                </tr>
                            ))}
                            { invoiceItems.length &&
                            <>
                                <tr>
                                    <td><b>Total:</b></td>
                                    <td colSpan={2}  className='rgt'><b>€ {invoiceItems.reduce((acc, item) => acc + (+item.price || 0), 0)} </b></td>
                                </tr>
                            </>}
                            { !invoiceItems.length && <>
                                <tr><td colSpan={2}>Nothing here yet.</td></tr>
                            </>}
                            </tbody>
                        </table>
                    </div>
                    { user.profile_type_id === Profiles.Management &&
                    <>
                    <div id='closeInvoice' className="row mb-5">
                        {/* <button className='btn btn-warning w-100' onClick={() => window.print()}>
                            Finish Invoice
                        </button> */}
                        <button className='btn btn-warning w-100' onClick={toggleModal}>
                            Finish Invoice
                        </button>
                    </div>
                    </>}
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog-centered">
                {/* <ModalHeader toggle={toggleModal}>Finish Invoice</ModalHeader> */}
                <ModalBody>
                {/* Conteúdo da sua modal aqui */}
                <div className='container'>
                <div className='row'>
                <div className='col-12'>
                    {/* Content second collun */}
                    <div class="row headerMd">
                        <div class="col-md-6 logoMd">
                            <img src={logo_gg} alt="Logo Ger's Garage" className="logo-img img-fluid" />
                        </div>
                        <div class="col-md-6 titMd text-left">
                            <div>Close Invoice</div>
                        </div>
                    </div>
                    {/* invoice list */}                    
                    {/* header */}
                    <div id='dataInvoiceMd' className="row GGtableMd">
                        <div>
                            <div className='container ivStyle'>
                                <div className='row'>
                                    <div className='row col-12'>
                                        <div className='col-6'>
                                            <b>Client: </b>{invoice.clientName}
                                        </div>
                                        <div className='col-6'>
                                            <b>Date: </b>{invoice.formatedDate}
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <b>Vehicle: </b>{invoice.vehicleModel}
                                    </div>
                                    <div className='col-12'>
                                        <b>Register: </b>{invoice.vehicleRegister}
                                    </div>
                                    <div className='col-12'>
                                        <b>Service: </b>{invoice.bookingType}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* list parts invoice */}
                    <div id='partListMd' className="row">
                        <p>Parts list</p>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th className='rgt'>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            {invoiceItems.map((row) => (
                                <tr key={row.id}>
                                    <td style={{ width: '60%' }} className='lft'>{row.name}</td>
                                    <td style={{ width: '40%' }} className='rgt'>€ {row.price}</td>
                                </tr>
                            ))}
                            { invoiceItems.length &&
                            <>
                                <tr>
                                    <td><b>Total:</b></td>
                                    <td colSpan={2}  className='rgt'><b>€ {invoiceItems.reduce((acc, item) => acc + (+item.price || 0), 0)} </b></td>
                                </tr>
                            </>}
                            { !invoiceItems.length && <>
                                <tr><td colSpan={2}>Nothing here yet.</td></tr>
                            </>}
                            </tbody>
                        </table>
                    </div>
                    <div id='closeInvoiceMd' className="row mb-5">
                        {/* <button className='btn btn-warning w-100' onClick={() => window.print()}>
                            Finish Invoice
                        </button> */}
                        <button className='btn btn-warning w-100' onClick={toggleModal}>
                            Pay
                        </button>
                    </div>
                </div>
                </div>
                </div>

                </ModalBody>
                {/* <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>
                    Close
                    </Button>
                    <Button color="primary" onClick={toggleModal}>
                    Confirm
                    </Button>
                </ModalFooter> */}
             </Modal>

        </div>
    );
}

export default Invoice;
