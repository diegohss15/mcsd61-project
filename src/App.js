import React from 'react';
import './App.css';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Helpdesk Tickets</h1>
      </header>
      <main className='body'>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
