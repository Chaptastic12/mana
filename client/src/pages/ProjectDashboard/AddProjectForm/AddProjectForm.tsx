import React, { useState } from 'react'

import { IoIosCloseCircleOutline } from 'react-icons/io'
import ErrorBar from '../../../components/ErrorBar/ErrorBar'
import { ALLPROJECTS } from '../../../DummyData';
import { v4 as uuid } from 'uuid';

import './AddProjectForm.css';

export interface Props {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const AddProjectForm = (props: Props) => {

    let date = new Date();
    let formatdate = date.toLocaleDateString();
    const [ error, setError ] = useState<string>('');
    const [ projectData, setProjectData ] = useState({ id: uuid().toString(), projectReference: '', projectName: '', tickets: [], createdDate: formatdate });

    const fieldsAreValidated = () => {
        //Verify projectName and projectReference do not already exist;
        //Verify that they are not empty

        const verifyProjectName = ALLPROJECTS.filter(x => x.projectName === projectData.projectName).length > 0;
        const verifyProjectReference = ALLPROJECTS.filter(x => x.projectReference === projectData.projectReference).length > 0;

        if(verifyProjectName || verifyProjectReference === true){
            setError('Entered in Name or Reference in use; Please set a new one.');
            return
        }
        if(projectData.projectReference.length < 3 || projectData.projectName.length < 5 ){
            setError('Please enter in a Reference that is 3 characters or longer, or a Name more than 5 characters.');
            return;
         }
    
         ALLPROJECTS.push({...projectData, tickets: [] });
         props.closeModal(false);
    }

  return (
    <div className='AddProjectForm'>
        <div className='AddProjectForm__Header'>
            <div className='Title'><h1>Create Project</h1></div>
            <div className='Close' onClick={() => props.closeModal(false) }> <IoIosCloseCircleOutline /> </div>
            <hr style={{ width: '95%' }}/>
        </div>
        { error && <div className='AddProjectForm__Error'><ErrorBar errorMsg={error}/> </div>}
        <div className='AddProjectForm__Form'>
            <div className='Input'>
                <label>Project Name</label>
                <input type='text' placeholder='Project Name' value={projectData.projectName} onChange={(e) => setProjectData({ ...projectData, projectName: e.target.value }) }  /> 
            </div>
            <div className='Input'>
                <label>Project Reference </label>
                <input type='text' placeholder='Project Reference' value={projectData.projectReference} onChange={(e) => setProjectData({ ...projectData, projectReference: e.target.value }) }  /> 
            </div>
        </div>
        <div className='AddProjectForm__Button'>
            <button onClick={() => fieldsAreValidated()}>Submit</button>
            <button onClick={() => props.closeModal(false)}>Close</button>
        </div>
    </div>
  )
}

export default AddProjectForm