import React from 'react'
import { useParams } from 'react-router'

const PaymentSuccess = () => {
    const {paymentId}= useParams();
  return (
    <div>
      <h1> payment success {paymentId}</h1>
    </div>
  )
}

export default PaymentSuccess
