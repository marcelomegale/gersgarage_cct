import ImgMajorRepair from '../assets/img_MajorRepair.jpg';
import FtMajorRepair from '../assets/ft_MajorRepair.jpg';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

const MajorRepair = () => {
  return (
    <div>
      <div className='container-fluid'>
        <div className='row'>
          <div id='register' className='col-6 align-items-center'>
            <div className="PgTitle">Major Repair</div>
            <div className="PgSubTitle">Be carefree all year round</div>
            <div className="PgText">When your vehicle requires significant repairs, our experienced team is here to help. Our Major Repair service covers a wide range of complex mechanical issues. From engine overhauls to transmission repairs, we have the expertise and state-of-the-art equipment to tackle the most challenging problems. We'll diagnose the issue, provide a detailed repair plan, and work diligently to get your vehicle back on the road safely and efficiently. Trust us to handle your major repairs with precision and care.</div>
            <div id="boxInfo" className='row'>
                <div className="col-6">
                    <ul className="ServList">
                        <li>Automatic transmission</li>
                        <li>Manual gear</li>
                        <li>Engine overhaul</li>
                        <li>Head replacement</li>
                        <li>Suspension</li>
                        <li>Cooling system</li>
                        <li>Electronic injection</li>
                        <li>Electrical systems</li>
                        <li>Lanterns and bodywork</li>
                    </ul> 
                </div>
                <div className="col-6">
                    <div className="picService">
                        <img src={FtMajorRepair} alt="Major Repair"></img>
                    </div>
                </div>
            </div>
            {/*<div className="row box-price">*/}
            {/*    <div className="col-6 fontPrice">€ 250,00</div>*/}
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
            <img src={ImgMajorRepair} alt="Welcome" className='img-fluid'></img>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default MajorRepair;
