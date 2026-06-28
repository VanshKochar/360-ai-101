"use client";
import { useState } from "react";

export default function RazorpayButton({ amount, label, isPrimary = false }) {
  const [isLoading, setIsLoading] = useState(false);

  const makePayment = async () => {
    setIsLoading(true);

    // Dynamically load the Razorpay checkout script
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
        body: JSON.stringify({ amount }),
      }).then((t) => t.json());

      if (data.error) {
        alert(data.error);
        setIsLoading(false);
        return;
      }

      // 2. Initialize Razorpay Options
      var options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use NEXT_PUBLIC if you want to expose key to client, otherwise we should fetch it or pass it. 
        // Wait, passing from server to client is safer, but Razorpay requires the key on the client side to open the modal.
        // It's safe to put RAZORPAY_KEY_ID in NEXT_PUBLIC_RAZORPAY_KEY_ID.
        // I will use a dummy one for now if env is not set.
        name: "360 AI 101",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Course Access",
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
            alert("Payment Successful! Welcome to 360 AI 101.");
            // You can redirect to a download page here
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
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
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <button 
      onClick={makePayment} 
      disabled={isLoading}
      className={`button ${isPrimary ? 'button-primary' : 'button-outline'}`}
      style={{ width: "100%", opacity: isLoading ? 0.7 : 1 }}
    >
      {isLoading ? "Processing..." : label}
    </button>
  );
}
