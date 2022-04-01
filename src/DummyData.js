export let ALLPROJECTS = [
    //First project
    {
        id: '12345abcde',
        tickets: 
        [
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
            }
        ],
        projectReference: 'MANA',
        projectName: 'Manage All New Activities',
        createdDate: 'Today'
    },
    //Second project
    {
        id: '123456abcdef',
        tickets: [
            {
                id: '3',
                projectReference: 'MANA 2',
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
            }
        ],
        projectReference: 'MANA 2',
        projectName: 'Manage All New Activities 2',
        createdDate: 'Today'
    }
]

export let TICKETS = [
    {
        id: '3',
        projectReference: 'MANA 2',
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
    {
        id: '6',
        projectReference: 'MANA 2',
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
        id: '4',
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
        id: '5',
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