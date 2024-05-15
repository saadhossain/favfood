import Image from 'next/image';
import cod from '/public/cod.png';
import paypal from '/public/credit-card-paypal.png';

const OrderDetails = ({totalPrice}: {totalPrice:number}) => {
    //Calculate total price of all product in the cart
    // const totalPrice = getTotalPrice();
    //Calculate Tax Amount and Grant total Amount
    const taxAmount = (totalPrice * 5 / 100);
    const grandTotal = totalPrice + taxAmount;
    return (
        <div>
            {/* Price Calculation */}
            <h3 className='flex items-center gap-2 text-lg font-semibold border-l-4 border-primary pl-2 text-primary my-3'>Order Details</h3>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                    <p>Subtotal</p>
                    <p className='font-semibold'>${totalPrice?.toFixed(2)}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p>VAT & GST (5%)</p>
                    <p className='font-semibold'>${taxAmount.toFixed(2)}</p>
                </div>
                <div className='flex items-center justify-between border-t-2 border-gray-500 pt-1 mt-2'>
                    <p>Grand Total</p>
                    <p className='font-semibold'>${grandTotal.toFixed(2)}</p>
                </div>
            </div>
            {/* Payment Methods */}
            <h3 className='flex items-center gap-2 text-lg font-semibold border-l-4 border-primary pl-2 text-primary my-3'>Payment Method</h3>
            {/* Paypal Payment Method */}
            <div className='flex items-center gap-2'>
                <input type="radio" name="payment_method" id="paypal" />
                <label htmlFor="paypal" className='flex gap-2 items-center font-semibold cursor-pointer'>Paypal<Image src={paypal} alt='Paypal' width={150} /></label>
            </div>

            {/* Cash On Delivery */}
            <div className='flex items-center gap-2 mt-2'>
                <input type="radio" name="payment_method" id="cod" />
                <label htmlFor="cod" className='flex gap-2 items-center font-semibold cursor-pointer'>Cash on Delivery<Image src={cod} alt='cod' width={60} /></label>
            </div>
            {/* Submit Button */}
            <button className='w-full bg-primary text-white font-semibold rounded-md py-3 my-5 hover:bg-secondary duration-300 ease-in-out'>Confirm Order</button>
        </div>
    );
};

export default OrderDetails;