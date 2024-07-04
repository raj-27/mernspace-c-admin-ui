export type Credentials = {
    email: string;
    password: string;
};

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}
