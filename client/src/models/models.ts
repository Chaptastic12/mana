import { ProjectReference } from "typescript";

export interface AllProjects {
    projects: Project[]
}

export interface Project {
    id: string;
    tickets: {
        openTickets: Ticket[] | [],
        inProgress: Ticket[],
        qualityCheck: Ticket[],
        finishedTickets: Ticket[],
        backlogTickets: Ticket[]
    };
    projectReference: string;
    projectName: string;
    createdDate: string;
    numTickets?: number;
}

export interface Ticket {
    id: string;
    _id?: string;
    projectReference: string;
    title: string;
    description: string;
    comments: Comment[];
    status: string;
    createdDate: string;
    ticketOwner: User;
    ticketCreator: User;
}

export interface Comment {
    id: string;
    comment: string;
    createdDate: string;
    author: User;
}

export interface User {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    isGuest: boolean;
    isRegUser: boolean;
}

export interface UserContextInterface {
    user: { username: string, isAdmin: boolean, isRegUser: boolean, isGuest: boolean };
    loginUser: (username: string, password: string) => void;
    registerUser: (username: string, email: string, password: string) => void;
    logoutUser: () => void;
    getAllUserNames: () => any;
}
export interface ProjectContextInterface {
    addProjectToServer: (project: Project) => void; 
    addTicketToServer: (ticket: Ticket) => void; 
    allProjects: any;
    allTickets: any;
    getChosenTicket: (projectReference: string) => any;
    getChosenproject: (ProjectReference: string) => any;
    updateTicketStatus: (source: {}, destination: {}, projRef: string) => any;
    updateTicketInformation: (ticket: Ticket) => any;
    deleteTicket: ( ticket: Ticket) => any;
}