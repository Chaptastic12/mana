export const ALLPROJECTS = [
    //First project
    {
        id: '12345abcde',
        tickets: 
        [
            {
                id: '1',
                projectReference: 'MANA-0001',
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
                projectReference: 'MANA-0002',
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
        projectShortName: 'MANA',
        projectName: 'Manage All New Activities',
        createdDate: 'Today'
    },
    //Second project
    {
        id: '12345abcde',
        tickets: [
            {
                id: '2',
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
        projectShortName: 'MANA 2',
        projectName: 'Manage All New Activities',
        createdDate: 'Today'
    }
]