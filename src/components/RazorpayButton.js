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
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        name: "360 AI 101",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Course Access",
        handler: async function (response) {
          // 3. Verify payment on server — also receives `amount` so server
          //    can include it in the signed access token.
          const verifyData = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: String(amount), // pass amount so server can sign it
            }),
          }).then((t) => t.json());

          if (verifyData.success) {
            // 4. Redirect with cryptographic proof — success page will re-validate
            //    this token server-side; a fake URL without a valid token is rejected.
            window.location.href = `/success?payment_id=${verifyData.payment_id}&amount=${amount}&token=${verifyData.token}`;
          } else {
            alert("Payment Verification Failed!");
            setIsLoading(false);
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        alert("Payment Failed. Reason: " + response.error.description);
        setIsLoading(false);
      });

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
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
      className={`button ${isPrimary ? "button-primary" : "button-outline"}`}
      style={{ width: "100%", opacity: isLoading ? 0.7 : 1 }}
    >
      {isLoading ? "Processing..." : label}
    </button>
  );
}
