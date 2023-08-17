import React from 'react';
import Banner from '../components/Banner';
import Container from '../components/Container';

const Home = () => {

    return (
      <div id='teste' className='row'>

          <div className='container-fluid'>
            <Banner></Banner>
            <Container></Container>
          </div>
      </div>
      
    );
  }
  
  export default Home;