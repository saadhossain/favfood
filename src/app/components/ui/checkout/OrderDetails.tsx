'use client'
import { DataContext } from '@/app/context/DataContext';
import { useSetUserData } from '@/app/hooks/useSetUserData';
import { setCartProducts } from '@/app/lib/features/cartSlice';
import { setPaymentMethod } from '@/app/lib/features/commonFeaturesSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { DataContextType } from '@/app/types/DataContextTypes';
import { saveToDatabase } from '@/app/utils/saveToDatabase';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useContext } from 'react';
import toast from 'react-hot-toast';
import SubHeading from '../../shared/headings/SubHeading';
import Processing from '../../spinner/Processing';
import CheckoutForm from './CheckoutForm';
import cod from '/public/cod.png';
import stripe from '/public/stripe-payment.png';
const stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);

const OrderDetails = ({ totalPrice }: { totalPrice: number }) => {
    const { data: session } = useSession();
    //Get the necessary states from datacontext
    const { loading, setLoading } = useContext(DataContext) as DataContextType;
    const dispatch = useAppDispatch();
    const { refetch } = useSetUserData(`/orders/user/?userId=${session?.user._id}`);
    const { paymentMethod } = useAppSelector((state) => state.commonFeatures)
    const taxAmount = (totalPrice * 5 / 100);
    const grandTotal = (totalPrice + taxAmount).toFixed(2);

    //Get the payment method and set
    const handlePaymentMethod = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setPaymentMethod(event.target.id))
    };
    //Get all products in the cart
    const route = useRouter();
    //Arrange Product Informations
    const productData = productsInCart.map((item: any) => ({
        _id: item.product._id,
        name: item.product.name,
        slug: item.product.slug,
        restaurantName: item.product.restaurant,
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity
    }));
    //Arrange order data to save to database
    const orderData = {
        products: productData,
        orderAmount: grandTotal,
        userInfo: {
            _id: session?.user?._id,
            fullName: session?.user?.fullName
        },
        paymentMethod: paymentMethod,
        orderStatus: 'Processing',
        deliveryAddress: session?.user?.address,
        orderDate: new Date(),
    }
    //Save order details to the database
    const handleCashOnDelivery = async () => {
        const modifiedOrderData = { ...orderData, paymentStatus: 'Unpaid' };
        try {
            setLoading(true);
            if (!session?.user?.address?.city) {
                toast.error('Please add the delivery address to confirm order');
                return;
            }
            const data = await saveToDatabase('/api/orders', modifiedOrderData);
            if (data.status) {
                localStorage.removeItem('favFoodCart');
                toast.success('Order has been placed successfully.');
                dispatch(setCartProducts([]));
                dispatch(setCartCount(0))
                setLoading(false);
                route.push('/account/orders');
                refetch()
            }
        } catch (error: any) {
            console.log(error.message);
            setLoading(false);
        }
    }
    return (
        <div>
            {/* Price Calculation */}
            <SubHeading heading={'Order Details'} />
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
            <SubHeading heading={'Payment Method'} />
            {/* Paypal Payment Method */}
            <div className='flex items-center gap-2'>
                <input
                    type="radio"
                    name="payment_method"
                    id="Stripe"
                    onChange={handlePaymentMethod}
                />
                <label htmlFor="Stripe"
                    className='flex gap-2 items-center font-semibold cursor-pointer'>Stripe<Image src={stripe} alt='Stripe' width={150} /></label>
            </div>
            {
                paymentMethod === 'Stripe' && <Elements stripe={stripePromise}>
                    <CheckoutForm
                        paymentAmount={grandTotal}
                        session={session}
                        orderData={orderData}
                        loading={loading}
                        setLoading={setLoading}
                        route={route}
                        refetch={refetch}
                    />
                </Elements>
            }

            {/* Cash On Delivery */}
            <div className='flex items-center gap-2 mt-2'>
                <input
                    type="radio"
                    name="payment_method"
                    id="COD"
                    onChange={handlePaymentMethod}
                />
                <label htmlFor="COD" className='flex gap-2 items-center font-semibold cursor-pointer'>Cash on Delivery<Image src={cod} alt='COD' width={60} /></label>
            </div>
            {
                paymentMethod === 'COD' && <button
                    onClick={handleCashOnDelivery}
                    className='w-full flex items-center justify-center bg-primary text-white font-semibold rounded-md py-3 my-5 hover:bg-secondary duration-300 ease-in-out'>{loading ? <Processing title='Placing Order' /> : 'Confirm Order'}</button>
            }
        </div>
    );
};

export default OrderDetails;