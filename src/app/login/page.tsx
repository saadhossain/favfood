'use client';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from "react-icons/fa";
import Processing from '../components/spinner/Processing';
import LoginBg from '/public/login-bg.jpg';

interface LoginDataProps {
    error: string | null;
    ok: boolean;
    status: number;
    url: string
}
const LoginPage = () => {
    const { data: session } = useSession();
    const route = useRouter();
    const [processing, setProcessing] = useState(false);
    //Get and set the login error to the state
    const [error, setError] = useState('');
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        setProcessing(true);
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email: string = form.email.value;
        const password: string = form.password.value;
        // console.log(email, password);
        try {
            const login: LoginDataProps | any = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false,
            });
            if (login?.ok) {
                toast.success('You are logged in.');
                route.push('/account');
            } else {
                setError(login?.error);
                setProcessing(false);
            }
            console.log(login);
        } catch (error: any) {
            setProcessing(false);
            throw new Error(error.message);
        }
    };
    // If user logged in then redirect to account page
    if (session) {
        redirect('/account');
    };
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-5 md:my-10 flex justify-center'>
            <Image src={LoginBg} alt='Login BG' className='rounded-l-md hidden md:block' />
            <div className="w-full flex flex-col max-w-md p-4 md:p-6 rounded-r-md bg-gray-100 text-gray-900 shadow-2xl">
                <div className="mb-2 md:mb-8 text-center">
                    <h1 className="my-2 md:my-3 text-2xl md:text-4xl font-bold text-primary">Login</h1>
                </div>
                <form
                    onSubmit={(e) => handleLogin(e)}
                    className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block mb-1 text-sm">Email address</label>
                        <input type="email" name="email" id="email" placeholder="johndoe@gmail.com" className="w-full px-3 py-2 rounded-md bg-gray-300 text-gray-900 focus:outline-none" />
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <Link href="/login" className="text-md  hover:text-primary">Forgot password?</Link>
                        </div>
                        <input type="password" name="password" id="password" placeholder="***********" className="w-full px-3 py-2 rounded-md bg-gray-300 text-gray-900 focus:outline-none" />
                    </div>
                    {
                        error && <p className='text-md text-red-600'>{error}</p>
                    }
                    <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">{processing ? <Processing title={'Processing'} /> : 'Login'}</button>
                </form>
                <div className='w-full my-3'>
                    <button
                        className='w-full flex gap-2 items-center justify-center bg-gray-400 text-white py-3 rounded-md font-semibold mt-5'
                        onClick={() => signIn('google')}
                        disabled
                    >
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