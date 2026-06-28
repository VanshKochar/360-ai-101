import Razorpay from "razorpay";
import { NextResponse } from "next/server";

// ✅ Security: Only these exact amounts are valid. Blocks any tampered requests.
const VALID_AMOUNTS = [51, 99];

export async function POST(req) {
  try {
    const { amount } = await req.json();
    const parsedAmount = parseInt(amount, 10);

    // Strict server-side whitelist validation
    if (!VALID_AMOUNTS.includes(parsedAmount)) {
      return NextResponse.json(
        { error: "Invalid amount. Only ₹51 and ₹99 are accepted." },
        { status: 400 }
      );
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: parsedAmount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${parsedAmount}_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Error creating order. Please check API keys." },
      { status: 500 }
    );
  }
}
