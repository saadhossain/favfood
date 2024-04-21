import Image from 'next/image';
import paypal from '/public/credit-card-paypal.png';
import cod from '/public/cod.png'

const OrderDetails = () => {
    return (
        <div className='w-4/12 bg-gray-100 p-4 rounded-md'>
            <div className='flex items-center justify-between font-semibold'>
                <h5 className='text-lg'>Cart</h5>
                <p>3 items</p>
            </div>
            {/* Product and Price Details */}
            <div className='my-5'>
                <h3 className='flex items-center gap-2 text-lg font-semibold border-l-4 border-primary pl-2 text-primary my-3'>Order Details</h3>
                {/* Single Product Details */}
                <div className='flex items-center justify-between mb-2'>
                    <p>
                        Chicken Pizza (12")
                        <span className='ml-2 font-semibold text-gray-800'>x2</span>
                    </p>
                    <p className='font-semibold'>$150.00</p>
                </div>
                {/* Single Product Details */}
                <div className='flex items-center justify-between mb-2'>
                    <p>
                        Chicken Chowmin (3/4)
                        <span className='ml-2 font-semibold text-gray-800'>x1</span>
                    </p>
                    <p className='font-semibold'>$115.00</p>
                </div>
                {/* Single Product Details */}
                <div className='flex items-center justify-between mb-2'>
                    <p>
                        Hot Spicy Burger
                        <span className='ml-2 font-semibold text-gray-800'>x1</span>
                    </p>
                    <p className='font-semibold'>$59.00</p>
                </div>
            </div>
            {/* Price Calculation */}
            <h3 className='flex items-center gap-2 text-lg font-semibold border-l-4 border-primary pl-2 text-primary my-3'>Amount to Pay</h3>
            <div className='flex items-center justify-between font-semibold'>
                <p>Subtotal</p>
                <p>$324.00</p>
            </div>
            <div className='flex items-center justify-between font-semibold'>
                <p>VAT & GST</p>
                <p>$14.58</p>
            </div>
            <div className='flex items-center justify-between font-semibold border-t-2 border-gray-500 pt-1 mt-2'>
                <p>Total</p>
                <p>$338.58</p>
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