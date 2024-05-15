'use client'
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { getProductsInCart } from '@/app/utils/getProductsInCart';
import { saveOrderToDB } from '@/app/utils/saveOrderToDB';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useContext } from 'react';
import Processing from '../../spinner/Processing';
import CheckoutForm from './CheckoutForm';
import cod from '/public/cod.png';
import stripe from '/public/stripe-payment.png';
const stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);

const OrderDetails = ({ totalPrice }: { totalPrice: number }) => {
    //Get the necessary states from datacontext
    const { paymentMethod, setPaymentMethod, loading, setLoading } = useContext(DataContext) as DataContextType;
    const taxAmount = (totalPrice * 5 / 100);
    const grandTotal = (totalPrice + taxAmount).toFixed(2);

    //Get the payment method and set
    const handlePaymentMethod = (event: ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(event.target.id);
    };
    //Get all products in the cart
    const productsInCart = getProductsInCart();
    const { data: session } = useSession();
    const route: AppRouterInstance = useRouter();
    //Arrange order details
    const orderData = {
        products: productsInCart,
        orderAmount: grandTotal,
        userInfo: session?.user,
        orderDate: new Date(),
        orderStatus: 'processing',
    }
    //Save order details to the database
    const handleCashOnDelivery = async () => {
        const oderDataModified = { ...orderData, paymentStatus: 'unpaid' };
        try {
            setLoading(true);
            await saveOrderToDB(oderDataModified, route);
            setLoading(false);
        } catch (error: any) {
            console.log(error.message);
            setLoading(false);
        }
    }
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
                    <p className='font-semibold'>${grandTotal}</p>
                </div>
            </div>
            {/* Payment Methods */}
            <h3 className='flex items-center gap-2 text-lg font-semibold border-l-4 border-primary pl-2 text-primary my-3'>Payment Method</h3>
            {/* Paypal Payment Method */}
            <div className='flex items-center gap-2'>
                <input
                    type="radio"
                    name="payment_method"
                    id="stripe"
                    onChange={handlePaymentMethod}
                />
                <label htmlFor="stripe"
                    className='flex gap-2 items-center font-semibold cursor-pointer'>Stripe<Image src={stripe} alt='stripe' width={150} /></label>
            </div>
            {
                paymentMethod === 'stripe' && <Elements stripe={stripePromise}>
                    <CheckoutForm
                        paymentAmount={grandTotal}
                        session={session}
                        orderData={orderData}
                        loading={loading}
                        setLoading={setLoading}
                        route={route}
                    />
                </Elements>
            }

            {/* Cash On Delivery */}
            <div className='flex items-center gap-2 mt-2'>
                <input
                    type="radio"
                    name="payment_method"
                    id="cod"
                    onChange={handlePaymentMethod}
                />
                <label htmlFor="cod" className='flex gap-2 items-center font-semibold cursor-pointer'>Cash on Delivery<Image src={cod} alt='cod' width={60} /></label>
            </div>
            {
                paymentMethod === 'cod' && <button
                    onClick={handleCashOnDelivery}
                    className='w-full flex items-center justify-center bg-primary text-white font-semibold rounded-md py-3 my-5 hover:bg-secondary duration-300 ease-in-out'>{loading ? <Processing title='Placing Order' /> : 'Confirm Order'}</button>
            }
        </div>
    );
};

export default OrderDetails;