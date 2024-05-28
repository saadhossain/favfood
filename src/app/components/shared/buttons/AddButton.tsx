import Link from 'next/link'

const AddButton = ({endpoint}:{endpoint:string}) => {
    const buttonTitle = endpoint.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return (
        <Link
            href={`/admin/dashboard/orders/${endpoint}`}
            className='bg-primary text-white hover:bg-secondary duration-300 ease-in-out font-semibold py-3 px-5 rounded-3xl'
        >{buttonTitle}</Link>
    )
}

export default AddButton