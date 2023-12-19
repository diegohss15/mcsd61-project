import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Pages/Profile';
import EditProfile from './Components/Pages/EditProfile';
import Layout from './Layout';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import TicketAssess from './Components/Pages/TicketAssess';
import NewTicket from './Components/Pages/NewTicket';
import MyTickets from './Components/Pages/MyTickets';
import TicketHistory from './Components/Pages/TicketHistory';

function App() {
  return (
    <Router>
      <Routes path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/TicketAssess" element={<TicketAssess />} />
        <Route path="/MyTickets" element={<MyTickets />} />
        <Route path="/NewTicket" element={<NewTicket />} />
        <Route path="/TicketHistory" element={<TicketHistory />} />

      </Routes>
    </Router>
  );
}

export default App;
