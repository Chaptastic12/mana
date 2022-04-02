import React, { useState } from 'react'

import { ALLPROJECTS, TICKETS } from '../../DummyData';

import DataList from '../UI Elements/DataList/DataList';
import DropDown from '../UI Elements/DropDown/DropDown';

import './HeaderBar.css';

const HeaderBar = () => {

    const [ selectedProject, setSelectedProejct ] = useState('');
    const [ selectedTicket, setSelectedTicket ] = useState('');

    const USER_OPTIONS = [ { name: 'Profile', link: '/users/profile' }, { name: 'Settings', link: '/users/settings' }, { name: 'Logout', link: '/auth/logout' }  ]

  return (
    <div className='HeaderBar'>
        <div className='HeaderBar__Left'>
            <DataList value={selectedProject} setValue={setSelectedProejct} placeholder='Project Search...' id='projects' name='projects' listName='projectSearch' data={ALLPROJECTS} useInDropDown='projectName' link='/dashboard/'/>
        </div>
        <div className='HeaderBar__Right'>
            <DataList value={selectedTicket} setValue={setSelectedTicket} placeholder='Ticket Search...' id='tickets' name='tickets' listName='ticketSearch' data={TICKETS} useInDropDown='title' link='/dashboard/'/>

            <DropDown data={USER_OPTIONS} title='User'/>
        </div>
    </div>
  )
}

export default HeaderBar