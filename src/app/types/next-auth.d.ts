import 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string;
        email?: string;
        fullName?: string;
        password?: string;
        profileImg?: string;
        role?: string;
    }
    interface Session {
        user: {
            _id?: string | any;
            email?: string | any;
            fullName?: string | any;
            password?: string | any;
            image?: string | any;
            role?: string | any;
        }
    } DefaultSession['user']
}