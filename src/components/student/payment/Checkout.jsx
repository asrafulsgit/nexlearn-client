import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ]
};

const Checkout = () => {
  return (
    <div className="AppWrapper">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default Checkout
