import Link from 'next/link';
import { FormEvent } from 'react';
import { FaCheck } from "react-icons/fa";
const CartSummery = ({totalPrice}: {totalPrice: number}) => {
    //Handle Promot Code
    const handlePromoCode = (e:FormEvent)=> {
        e.preventDefault();
    }
    //Calculate Tax Amount and Grant total Amount
    const taxAmount = (totalPrice * 5/100);
    const grandTotal = totalPrice + taxAmount;
    return (
        <div className='flex flex-col gap-4 p-4 bg-gray-100 sticky top-10'>
            {/* Discount Code */}
            <form onSubmit={handlePromoCode}>
                <label htmlFor="discountCode">Promo Code</label>
                <div className='flex items-center'>
                    <input type="text" name="discountCode" id="discountCode" className='focus:outline-none py-1 px-2 w-11/12 rounded-l-md' placeholder='Enter code here' />
                    <button type="submit" className='bg-primary p-2 text-white hover:bg-secondary duration-300'><FaCheck /></button>
                </div>
            </form>

            {/* Subtotal */}
            <div className='flex items-center justify-between'>
                <p>Subtotal</p>
                <p className='font-semibold'>${totalPrice?.toFixed(2)}</p>
            </div>
            {/* Discount Amount */}
            <div className='flex items-center justify-between'>
                <p>Discount</p>
                <p className='font-semibold'>$0</p>
            </div>
            {/* Tax Amount */}
            <div className='flex items-center justify-between'>
                <p>VAT & GST (5%)</p>
                <p className='font-semibold'>${taxAmount.toFixed(2)}</p>
            </div>
            <hr className='border-t-2 border-gray-500'/>

            {/* Grand Total */}
            <div className='flex items-center justify-between'>
                <p className='font-semibold'>Grand Total</p>
                <p className='font-semibold'>${grandTotal.toFixed(2)}</p>
            </div>
            <Link href='/checkout' className='bg-primary text-white font-semibold py-2 rounded-md text-center hover:bg-secondary duration-300 ease-in-out'>Checkout</Link>
        </div>
    );
};

export default CartSummery;