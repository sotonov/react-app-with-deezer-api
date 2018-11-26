import React from 'react';
import { Navbar } from 'react-bootstrap';

const header = (props) => {
  return(
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          Music Master from App
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
}

export default header;
