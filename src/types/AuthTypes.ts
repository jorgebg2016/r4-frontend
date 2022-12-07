

export interface UserCredentials {
    email: string;
    password: string;
};

export interface LoggedUser {
    id: number;
    name: string;
    email: string;
    token: string;
    expiresIn: number;
};