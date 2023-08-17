/* eslint-disable no-unused-vars */
import React from 'react';
import { Accordion, Button } from 'reactstrap';


const MyJumbotron = (props) => {
  return (
    <Accordion>
      <h1 className="display-4">Welcome to My Website</h1>
      <p className="lead">This is a sample website with a Jumbotron.</p>
      <hr className="my-2" />
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <p className="lead">
        <Button color="primary">Learn More</Button>
      </p>
    </Accordion>
  );
};

export default MyJumbotron;
