import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51MLc9lHN4Am7YpiQggEF8kkw4fz5IETx7gvkUghHzm14sY7Me2RPu3XegKPaQE8DYAtor7DrS41BEVibXEaULVbB005ndJwYGt"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      
      <PaymentForm/>

    </Elements>
  )
}
