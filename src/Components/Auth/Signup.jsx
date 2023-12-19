import React, { useState } from "react";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from 'firebase/firestore';
import { Button } from "react-bootstrap";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [role, setRole] = useState('');

  const signupWithUsernameAndPassword = async (e) => {
    e.preventDefault();

    var userData = {
      name: name,
      bio: bio,
      email: email,
      location: location,
      role: role,
      authId: "",
    }

    if (password === confirmPassword) {
      try {
        var authentication = await createUserWithEmailAndPassword(auth, email, password);
        userData.authId = authentication.user.uid;
        await addDoc(collection(db, 'users'), userData);
        navigate("/Dashboard");
      } catch {
        setNotice("Sorry, something went wrong. Please try again.");
      }
    } else {
      setNotice("Passwords don't match. Please try again.");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px', boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign up</h2>
              <p className="text-white-50 mb-3">Create an account to get started!</p>

              {notice && (
                <div className="alert alert-warning" role="alert">
                  {notice}
                </div>
              )}

              <MDBInput wrapperClass='mb-3' placeholder="Name" id='signupName' type='text' value={name} onChange={(e) => setName(e.target.value)} />
              <MDBInput wrapperClass='mb-3' placeholder="Location" id='signupLocation' type='text' value={location} onChange={(e) => setLocation(e.target.value)} />
              <MDBInput wrapperClass='mb-3' placeholder="Position" id='signupRole' type='text' value={role} onChange={(e) => setRole(e.target.value)} />
              <MDBInput wrapperClass='mb-3' placeholder="Bio" id='signupBio' type='text' value={bio} onChange={(e) => setBio(e.target.value)} />

              <MDBInput wrapperClass='mb-3' placeholder="Email"  id='signupEmail' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-3' placeholder="Password"  id='signupPassword' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <MDBInput wrapperClass='mb-4' placeholder="Confirm Password" id='confirmPassword' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

              <Button className='w-100 mb-3' size='lg' onClick={(e) => signupWithUsernameAndPassword(e)}>
                Sign up
              </Button>

              <div className="text-center">
                <span>Already have an account? <Link to="/">Login here.</Link></span>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;