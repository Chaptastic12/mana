import React, { useState, useContext } from 'react'

import { UserContext } from '../../Context/User-Context';
import { ProjectTicketContext } from '../../Context/ProjectTicket-Context';

import DataList from '../UI Elements/DataList/DataList';
import DropDown from '../UI Elements/DropDown/DropDown';

import './HeaderBar.css';
import { UserContextInterface, ProjectContextInterface } from '../../models/models';

const HeaderBar = () => {

    const [ selectedProject, setSelectedProejct ] = useState('');
    const [ selectedTicket, setSelectedTicket ] = useState('');
    const { logoutUser } = useContext(UserContext) as UserContextInterface;
    const { allProjects, allTickets } = useContext(ProjectTicketContext) as ProjectContextInterface;

    const USER_OPTIONS = [ { name: 'Profile', link: '/user/profile', useButton: false, onClick: () => { return } }, { name: 'Settings', link: '/users/settings', useButton: false, onClick: () => { return }  }, { name: 'Logout', link: '/auth/logout', useButton: true, onClick: () => logoutUser() }  ]

  return (
    <div className='HeaderBar'>
        <div className='HeaderBar__Left'>
            <DataList value={selectedProject} setValue={setSelectedProejct} placeholder='Project Search...' id='projects' name='projects' listName='projectSearch' data={allProjects} useInDropDown='projectName' link='/dashboard/'/>
        </div>
        <div className='HeaderBar__Right'>
            <DataList value={selectedTicket} setValue={setSelectedTicket} placeholder='Ticket Search...' id='tickets' name='tickets' listName='ticketSearch' data={allTickets} useInDropDown='title' link='/ticket/'/>

            <DropDown data={USER_OPTIONS} title='User'/>
        </div>
    </div>
  )
}

export default HeaderBar