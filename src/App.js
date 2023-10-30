import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import Navbar from './Components/TopBar';
import Dashboard from './Components/pages/Dashboard';
import NewTicket from './Components/pages/NewTicket';
import Profile from './Components/pages/profile';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Forgot from "./Components/Forgot";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={Forgot} />
        <Route path="/" component={Login} />
      </Routes>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <h1 class="text-center">Helpdesk Tickets</h1>
        </header>
        <main className='body'>
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-ticket" element={<NewTicket />} />
            <Route path="/profile" element={<Profile/>} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;