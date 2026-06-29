import ThemeToggle from "../../components/ThemeToggle";
import ReviewForm from "./ReviewForm";
import crypto from "crypto";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Payment Successful | 360 AI 101",
  description: "Your purchase is confirmed. Download your 360 AI 101 course guide and start mastering AI today.",
};

export default async function SuccessPage({ searchParams }) {
  const { amount, payment_id, token } = await searchParams;
  const safeAmount = amount === "99" ? "99" : "51";

  // Validate the secure token
  if (!payment_id || !token) {
    redirect("/");
  }

  const expectedToken = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(payment_id.toString())
    .digest("hex");

  if (token !== expectedToken) {
    redirect("/");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "var(--space-4) var(--space-3)",
        background: "var(--color-background)",
      }}
    >
      <ThemeToggle />

      {/* Page Header */}
      <div
        style={{
          textAlign: "center",
          padding: "var(--space-6) var(--space-3) var(--space-4)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-1)",
            background: "rgba(0, 240, 255, 0.1)",
            border: "1px solid rgba(0, 240, 255, 0.3)",
            borderRadius: "var(--radius-pill)",
            padding: "6px 16px",
            marginBottom: "var(--space-3)",
            fontSize: "0.9rem",
            color: "var(--color-accent-primary)",
            fontWeight: 600,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
          Payment Confirmed
        </div>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            marginBottom: "var(--space-2)",
          }}
        >
          Welcome to{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            360 AI 101
          </span>
        </h1>
        <p
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "1.1rem",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          Your ₹{safeAmount} payment was verified successfully. Your AI journey
          starts now.
        </p>
      </div>

      {/* Download + Review Form */}
      <ReviewForm amount={safeAmount} />

      {/* Back to Home */}
      <div style={{ textAlign: "center", marginTop: "var(--space-6)", paddingBottom: "var(--space-6)" }}>
        <a
          href="/"
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "0.9rem",
            textDecoration: "underline",
          }}
        >
          ← Back to Home
        </a>
      </div>
    </main>
  );
}
