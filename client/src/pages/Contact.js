import ImgContact from '../assets/img_Contact.jpg';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';


const Contact = () => {
    return (
        
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div id='ImgPg' className='col-6'>
                        <img src={ImgContact} alt="Wellcome" className='img-fluid'></img>
                    </div> 
                    <div id='Contact' className='col-6 align-items-center'>
                        <div className="PgTitle">Contact</div>
                        <div className="PgSubTitle">Get in touch with us and make an appointment</div>
                        <div className="PgText">We're here to help with all your automotive needs. Whether you have questions about our services, want to schedule an appointment, or need assistance with your vehicle, our team is ready to assist you.</div>
                        <div className="GGform">
                            <div className="row">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div className="col-1">
                                                <FaMapMarkerAlt size={24} className="GGicons" />
                                            </div>
                                            <div className="col-11">
                                                Unit C, Kilmore Rd, Beaumont, Artane, Co. Dublin, DO5C7X8
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div className="col-1">
                                                <FaPhone size={24} className="GGicons" />
                                            </div>
                                            <div className="col-11">
                                                083 306-7751
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div className="col-1">
                                                <FaEnvelope size={24} className="GGicons" />
                                            </div>
                                            <div className="col-11">
                                                contact@gersgarage.ie
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
        
    );
};

export default Contact;