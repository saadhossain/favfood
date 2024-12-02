import Image from 'next/image'
import Link from 'next/link'
import { FaShop } from 'react-icons/fa6'

const OrderProdCol = ({ prod }: { prod: any }) => {
    return (
        <div key={prod?._id} className='flex gap-2 items-center'>
            <Link
                href={`/foods/${prod?.restaurantName?.toLowerCase()}/${prod.slug}`}
                className='w-20 py-2 md:py-0'
            >
                <Image src={prod.image} alt={prod.name} width={80} height={60} className='rounded-md' />
            </Link>
            {/* Name, Shop Name and Quantity */}
            <div>
                <Link
                    href={`/foods/${prod?.restaurantName?.toLowerCase()}/${prod.slug}`}
                    className='hover:text-secondary duration-300 ease-in-out hidden md:block'
                >
                    {prod.name.length > 20 ? prod.name.slice(0, 24) + '...' : prod.name}
                </Link>
                <div className='flex flex-col md:flex-row gap-2 md:gap-3'>
                    <Link
                        href={`/restaurants/${prod?.restaurantName?.toLowerCase()}`}
                        className='flex gap-1 items-center hover:text-secondary duration-300 ease-in-out'
                    >
                        <FaShop />
                        {prod?.restaurantName}
                    </Link>
                    <p className='text-left font-normal'>Qty: <span className='font-semibold'>{prod.quantity}</span></p>
                </div>
            </div>
        </div>
    )
}

export default OrderProdCol