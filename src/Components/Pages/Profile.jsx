import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppNavbar from '../Navbar';
import { auth, db } from '../../firebase';
import { getDocs, collection } from 'firebase/firestore';

const Profile = () => {
  const [userData, setUserData] = useState(null);
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
          if (data.authId === authId){
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

  return (
    <div>
      <AppNavbar />

      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '110px' }}>
                    <img
                      src="https://images.pexels.com/photos/18466844/pexels-photo-18466844/free-photo-of-fashion-sunglasses-people-woman.jpeg"
                      alt="Profile Image"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: '120px', zIndex: 1 }}
                    />
                   <Link to="/EditProfile" className="btn btn-outline-dark" style={{ zIndex: 1 }}>
                      Edit profile
                    </Link>
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px' }}>
  {userData && (
    <>
      <h5>{userData?.name}</h5>
      <p>{userData?.location}</p>
    </>
  )}
</div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0">Photos</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">1026</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">478</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <ProfileSection title="Department">
                    <p className="font-italic mb-1">{userData?.role || 'No Department'}</p>
                  </ProfileSection>

                  <ProfileSection title="Bio">
                    <p className="font-italic mb-1">{userData?.bio || 'No bio completed'}</p>
                  </ProfileSection>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileSection = ({ title, children }) => (
  <div className="mb-5">
    <p className="lead fw-normal mb-1">{title}</p>
    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
      {children}
    </div>
  </div>
);

const renderPhotos = (photoUrls) =>
  photoUrls.map((url, index) => (
    <div className="col mb-2" key={index}>
      <img src={url} alt={`Image ${index + 1}`} className="w-100 rounded-3" />
    </div>
  ));

export default Profile;