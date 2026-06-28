"use client";
import { useState } from "react";
import styles from "../app/page.module.css";

export default function CheckoutForm({ amount, tierName }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    age: "",
    profession: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Create order on backend
      const data = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseInt(amount) }),
      }).then((t) => t.json());

      if (data.error) {
        alert(data.error);
        setIsLoading(false);
        return;
      }

      // 2. Initialize Razorpay Options
      var options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        name: "360 AI 101",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: `Access to ${tierName}`,
        handler: async function (response) {
          // 3. Verify Payment
          const verifyData = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          }).then((t) => t.json());

          if (verifyData.success) {
            window.location.href = `/success?amount=${amount}`;
          } else {
            alert("Payment Verification Failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#00f0ff"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        alert("Payment Failed. Reason: " + response.error.description);
      });
      
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-checkout-js")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-checkout-js";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--color-surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', width: '100%', margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>Enter Your Details</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Full Name</label>
        <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="John Doe" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-primary)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Email Address</label>
        <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-primary)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Mobile Number</label>
        <input required name="mobile" value={formData.mobile} onChange={handleChange} type="tel" placeholder="+91 9999999999" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-primary)' }} />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Age</label>
          <input required name="age" value={formData.age} onChange={handleChange} type="number" min="10" max="100" placeholder="22" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-primary)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 2 }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Profession</label>
          <input required name="profession" value={formData.profession} onChange={handleChange} type="text" placeholder="Student / Engineer" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-primary)' }} />
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="button button-primary" style={{ marginTop: 'var(--space-2)', opacity: isLoading ? 0.7 : 1 }}>
        {isLoading ? "Processing..." : `Proceed to Pay ₹${amount}`}
      </button>
    </form>
  );
}
