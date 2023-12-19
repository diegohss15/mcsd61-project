import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AppNavbar from './Navbar';
import CardCreate from './Pages/CardCreate';
import { auth, db } from '../firebase';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';

//Function to get current date
function getCurrentDate() {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return currentDate.toLocaleDateString('en-US', options);
}

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const currentDate = getCurrentDate();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        //Authentication Verification
        navigate('/');
      }

      fetchUserData(authUser.uid);
    });

    const fetchUserData = async (authId) => {
      try {
        const documents = await getDocs(collection(db, 'users'));
        documents.forEach((document) => {
          const data = document.data();
          console.log('EQUALS ', data.authId === authId, data.authId, authId);

          if (data.authId === authId) {
            console.log('data', data);
            setUserData(data);
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

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div>
      <AppNavbar userName={userData?.name} />
      <Container className="mt-4">
        <Row>
          <Col md="auto">
            <Card>
              <Card.Body>
                <CardCreate />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Today: {currentDate}</Card.Title>
                <Card.Text>
                  <p>Hello, {userData?.name}! </p>
                  <p>Welcome to your dashboard!</p>
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <Card.Title>Supports Requested</Card.Title>
                <Card.Text>
                  New Feature: A interative chart for visual information about how many tickets has been created and their status.
                  <br /> <br />A visual tool to compare how many tickets are open and how many are closed.
                </Card.Text>
                <Card.Img src="https://www.thebritishacademy.ac.uk/media/images/Infographics_Update_.width-1000.jpg" alt="Graphic Image" />
              </Card.Body>
            </Card>
            <br />
            <Card>
              <Card.Body>
                <Card.Title>How about live chat?</Card.Title>
                <Card.Text>
                  I found one API to create a kind of live chat.
                  <br /> <br />It is optional... only if we have time, if not, keep only the tickets card
                </Card.Text>
              </Card.Body>
             
            </Card>
            <br/>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Dashboard;
