'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const AddButton = ({ endpoint, title }: { endpoint: string, title: string }) => {
    const { data: session } = useSession();
    return (
        <Link
            href={`/admin/dashboard${endpoint}`}
            className={`bg-primary text-white hover:bg-secondary duration-300 ease-in-out font-semibold py-2 md:py-3 px-3 md:px-5 rounded-3xl ${session?.user.role !== 'admin' && 'hidden'}`}>{title}</Link>
    )
}

export default AddButton