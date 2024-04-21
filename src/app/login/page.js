import Image from 'next/image';
import LoginBg from '/public/login-bg.jpg'
import Link from 'next/link';
const LoginPage = () => {
    return (
        <div className='w-10/12 mx-auto my-10 flex justify-center'>
            <Image src={LoginBg} alt='Login BG' className='rounded-l-md'/>
            <div className="w-full flex flex-col max-w-md p-6 rounded-r-md sm:p-10 bg-white text-gray-900 shadow-2xl">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Login</h1>
                </div>
                <form className="space-y-12">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 rounded-md bg-[#FDF3F7] text-gray-900" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                                <Link href="/" className="text-md  hover:text-primary">Forgot password?</Link>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 rounded-md bg-[#FDF3F7] text-gray-900" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-primary text-white">Login</button>
                        </div>
                        <p className="px-6 text-sm text-center text-gray-400">Don't have an account yet?
                            <Link href="/register" className="hover:text-secondary">Register</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;