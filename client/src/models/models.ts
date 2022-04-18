export interface AllProjects {
    projects: Project[]
}

export interface Project {
    id: string;
    tickets?: Ticket[];
    projectShortName: string;
    projectName: string;
    createdDate: string;
}

export interface Ticket {
    id: string;
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
    user: { username: string };
    loginUser: (username: string, password: string) => void;
    registerUser: (username: string, email: string, password: string) => void;
    logoutUser: () => void
}