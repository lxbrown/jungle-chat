export interface Message {
    body: string;
    userId: string;
    currentUser: boolean;
}

export interface Channel {
    id: string;
    name: string;
    activeUsers: number;
}