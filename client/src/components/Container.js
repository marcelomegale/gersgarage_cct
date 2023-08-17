import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Assessories from '../assets/assessories.jpg';
import AutoParts from '../assets/auto_parts.jpg';
import VW from '../assets/VW 1.png';
import BMW from '../assets/bmw 1.png';
import Mercedez from '../assets/mercedez 1.png';
import Nissan from '../assets/nissan 1.png';
import Toyota from '../assets/toyota 1.png';
import Opel from '../assets/opel 1.png';
import Hyundai from '../assets/hyundai 1.png';
import Ford from '../assets/ford 1.png';

const Container = () => {
  return (
    <>
        <div id='bodyA' className="container-fluid bodyContent">
        {/* Conteúdo do container */}
        <div className='row GGtitle'>
        Choose the service of your choice and schedule an appointment
        </div>
        <div className="row">
            <div className="col-6">
                <div id='GGcardInfo'>
                    <div className='GGtitleCard'>Annual Service</div>
                    <div className='GGtextCard'>
                        <p>At our garage, we offer an Annual Service to ensure your vehicle remains in optimal condition throughout the year. Our skilled technicians will perform a comprehensive inspection, checking vital components</p>
                    </div>
                    <div>
                        <Link to="/AnnualService">
                            <Button outline color="warning">Learn more</Button>{' '}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div id='GGcardInfo'>
                    <div className='GGtitleCard'>Major Repair</div>
                    <div className='GGtextCard'>
                        <p>When your vehicle requires significant repairs, our experienced team is here to help. Our Major Repair service covers a wide range of complex mechanical issues. </p>
                    </div>
                    <div>
                        <Link to="/MajorRepair">
                            <Button outline color="warning">Learn more</Button>{' '}
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-6">
                <div id='GGcardInfo'>
                    <div className='GGtitleCard'>Major Service</div>
                    <div className='GGtextCard'>
                        <p>Our Major Service is designed to give your vehicle a comprehensive maintenance overhaul. It goes beyond the regular check-up and includes thorough inspections, fluid replacements, and component adjustments</p>
                    </div>
                    <div>
                        <Link to="/MajorService">
                            <Button outline color="warning">Learn more</Button>{' '}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div id='GGcardInfo'>
                    <div className='GGtitleCard'>Repair / Fault</div>
                    <div className='GGtextCard'>
                        <p>When your vehicle encounters a specific repair or fault, our team is here to diagnose and resolve the issue. We have the expertise to handle a wide range of mechanical faults, from electrical problems to faulty components.</p>
                    </div>
                    <div>
                        <Link to="/RepairFault">
                            <Button outline color="warning">Learn more</Button>{' '}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div id='bodyB' className='container-fluid'>
            <div className='row'>
                <div className='col-6'>
                    <img src={Assessories} alt="Assessories Shop" className='img-fluid'></img>
                </div>
                <div className='col-6 d-flex align-items-center'>
                    <div id='GGcardInfo' className='text-left'>
                        <div className='GGtitleCard'>Local and online vehicle accessories store</div>
                        <div className='GGtextCard'>
                            <p>Explore our wide selection of high-quality accessories designed to improve functionality, style, and overall driving experience. From practical essentials to stylish upgrades, discover the perfect accessories to make your car truly yours</p>
                        </div>
                        <div>
                            <Link to="/MajorRepair">
                                <Button outline color="warning">Learn more</Button>{' '}
                            </Link>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
        <div id='bodyC' className='container-fluid'>
            <div className='row'>
                <div className='col-6 d-flex align-items-center'>
                    <div id='GGcardInfo' className='text-left'>
                        <div className='GGtitleCard'>Sale and supply of spare parts for vehicles</div>
                        <div className='GGtextCard'>
                            <p>Whether you're looking for essential components or seeking to upgrade and optimize your car's performance. Explore our range of high-quality parts, sourced from trusted manufacturers, to ensure reliability and durability for your vehicle.</p>
                        </div>
                        <div><Button outline color="warning">Buy now</Button>{' '}</div>
                    </div>
                </div>
                <div className='col-6'>
                    <img src={AutoParts} alt="Assessories Shop" className='img-fluid'></img>
                </div>   
            </div>
        </div>
        <div id='bodyD' className="container-fluid">
            {/* Conteúdo do container */}
            <div className='row GGtitle'>
            Garage licensed by manufacturers
            </div>
            <div className='row GGtext'>
            Specialized professionals, certified and trained at the factory for better maintenance of your vehicle
            </div>
            <div className='container'>
                <div className="row GGBrands">
                    <div className='col-3'><img src={VW} alt="Logo VW" className="img-fluid"></img></div>
                    <div className='col-3'><img src={Mercedez} alt="Logo Mercedez" className="img-fluid"></img></div>
                    <div className='col-3'><img src={BMW} alt="Logo BMW" className="img-fluid"></img></div>
                    <div className='col-3'><img src={Nissan} alt="Logo Nissan" className="img-fluid"></img></div>
                </div>
                <div className="row GGBrands">
                    <div className='col-3'><img src={Toyota} alt="Logo Toyota" className="img-fluid"></img></div>
                    <div className='col-3'><img src={Opel} alt="Logo Opel" className="img-fluid"></img></div>
                    <div className='col-3'><img src={Hyundai} alt="Logo Hyundai" className="img-fluid"></img></div>
                    <div className='col-3'><img src={Ford} alt="Logo Ford" className="img-fluid"></img></div>
                </div>
            </div>
            

        </div>
        <div id='bodyE' className='container-fluid'>
            <div className='row'>
                <div className='col-8 d-flex align-items-center'>
                    <div id='GGcardInfo' className='text-left'>
                        <div className='GGtext'>
                            <p>Click here, register and schedule a review for your vehicle. On the first access you get a gift for your car</p>
                        </div>
                    </div>
                </div>
                <div className='col-4 d-flex align-items-center'>
                    <div>
                        <Button outline color="warning">Join Today</Button>{' '}
                        <Button color="warning">Contact us</Button>{' '}
                    </div>
                </div>   
            </div>
        </div>
    </>
  );
};

export default Container;