import { Ticket, Comment } from "./models/models";

export let TICKETS: Ticket[] = [
    {
        id: '3',
        projectReference: 'MANA2-1',
        title: 'Mana 2 - Project Tracker App',
        description: 'App used for project tracking purposes 2',
        comments: [],
        status: 'Finished',
        createdDate: 'Today',
        ticketOwner: {
            id: '1',
            username: 'Chaps',
            email: 'chaps@test.com',
            isAdmin: true,
            isGuest: false,
            isRegUser: false
        },
        ticketCreator: {
            id: '1',
            username: 'Chaps',
            email: 'chaps@test.com',
            isAdmin: true,
            isGuest: false,
            isRegUser: false
        }
    },
    {
        id: '1',
        projectReference: 'MANA-1',
        title: 'Mana - Project Tracker App',
        description: 'App used for project tracking purposes',
        comments: [],
        status: 'Open',
        createdDate: 'Today',
        ticketOwner: {
            id: '1',
            username: 'Chaps',
            email: 'chaps@test.com',
            isAdmin: true,
            isGuest: false,
            isRegUser: false
        },
        ticketCreator: {
            id: '1',
            username: 'Chaps',
            email: 'chaps@test.com',
            isAdmin: true,
            isGuest: false,
            isRegUser: false
        }
    },
    {
        id: '2',
        projectReference: 'MANA-2',
        title: 'Test columns',
        description: 'App used for project tracking purposes',
        comments: [],
        status: 'Finished',
        createdDate: 'Today',
        ticketOwner: {
            id: '1',
            username: 'Chaps',
            email: 'chaps@test.com',
            isAdmin: true,
            isGuest: false,
            isRegUser: false
        },
        ticketCreator: {
            id: '1',
            username: 'Chaps',
            email: 'chaps@test.com',
            isAdmin: true,
            isGuest: false,
            isRegUser: false
        }
    },
]

export let ALLPROJECTS = [
    //First project
    {
        id: '12345abcde',
        tickets: 
        [
            TICKETS[1],
            TICKETS[2]
        ],
        projectReference: 'MANA',
        projectName: 'Manage All New Activities',
        createdDate: 'Today'
    },
    //Second project
    {
        id: '123456abcdef',
        tickets: [
            TICKETS[0]
        ],
        projectReference: 'MANA2',
        projectName: 'Manage All New Activities 2',
        createdDate: 'Today'
    }
]



export let USERS = [
    {
        id: '1',
        username: 'Chaps',
        email:'chaps@test.com',
        isAdmin: true,
        isGuest: false,
        isRegUser: false
    }, {
        id: '2',
        username: 'Chaps 2',
        email:'chaps@test.com',
        isAdmin: true,
        isGuest: false,
        isRegUser: false
    },
]

const date = new Date();
export const BLANKUSER = {
    id: '', username: 'DUMMY_USERNAME', email: '', isAdmin: false, isGuest: true, isRegUser: false
}

const DUMMYCOMMENT: Comment = {     
    id: '0',
    comment: 'test',
    createdDate: date.toLocaleDateString(),
    author: BLANKUSER
}

export const DUMMY_TICKET: Ticket =  {
    id: '', 
    title: '', 
    projectReference:'', 
    status: '', 
    description: '', 
    ticketOwner: BLANKUSER, 
    ticketCreator: BLANKUSER, 
    comments: [DUMMYCOMMENT], 
    createdDate: date.toLocaleDateString() 
}
 