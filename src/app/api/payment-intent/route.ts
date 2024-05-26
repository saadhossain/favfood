import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const POST = async (request: NextRequest) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const {paymentAmount} = await request.json();
    const finalAmount = Number((paymentAmount * 100).toFixed(2));
    const paymentIntent:Stripe.PaymentIntent = await  stripe.paymentIntents.create({
        currency: "usd",
        amount: finalAmount,
        "payment_method_types": [
            "card"
        ]
    });
    return NextResponse.json({ status: true, clientSecret: paymentIntent.client_secret })
}