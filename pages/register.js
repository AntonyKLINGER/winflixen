import React, { useEffect } from 'react'
import Head from 'next/head'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Subscription from '../components/Subscription'

const stripePromise = loadStripe('pk_live_51MgpeTLw7jqYvI4JDRoZFSOf1RglpDoOASRgcFKl5upKgDAaT1TNj7Gb8Y0dlrCr0z7W5gqEaZlAmJGrBwydVep700KioIvoF8');

export default function Stripe(){
    return (
        <>
        <Head>
            <title>VIP Registration for Winflix software</title>
        </Head>
        <Elements stripe={stripePromise}>
            <Subscription />
        </Elements>
        </>
    )
}

