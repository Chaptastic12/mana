import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css';

import ProjectDashBoard from './pages/ProjectDashboard/ProjectDashBoard';
import NavBar from './components/NavBar/NavBar';
import { UserContext } from './Context/User-Context';
import HeaderBar from './components/HeaderBar/HeaderBar';
import TicketDetails from './pages/TicketDetails/TicketDetails';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import UserProfile from './pages/UserProfile/UserProfile';
import ProjectTicketProvider from './Context/ProjectTicket-Context';
import { UserContextInterface } from './models/models'

export interface Context {
    user: {
      username: string
    },
    loginUser: () => void,
    logoutUser: () => void,
    registerUser: () => void
}

function App() {

  const { user } = React.useContext(UserContext) as UserContextInterface;

  return (
    <BrowserRouter>
      <ProjectTicketProvider>
          <div className='App'>
            { user.username !== '' ? <>
              <div className='NavBar'>
                <NavBar />
              </div>
              <div className='Page'>
                <HeaderBar />
                <Routes>
                  <Route path='/' element={ <HomePage /> } />
                  <Route path='/dashboard/:projectReference' element={ <ProjectDashBoard /> } />
                  <Route path='/ticket/:projectReference' element={ <TicketDetails /> } />
                  <Route path='/user/profile' element={ <UserProfile /> } />
                </Routes>
              </div>
            </> : <>
              <LoginPage />
            </> }
          </div>
        </ProjectTicketProvider>
    </BrowserRouter>
  )
}

export default App;
