import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = await req.json();

    // Step 1: Verify Razorpay's own payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json({ success: false, message: "Invalid Signature" }, { status: 400 });
    }

    // Step 2: Generate a signed access token so the success page can
    // verify server-side that payment was genuinely completed.
    // Token = HMAC(payment_id | amount, RAZORPAY_KEY_SECRET)
    // Anyone who fakes the URL would need the secret to produce a valid token.
    const accessToken = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_payment_id}|${amount}`)
      .digest("hex");

    return NextResponse.json(
      {
        success: true,
        message: "Payment verified successfully",
        payment_id: razorpay_payment_id,
        token: accessToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Error verifying payment" }, { status: 500 });
  }
}
