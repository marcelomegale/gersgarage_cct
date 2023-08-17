import ImgAnnualService from '../assets/img_AnnualService.jpg';
import FtAnnualService from '../assets/ft_AnnualService.jpg';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

const AnnualService = () => {
  return (
    <div>
      <div className='container-fluid'>
        <div className='row'>
          <div id='register' className='col-6 align-items-center'>
            <div className="PgTitle">Annual Service</div>
            <div className="PgSubTitle">Be carefree all year round</div>
            <div className="PgText">At our garage, we offer an Annual Service to ensure your vehicle remains in optimal condition throughout the year. Our skilled technicians will perform a comprehensive inspection, checking vital components such as brakes, suspension, fluids, and electrical systems. We'll replace filters, perform necessary maintenance tasks, and provide a thorough assessment of your vehicle's overall health. With our Annual Service, you can have peace of mind knowing your vehicle is well-maintained and ready for the road ahead.</div>
            <div id="boxInfo" className='row'>
                <div className="col-6">
                    <ul className="ServList">
                        <li>Engine Oil and Oil Filter</li> 
                        <li>Air Filter</li> 
                        <li>Cabin Air Filter</li> 
                        <li>Spark Plugs</li> 
                        <li>Fuel Filter</li> 
                        <li>Brake Pads and Discs</li>
                        <li>Tire Rotation</li>
                        <li>Fluids</li> 
                        <li>Battery</li>
                        <li>Belts and Hoses</li>
                    </ul> 
                </div>
                <div className="col-6">
                    <div className="picService">
                        <img src={FtAnnualService} alt="Annual Services"></img>
                    </div>
                </div>
            </div>
            {/*<div className="row box-price">*/}
            {/*    <div className="col-6 fontPrice">€ 380,00</div>*/}
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
            <img src={ImgAnnualService} alt="Welcome" className='img-fluid'></img>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default AnnualService;
