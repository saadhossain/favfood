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
                token.isActive = user.isActive;
                token.phone = user.phone
            }
            return token;
        },
        async session({ session, token }) {
            await mongoose.connect(mongoUrl);
            const user = await userSchema.findOne({ _id: token._id });
            if (user) {
                session.user = {
                    _id: user._id?.toString(),
                    email: user.email,
                    fullName: user.fullName,
                    password: user.password,
                    image: user.profileImg,
                    role: user.role,
                    phone: user.phone,
                    isActive: user.isActive,
                };
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };

