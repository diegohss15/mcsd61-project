import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Import react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProfile() {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        // If no user is logged in, redirect to login
        navigate('/');
      }

      fetchUserData(authUser.uid);
    });

    const fetchUserData = async (authId) => {
      try {
        const documents = await getDocs(collection(db, 'users'));
        documents.forEach((document) => {
          const data = document.data();
          const id = document.id;
          if (data.authId === authId) {
            setName(data.name);
            setLocation(data.location);
            setBio(data.bio);
            setUserId(id);
          }
        });
      } catch (error) {
        alert(error);
        console.error(error);
      }
    };

    return () => {
      fetchData();
    };
  }, [navigate]);

  const handleSave = async () => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        name,
        location,
        bio,
      });

      // Show a success notification
      toast.success('Profile updated!', { position: 'top-right' });
    } catch (error) {
      console.error('Error updating userId:', userId);
      console.error(error);
      // Show an error notification
      toast.error('Error updating profile!', { position: 'top-right' });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <AppNavbar />
      <Container className="mt-4 d-flex justify-content-center">
        <div className="cards">
          <Card className="custom-card" style={{ width: '42rem' }}>
            <Card.Header>
              <Nav variant="pills" defaultActiveKey="#first">
                <Nav.Item>
                  <Link to="/Dashboard" className="nav-link">
                    <Button variant="primary">Go back</Button>
                  </Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>Edit Profile</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Card.Text>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control as="textarea" rows={3} name="bio" value={bio} onChange={handleBioChange} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={location}
                      onChange={handleLocationChange}
                      placeholder="Enter your location"
                      required
                    />
                  </Form.Group>

                  <button type="button" onClick={handleSave} className="btn btn-success">
                    Save
                  </button>
                  &nbsp;&nbsp;&nbsp;
                </Card.Text>
              </Form>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted"></small>
            </Card.Footer>
          </Card>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default EditProfile;
