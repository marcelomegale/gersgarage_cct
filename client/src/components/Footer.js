import React from 'react';
import Logo from '../assets/logo.png';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
    {/* Conteúdo do container */}
      <div className="container-fluid GGfooter">
            <div className="row GGFooterLine1">
                <div className="col-3 GGlogo"><img src={Logo} alt="Logo GG"/></div>
                <div className="col-6"></div>
                <div className="col-3">
                    <div className="col-sm-12 GGcontact">Ger's Garage contact</div>
                    <div className="row align-items-center d-flex align-items-start">
                        <div className="col-2 d-flex align-items-start">
                            <FaMapMarkerAlt size={24} className="GGicons" />
                        </div>
                        <div className="col-10">
                            Unit C, Kilmore Rd, Beaumont, Artane, Co. Dublin, DO5C7X8
                        </div>
                    </div>
                    <div className="row align-items-center itenContact">
                        <div className="col-2 d-flex align-items-start">
                            <FaPhone size={24} className="GGicons" />
                        </div>
                        <div className="col-10">
                            083 306-7751
                        </div>
                    </div>
                    <div className="row align-items-center itenContact">
                        <div className="col-2 d-flex align-items-start">
                            <FaEnvelope size={24} className="GGicons" />
                        </div>
                        <div className="col-10">
                            contact@gersgarage.ie
                        </div>
                    </div>
                </div>
            </div>
            <div className="row GGfooterBar d-flex justify-content-start">
                <div className="col-3 GGcopyrigths d-flex justify-content-start">
                © Ger's Garage copyrigths 2023
                </div>
                <div className="col-6"></div>
                <div className="col-3">
                    <div className="row">
                        <div className="col-md-6">
                            <p className='GGfolow'>Follow us:</p>
                        </div>
                        <div className="col-sm-2">
                            <FaFacebook size={24} className="GGicons" />
                        </div>
                        <div className="col-sm-2">
                            <FaTwitter size={24} className="GGicons"  />
                        </div>
                        <div className="col-sm-2">
                            <FaInstagram size={24} className="GGicons"  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;