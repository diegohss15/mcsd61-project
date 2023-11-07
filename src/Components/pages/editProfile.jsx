import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';


function EditProfile() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  
  const handleSave = async () => {
    try {
     const profileData = {
       name,
       location,
       bio,
     };
    
     const docRef = await addDoc(collection(db, 'users'), profileData);

     console.log('Document written with ID:', docRef.id);
    } catch (error) {
     console.error ('Error adding document:', error);
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
    <div className="container py-5">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea
            className="form-control"
            id="bio"
            value={bio}
            onChange={handleBioChange}
          />
        </div>
        <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default EditProfile;
