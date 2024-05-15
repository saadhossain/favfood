'use client'
import { OrderDataType, SessionData } from '@/app/types/DataTypes';
import { saveOrderToDB } from '@/app/utils/saveOrderToDB';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import Processing from '../../spinner/Processing';

interface CheckoutProps {
    paymentAmount: string;
    session: SessionData | any;
    orderData: OrderDataType | any;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
}


const CheckoutForm = ({ paymentAmount, session, orderData, loading, setLoading }: CheckoutProps) => {
    // console.log(Number(paymentAmount))
    const stripe = useStripe()
    const elements = useElements();

    const handleMakePayment = async (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();
        //Get the client secret from the server
        const res = await fetch("http://localhost:3000/api/payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentAmount }),
        })
        const data = await res.json();
        // console.log(data);
        const clientSecret = data.clientSecret;
        // console.log(clientSecret);
        if (!stripe || !elements) {
            return toast.error("Stripe or Elements couldn't found!")
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return toast.error('Invalid Card Details')
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error.message)
        }
        const { paymentIntent, paymentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: session?.user?.fullName,
                        email: session?.user?.email
                    },
                },
            },
        ) as any;
        if (paymentError) {
            console.log(paymentError.message)
        }

        let paymentStatus;
        //If Payment is successful, then save the order to database
        if (paymentIntent?.status === 'succeeded') {
            paymentStatus = 'paid'
        }
        paymentStatus = 'unpaid';
        //Save order details to the database
        try {
            const oderDataModified = { ...orderData, paymentStatus };
            const dataReturned = await saveOrderToDB(oderDataModified);
            if (dataReturned.status) {
                localStorage.removeItem('favFoodCart');
                toast.success('Order has been placed successfully.')
                redirect('/account')
            }
            setLoading(false);
        } catch (error:any) {
            console.log(error.message);
            setLoading(false);
        }
    }

    return (
        <div>
            <form
                onSubmit={handleMakePayment}
            >
                <div className='bg-gray-300 my-3 p-3 rounded-md'>
                    <CardElement options={{}} />
                </div>
                {/* Submit Button */}
                <button
                    disabled={!stripe || !elements}
                    type='submit'
                    className={`w-full flex items-center justify-center ${!stripe ? 'bg-gray-500' : 'bg-primary hover:bg-secondary'} text-white font-semibold rounded-md py-3 my-5 duration-300 ease-in-out`}>{loading ? <Processing title='Placing Order' /> : 'Make Payment'}</button>
            </form>
        </div>
    )
}

export default CheckoutForm