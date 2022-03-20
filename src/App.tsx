import React from 'react';

import './App.css';

import ProjectDashBoard from './pages/ProjectDashboard/ProjectDashBoard';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className='App'>
      <div className='NavBar'>
        <NavBar />
      </div>
      <div className='Page'>
        <ProjectDashBoard />
      </div>
    </div>
  )
}

export default App;
