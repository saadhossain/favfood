import Link from 'next/link'

const AddButton = ({ endpoint, title }: { endpoint: string, title: string }) => {
    return (
        <Link
            href={`/admin/dashboard${endpoint}`}
            className='bg-primary text-white hover:bg-secondary duration-300 ease-in-out font-semibold py-2 md:py-3 px-3 md:px-5 rounded-3xl'>{title}</Link>
    )
}

export default AddButton