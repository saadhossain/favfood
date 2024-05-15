import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// export const POST = async (request: NextRequest) => {
//     const product = request.json();
//     const paymentAmount = 100 * 100;

//     const paymentIntent = await Stripe.PaymentIntentsResource.create({
//         currency: "usd",
//         amount: paymentAmount,
//         "payment_method_types": [
//             "card"
//         ]
//     });
//     NextResponse.json({ status: true, clientSecret: paymentIntent.client_secret })
// }