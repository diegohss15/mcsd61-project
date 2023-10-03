import React from 'react';
import { Link } from 'react-router-dom'; // To Import Link
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
          <Link to="/"> <Navbar.Brand>Task Manager</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">Dashboard</Link> {/*Link*/}
              <Nav.Link href="#pricing">Something else</Nav.Link>
              

              <Link to="/new-ticket" className="nav-link"> {/*Here I wrapped the button with Link to work*/}
                <Button variant="success">+ New Ticket</Button>
              </Link>
              <br />
            </Nav>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Username
              </Dropdown.Toggle>
              <Dropdown.Menu>
                 <Dropdown.Item href="/profile">Profile</Dropdown.Item> {/*Here I used the HTML href and it worked, so no need Link?*/}
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
