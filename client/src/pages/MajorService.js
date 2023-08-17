import Head from "../components/Head";
import Footer from "../components/Footer";
import ImgMajorService from '../assets/img_MajorService.jpg';
import FtMajorService from '../assets/ft_MajorService.jpg';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

const MajorService = () => {
  return (
    <div>
      <Head></Head>
      <div className='container-fluid'>
        <div className='row'>
          <div id='register' className='col-6 align-items-center'>
            <div className="PgTitle">Major Service</div>
            <div className="PgSubTitle">Detailed inspections and maintenance</div>
            <div className="PgText">Our Major Service is designed to give your vehicle a comprehensive maintenance overhaul. It goes beyond the regular check-up and includes thorough inspections, fluid replacements, and component adjustments. Our skilled technicians will meticulously examine your vehicle's systems, ensuring that each part is functioning optimally. Whether it's the engine, brakes, suspension, or other critical components, our Major Service ensures your vehicle receives the attention it deserves to perform at its best.</div>
            <div id="boxInfo" className='row'>
                <div className="col-6">
                    <ul className="ServList">
                        <li>Checkups</li>
                        <li>Fluid exchange</li>
                        <li>Brake inspections</li>
                        <li>Air conditioning</li>
                        <li>Electrical review</li>
                        <li>Exhaust</li>
                        <li>Lights review</li>
                        <li>Wheel alignments</li>
                    </ul> 
                </div>
                <div className="col-6">
                    <div className="picService">
                        <img src={FtMajorService} alt="Annual Services"></img>
                    </div>
                </div>
            </div>
            {/*<div className="row box-price">*/}
            {/*    <div className="col-6 fontPrice">€ 150,00</div>*/}
            {/*    <div className="col-6">*/}
            {/*        <div className="cl_Button">*/}
            {/*        <Link to="/login">*/}
            {/*            <Button color="warning">Make a booking</Button>*/}
            {/*        </Link>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
          </div>  
          <div id='ImgPg' className='col-6'>
            <img src={ImgMajorService} alt="Welcome" className='img-fluid'></img>
          </div> 
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MajorService;
