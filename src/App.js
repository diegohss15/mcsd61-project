import React from 'react';
import './App.css';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <h1>Tickets Dashboard</h1>
      </header>

      <main className='body'>
        <Dashboard />
      </main>

    </div>
  );
}

export default App;