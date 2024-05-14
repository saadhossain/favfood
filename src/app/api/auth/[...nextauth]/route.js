// imports
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from 'mongoose';
import { mongoUrl } from '@/app/lib/db';
import { userSchema } from '@/app/lib/models/usersModel';
import { compare } from 'bcrypt';

const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {},
                password: {}
            },
            async authorize(credentials, req) {
                //Connect MongoDB database;
                await mongoose.connect(mongoUrl);
                //Find the user from the Database
                const user = await userSchema.findOne({email: credentials?.email});
                //Compare the password to verify
                const isPasswordValid = await compare(credentials?.password, user.password);
                //If the password is valid then return the user
                if (isPasswordValid) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ]
});

export { handler as GET, handler as POST };

