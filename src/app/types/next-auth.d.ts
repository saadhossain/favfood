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
        address?: {
            streetAddress: string;
            city: string;
            state: string;
            zipCode: string;
            country: string
        }
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
            address?: {
                streetAddress: string;
                city: string;
                state: string;
                zipCode: string;
                country: string
            }
        }
    } DefaultSession['user']
}