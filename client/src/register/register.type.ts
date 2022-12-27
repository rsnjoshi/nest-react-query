export type RegisterData = {
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
}

export type RegisterKey =
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'password'
    | 'confirmPassword'
    | 'username'

