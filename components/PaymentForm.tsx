"use client"

import { useState } from 'react'
import { functions } from '@/lib/appwrite'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentForm({ creatorId, amount }) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      const response = await functions.createExecution('create-payment-intent', JSON.stringify({ creatorId, amount }))
      const { clientSecret } = JSON.parse(response.response)

      const stripe = await stripePromise
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'User Name',
          },
        },
      })

      if (result.error) {
        console.error(result.error.message)
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment succeeded')
          // Update user's contributions in Appwrite database
        }
      }
    } catch (error) {
      console.error('Payment error:', error)
    }
    setIsLoading(false)
  }

  return (
    <div>
      <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <CardElement />
      <Button onClick={handlePayment} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Pay'}
      </Button>
    </div>
  )
}