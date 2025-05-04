// src/components/Payment.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Payment.css';

const API_BASE_URL = 'http://localhost:5000'; // your backend URL

const Payment = () => {
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { currentUser, logout } = useAuth();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(true);
      script.onerror = () => {
        document.body.removeChild(script);
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const loadScriptWithRetry = async (retries = 3) => {
    for (let i = 0; i < retries; i++) {
      const loaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (loaded) return true;
      if (i < retries - 1) await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
    return false;
  };

  const createPaymentOrder = async (amount) => {
    const response = await axios.post(`${API_BASE_URL}/api/payment/create-order`, {
      amount: amount * 100, // convert to paise
    });
    return response.data;
  };

  const getPaymentOptions = (order) => ({
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'CodeCrew Payments',
    description: 'Test Transaction',
    image: '/logo.png',
    order_id: order.id,
    handler: function (response) {
      console.log('Payment successful:', response);
      setPaymentSuccess(true);
    },
    prefill: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
    },
    theme: {
      color: '#3399cc',
    },
    modal: {
      ondismiss: () => {
        console.log('Payment popup closed');
      },
    },
  });

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    let message = 'Payment failed';
    if (error.message.includes('internet')) message = 'Check your internet connection';
    else if (error.message.includes('unavailable')) message = 'Payment service is down';
    else if (error.response?.status === 401) message = 'Session expired - please login again';

    alert(message);
    if (error.response?.status === 401) logout?.();
  };

  const displayRazorpay = async () => {
    setLoading(true);
    try {
      if (!navigator.onLine) throw new Error('No internet connection');

      const loaded = await loadScriptWithRetry();
      if (!loaded) throw new Error('Payment service unavailable');

      const order = await createPaymentOrder(amount);
      const rzp1 = new window.Razorpay(getPaymentOptions(order));
      rzp1.open();
    } catch (error) {
      handlePaymentError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Make a Payment</h2>

      {paymentSuccess ? (
        <div className="payment-success">
          <h3>Payment Successful!</h3>
          <p>Thank you for your payment.</p>
        </div>
      ) : (
        <>
          <div className="amount-selector">
            <label>Amount (INR):</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="1"
            />
          </div>

          <button
            onClick={displayRazorpay}
            disabled={loading}
            className="pay-button"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </>
      )}
    </div>
  );
};

export default Payment;
