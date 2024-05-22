import 'next-auth';

declare module 'next-auth' {
    interface User {
        _id?: string;
        email?: string;
        fullName?: string;
        password?: string;
        profileImg?: string;
        role?: string;
        isActive?: boolean;
        phone?: string;
    }
    interface Session {
        user: {
            _id?: string | any;
            email?: string | any;
            fullName?: string | any;
            password?: string | any;
            image?: string | any;
            role?: string | any;
            isActive?: boolean | any;
            phone?: string | any;
        }
    } DefaultSession['user']
}