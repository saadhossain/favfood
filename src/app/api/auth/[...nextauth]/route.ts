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
                try {
                    if (!credentials?.email || !credentials.password) {
                        throw new Error('Credentials not found');
                    }
                    // Connect MongoDB database
                    await mongoose.connect(mongoUrl);
                    // Find the user from the Database
                    const user = await userSchema.findOne({ email: credentials?.email });
                    if (!user) {
                        throw new Error('You are not registered. Please Signup')
                    }

                    // Compare the password to verify
                    const isPasswordValid = await compare(credentials?.password as any, user.password);
                    //If the password isn't valid then return the error
                    if (!isPasswordValid) {
                        throw new Error('Wrong email or password entered.')
                    }
                    //If password valid the return the user data.
                    if (isPasswordValid) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    throw error;
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

