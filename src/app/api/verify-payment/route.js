import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Generate a secure token to prove payment was successful
      const token = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_payment_id.toString())
        .digest("hex");

      // Payment is verified
      // Here you could save payment details to your database and give access to the course
      return NextResponse.json({ success: true, message: "Payment verified successfully", token }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: "Invalid Signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Error verifying payment" }, { status: 500 });
  }
}
