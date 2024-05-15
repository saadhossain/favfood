'use client'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckoutForm = ({ paymentAmount }: { paymentAmount: string }) => {
    const stripe = useStripe()
    const elements = useElements()
    const clientSecret = '';

    const handleMakePayment = () => {

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
                    disabled={!stripe || !clientSecret}
                    type='submit'
                    className='w-full bg-primary text-white font-semibold rounded-md py-3 my-5 hover:bg-secondary duration-300 ease-in-out'>Make Payment</button>
            </form>
        </div>
    )
}

export default CheckoutForm