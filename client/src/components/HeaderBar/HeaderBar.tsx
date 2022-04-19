import React, { useState, useContext } from 'react'

import { ALLPROJECTS, TICKETS } from '../../DummyData';
import { UserContext } from '../../Context/User-Context';

import DataList from '../UI Elements/DataList/DataList';
import DropDown from '../UI Elements/DropDown/DropDown';

import './HeaderBar.css';
import { UserContextInterface } from '../../models/models';

const HeaderBar = () => {

    const [ selectedProject, setSelectedProejct ] = useState('');
    const [ selectedTicket, setSelectedTicket ] = useState('');
    const { logoutUser } = useContext(UserContext) as UserContextInterface;

    const USER_OPTIONS = [ { name: 'Profile', link: '/users/profile', useButton: false, onClick: () => { return } }, { name: 'Settings', link: '/users/settings', useButton: false, onClick: () => { return }  }, { name: 'Logout', link: '/auth/logout', useButton: true, onClick: () => logoutUser() }  ]

  return (
    <div className='HeaderBar'>
        <div className='HeaderBar__Left'>
            <DataList value={selectedProject} setValue={setSelectedProejct} placeholder='Project Search...' id='projects' name='projects' listName='projectSearch' data={ALLPROJECTS} useInDropDown='projectName' link='/dashboard/'/>
        </div>
        <div className='HeaderBar__Right'>
            <DataList value={selectedTicket} setValue={setSelectedTicket} placeholder='Ticket Search...' id='tickets' name='tickets' listName='ticketSearch' data={TICKETS} useInDropDown='title' link='/ticket/'/>

            <DropDown data={USER_OPTIONS} title='User'/>
        </div>
    </div>
  )
}

export default HeaderBar