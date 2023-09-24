import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

function TopBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#home">React Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Dashboard</Nav.Link>
              <Nav.Link href="#features">New Ticket</Nav.Link>
              <Nav.Link href="#pricing">Something else</Nav.Link>
              <Button variant="success">+ New Ticket</Button>
              <br/>
            </Nav>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Username
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another Option</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
