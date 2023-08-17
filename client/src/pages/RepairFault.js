import ImgRepairFault from '../assets/img_RepairFault.jpg';
import FtRepairFault from '../assets/ft_RepairFault.jpg';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

const RepairFault = () => {
  return (
    <div>
      <div className='container-fluid'>
        <div className='row'>
          <div id='register' className='col-6 align-items-center'>
            <div className="PgTitle">Repair / Fault</div>
            <div className="PgSubTitle">Quick emergency fixes</div>
            <div className="PgText">When your vehicle encounters a specific repair or fault, our team is here to diagnose and resolve the issue. We have the expertise to handle a wide range of mechanical faults, from electrical problems to faulty components. Our technicians will conduct a detailed inspection, identify the source of the problem, and provide efficient and reliable repairs. We understand the inconvenience of unexpected faults, so count on us to get your vehicle back on track quickly and effectively.</div>
            <div id="boxInfo" className='row'>
                <div className="col-6">
                    <ul className="ServList">
                        <li>Electrical system</li>
                        <li>Hydraulic system</li>
                        <li>General mechanics</li>
                        <li>Tire shop</li>
                        <li>Lanterns and Painting</li>
                        <li>Radiators</li>
                    </ul> 
                </div>
                <div className="col-6">
                    <div className="picService">
                        <img src={FtRepairFault} alt="Annual Services"></img>
                    </div>
                </div>
            </div>
            {/*<div className="row box-price">*/}
            {/*    <div className="col-6 fontPrice">€ 100,00</div>*/}
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
            <img src={ImgRepairFault} alt="Welcome" className='img-fluid'></img>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default RepairFault;
