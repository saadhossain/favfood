import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { FaGoogle } from "react-icons/fa";
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import LoginForm from '../components/ui/login/LoginForm';
import LoginBg from '/public/login-bg.jpg';

export const metadata: Metadata = {
    title: 'Login - FavFood',
    description: 'Discover our innovative web app designed for food lovers! Easily purchase and order your favorite foods, add items to your wishlist, and search for delicious options. Leave feedback and enjoy a seamless e-commerce experience. Perfect for food enthusiasts seeking convenience and variety in one place.'
}

const LoginPage = () => {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-5 md:my-10 flex justify-center'>
            <Image src={LoginBg} alt='Login BG' className='rounded-l-md hidden md:block' />
            <div className="w-full flex flex-col max-w-md p-4 md:p-6 rounded-r-md bg-gray-100 text-gray-900 shadow-2xl">
                <div className="mb-2 md:mb-8 text-center">
                    <h1 className="my-2 md:my-3 text-2xl md:text-4xl font-bold text-primary">Login</h1>
                </div>
                <LoginForm />
                <div className='w-full my-3'>
                    <button className='w-full flex gap-2 items-center justify-center bg-gray-400 text-white py-3 rounded-md font-semibold' disabled>
                        <FaGoogle className='w-6 h-6' />Login with Google
                    </button>
                </div>
                <p className="px-6 text-sm text-center text-gray-400">New to this site?
                    <Link href="/register" className="text-primary hover:text-secondary ml-2 text-lg font-semibold">Register</Link>.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;