// imports
import { mongoUrl } from '@/app/lib/db';
import { userSchema } from '@/app/lib/models/usersModel';
import { compare } from 'bcrypt';
import mongoose from 'mongoose';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                //Connect MongoDB database;
                await mongoose.connect(mongoUrl);
                //Find the user from the Database
                const user = await userSchema.findOne({ email: credentials?.email });
                //Compare the password to verify
                const isPasswordValid = await compare(credentials?.password as any, user.password);
                //If the password is valid then return the user
                if (isPasswordValid) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.email = user.email;
                token.fullName = user.fullName;
                token.password = user.password;
                token.image = user.profileImg;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.email = token.email;
                session.user.fullName = token.fullName;
                session.user.password = token.password;
                session.user.image = token.image;
                session.user.role = token.role;
            }
            return session;
        }
    }
});

export { handler as GET, handler as POST };

