import React, { useState } from 'react'
import AddTicketForm from '../ProjectDashboard/AddTicketForm/AddTicketForm';
import AddProjectForm from '../ProjectDashboard/AddProjectForm/AddProjectForm';
import Modal from '../../components/Modal/Modal';
import { BsPlusSquare } from 'react-icons/bs'

import './HomePage.css';
const HomePage = () => {

    const [ showAddTicket, setShowAddTicket ] = useState<boolean>(false);
    const [ showAddProject, setShowAddProject ] = useState<boolean>(false);

  return (<>
    { showAddTicket && <Modal closeModal={setShowAddTicket}> <AddTicketForm closeModal={setShowAddTicket} /> </Modal>}
    { showAddProject && <Modal closeModal={setShowAddProject}> <AddProjectForm closeModal={setShowAddProject} /> </Modal>}

    <div className='HomePage'>

        <div>
            <div className='HomePage-Title'>
                Welcome to MANA!
            </div>
            <hr />
            <div className='HomePage-SubTitle'>
                Search for a Project or a Ticket from the nav bar above!
            </div>
            <div className='HomePage-Create'>
                Or, create a new Project or Ticket below!
            </div>
            <div className='HomePage-Buttons'>
                <button onClick={() => setShowAddTicket(true)}> <BsPlusSquare /> Ticket</button>
                <button onClick={() => setShowAddProject(true)}> <BsPlusSquare /> Project</button>
            </div>
        </div>

    </div>
  </>)
}

export default HomePage