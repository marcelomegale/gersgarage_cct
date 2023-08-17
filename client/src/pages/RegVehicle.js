import React, { useState } from 'react';
import ImgRegVehicle from '../assets/img_RegVehicle.jpg';
import { Button, Input, Form, FormGroup } from 'reactstrap';

const RegVehicle = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className='container-fluid'>
        <div className='row'>
          <div id='ImgPg' className='col-7'>
            <img src={ImgRegVehicle} alt="Welcome" className='img-fluid'></img>
          </div> 
          <div id='register' className='col-5 align-items-center'>
            <div className="PgTitle">Register your vehicle</div>
            <div className="PgSubTitle">Hello [Name of client]</div>
            <div className="PgText">Here you can register your vehicle to facilitate appointments and quotes. You can also register as many vehicles as you have</div>
            <div className="GGform">
              <div className='GGtitleCard'>Vehicle form 1</div>
              <Form>
                <div className="row">
                  <div className="col-6">
                    <FormGroup>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Register"
                      />
                    </FormGroup>
                  </div>
                  <div className="col-6">
                    <FormGroup>
                      <select value={selectedOption} onChange={handleSelectChange} className="form-control">
                        <option value="">Type</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                      </select>
                    </FormGroup>
                  </div>
                </div>
                {/* linha 2 */}
                <div className="row">
                  <div className="col-6">
                    <FormGroup>
                      <select value={selectedOption} onChange={handleSelectChange} className="form-control">
                        <option value="">Brand</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                      </select>
                    </FormGroup>
                  </div>
                  <div className="col-6">
                    <FormGroup>
                      <select value={selectedOption} onChange={handleSelectChange} className="form-control">
                        <option value="">Engine</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                      </select>
                    </FormGroup>
                  </div>
                </div>
                {/* linha 3 */}
                <div className="row">
                  <div className="col-6">
                    <FormGroup>
                      <select value={selectedOption} onChange={handleSelectChange} className="form-control">
                        <option value="">Transmission</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                      </select>
                    </FormGroup>
                  </div>
                  <div className="col-6">
                    <FormGroup>
                      <select value={selectedOption} onChange={handleSelectChange} className="form-control">
                        <option value="">Model</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                      </select>
                    </FormGroup>
                  </div>
                </div>
                {/* linha 4 */}
                <div className="row">
                  <div className="col-6">
                    <FormGroup>
                      <select value={selectedOption} onChange={handleSelectChange} className="form-control">
                        <option value="">Brand</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                      </select>
                    </FormGroup>
                  </div>
                  <div className="col-6">
                  <FormGroup>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Color"
                      />
                    </FormGroup>
                  </div>
                </div>
                {/* linha 5 */}
                <div className="GroupBut d-flex justify-content-between">
                    <Button className="bot btn-lg" outline color="warning">Clear</Button>
                    <Button className="bot btn-lg" color="warning">Register</Button>
                </div>
                <div className="text-center mt-3">
                    <a href="/RegVehicle" className="link-primary">To register another vehicle?</a>
                </div>
              </Form>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default RegVehicle;
