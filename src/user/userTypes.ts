export interface User {
    name: string;
    email: string;
    password: string;
    _id: string;
    role: string;
    created_at: number | undefined;
    updated_at: number | undefined;
}
