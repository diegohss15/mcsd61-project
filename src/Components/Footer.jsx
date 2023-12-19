import React from 'react';
import {
  MDBFooter,
  MDBContainer
  
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <MDBContainer className='p-4'>

        <section className='mb-4'>
          <p>Internal Support Request System</p>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023: <br/>
        <a className='text-white' href='https://reactproject2023.000webhostapp.com/'>
        www.reactproject2023.000webhostapp.com/
        </a>
      </div>
    </MDBFooter>
  );
}