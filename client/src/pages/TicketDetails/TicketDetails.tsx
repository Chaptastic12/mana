import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BsPlusSquare } from 'react-icons/bs'

import { Comment, Ticket, ProjectContextInterface, UserContextInterface } from '../../models/models';
import { ProjectTicketContext } from '../../Context/ProjectTicket-Context';
import { UserContext } from '../../Context/User-Context';

import CommentDiv from '../../components/Comment/Comment';
import EditableInput from '../../components/EditableInput/EditableInput';
import { TICKETS, DUMMY_TICKET, BLANKUSER } from '../../DummyData';

import './TicketDetails.css'
import ErrorBar from '../../components/ErrorBar/ErrorBar';
import DataListEdit from '../../components/UI Elements/DataList/DataListEdit';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/UI Elements/Button/Button';
import { randomUUID } from 'crypto';

const TicketDetails = () => {

    const { projectReference } = useParams();
    const [ ticket, setTicket ] = useState(DUMMY_TICKET);
    const [ commentText, setCommentText ] = useState('');
    const [ refresh, setRefresh ] = useState(false);
    const [ users, setUsers ] = useState([BLANKUSER]);
    const [ error, setError ] = useState('');
    const [ showModal, setShowModal ] = useState(false);
    const { getChosenTicket, updateTicketInformation, deleteTicket, addCommentToTicket, deleteCommentFromTicket } = useContext(ProjectTicketContext) as ProjectContextInterface;
    const { getAllUserNames, user } = useContext(UserContext) as UserContextInterface;

    const navigate = useNavigate();

    useEffect(() => {
        const getTicket = async () => {
            const ref: string = projectReference || '';
            const response = await getChosenTicket(ref);
            setTicket(response.data);
        }
        const getUsers = async () => {
            const response = await getAllUserNames();
            setUsers(response);
        }
       getTicket();
       getUsers();

    }, [ projectReference, refresh ])

    if (!ticket){
        return <div>ERROR: UNABLE TO GET TICKET FROM SERVER</div>
    }

    const ticketComments = ticket.comments.map( x => { return <CommentDiv key={x._id }comment={x} deleteComment={() => deleteComment(x._id || '')} /> } );

    const deleteComment = async (commentId: string) => {
        const response = await deleteCommentFromTicket(commentId, ticket._id || '');

        if(response.data.success){
            setRefresh(prevState => !prevState);
        } else {
            setError(response.data.msg)
        }
    }

    //Will eventually need to be reworked once we are on a server
    const addComment = async () => {
        const response = await addCommentToTicket(commentText, ticket._id || '');

        if(response.data.success){
            setCommentText('');
            setRefresh(prevState => !prevState);
        } else {
            setError(response.data.msg);
        }
    }

    const editTicketInputField = async (newValue: string, field: string) => {
        setError('');

        if(newValue.length === 0){ 
            setError('Error: Field cannot be empty');
            return;
        }

        //Update our new value
        if(field === 'title'){ ticket.title = newValue }
        if(field === 'description'){ ticket.description = newValue }
        if(field === 'status'){ ticket.status = newValue }
        if(field === 'ownerUsername'){
            const newUser = users.filter(x => x.username === newValue);
            ticket.ticketOwner = newUser[0];
        }

        const response = await updateTicketInformation(ticket);

        if(response.data.success){
            setRefresh(prev => !prev);
        }
    }
    
    const status = [ { val: 'Open' }, { val: 'In Progress' }, {val: 'Quality Check' }, { val: 'Finished' }, { val: 'Backlog' } ]
    const projRef = ticket.projectReference.split('-')[0];

    const deleteThisTicket = async () => {
        const response = await deleteTicket(ticket);

        if(response.data.success){
            navigate(`/dashboard/${ projRef }`)
        } else {
            setShowModal(false);
            setError(response.data.msg);
        }
    }

    let hideCommentSection = ''
    if(user.isGuest){
        hideCommentSection = 'none'
    }

  return (
    <div className='TicketDetails'>
        { showModal && <Modal closeModal={setShowModal} width='small'> 
            <div className='deleteWarning'>
                <div>
                    <h1>Confirm ticket deletion?</h1>
                    <p>This action cannot be undone</p>
                    <button onClick={()=>setShowModal(false)}>Close</button>
                    <button className='dangerButton' onClick={() => deleteThisTicket() }>Delete</button>
                </div>
            </div>
        </Modal>}
            <div className='TicketDetails__Header'>
                { error && <div className='TicketDetails__Error'><ErrorBar errorMsg={error} /></div> }
                <span className='bold'>[{ ticket.projectReference }]</span> <EditableInput type='input' hasLabel={false} text={ticket.title} field='title' editTicketField={(newValue: string, field: string) => editTicketInputField(newValue, field)}/>
                <hr />
            </div>

            <div className='TicketDetails__DashboardLink'>
                ...
                <Link to={`/dashboard/${ projRef }`}> / { projRef } </Link> 
                <Link to={`/ticket/${ ticket.projectReference }`}>/ { ticket.projectReference }</Link>
                <div className='TicketDetails___DeleteButton'>
                    <Button styles='dangerButton' function={() => setShowModal(true) }>Delete</Button>
                </div>
            </div>

            <div className='TicketDetails__Container'>
                <div className='TicketDetails__Left'>
                    <div className='TicketDetails__Ticket'>
                        <div className='TicketDetails_Description'>
                            <EditableInput type='textarea' hasLabel={true} label='Description' text={ticket.description} field='description' editTicketField={(newValue: string, field: string) => editTicketInputField(newValue, field)} />
                        </div>
                        <div className='TicketDetails_Comments'>
                            <div style={{paddingBottom: '5px'}}><label>Comments</label></div>
                            { ticketComments.length !== 0 ? ticketComments : <div className='TicketDetails_NoComments'>No Comments / Changes for this ticket</div> }
                            <div style={{display: hideCommentSection }}>
                                <textarea placeholder='Enter Comment' value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                                <div className='TicketDetails_CommentsButton'>
                                    <Button function={() => addComment()}> <BsPlusSquare /> Comment</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='TicketDetails__Right'>
                    <div>Ticket Information</div>
                    <DataListEdit title='Status' value={ticket.status} setValue={(val: string) => editTicketInputField(val, 'status')} id='status' listName='ticketStatus' data={status} name='status' placeholder={'Pick a Status'}/>
                    <DataListEdit title='Ticket Owner' value={ticket.ticketOwner.username} setValue={(val: string) => editTicketInputField(val, 'ownerUsername')} id='ownerUsername' listName='ticketOwnerUsername' data={users} name='userName' placeholder={'Pick a User'}/>
                </div>
            </div>
    </div>
  )
}

export default TicketDetails