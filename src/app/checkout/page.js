import CheckoutForm from "../../components/CheckoutForm";
import ThemeToggle from "../../components/ThemeToggle";

// Some high-converting reviews for the checkout page
const checkoutReviews = [
  { name: "Ananya Sharma", role: "Digital Marketer", text: "I was skeptical at first, but the templates alone saved me 10+ hours this week. Secure checkout was seamless.", stars: "★★★★★" },
  { name: "Rohan Kapoor", role: "Software Developer", text: "Best ₹99 I've ever spent. The PDF arrived instantly after payment. Highly trustworthy and effective.", stars: "★★★★★" },
  { name: "Meera Joshi", role: "Freelancer", text: "The advanced tricks changed the way I write proposals. I made my money back on day one.", stars: "★★★★★" }
];

export default async function CheckoutPage({ searchParams }) {
  const { amount, tier } = await searchParams; 
  const safeAmount = amount === "99" ? "99" : "51";
  const tierName = tier || (safeAmount === "99" ? "The Ultimate Edge" : "The Essentials");

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 'var(--space-4) var(--space-3)' }}>
      <ThemeToggle />
      
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>
          Secure Checkout
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
          You are one step away from mastering AI with <strong>{tierName}</strong>.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: 'var(--space-6)', 
        maxWidth: '1000px', 
        margin: '0 auto', 
        width: '100%' 
      }}>
        
        {/* Left Side: The Form */}
        <div>
          <CheckoutForm amount={safeAmount} tierName={tierName} />
          
          <div style={{ marginTop: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            256-bit SSL Secure Encrypted Payment
          </div>
        </div>

        {/* Right Side: Trust & Social Proof */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ background: 'var(--color-surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-2)' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>{tierName} Access</span>
              <strong>₹{safeAmount}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
              <strong>Total</strong>
              <strong style={{ color: 'var(--color-accent-primary)' }}>₹{safeAmount}</strong>
            </div>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--space-3)', fontSize: '1.2rem' }}>Recent Success Stories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {checkoutReviews.map((review, idx) => (
                <div key={idx} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--color-accent-primary), var(--color-accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', flexShrink: 0 }}>
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{review.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{review.role}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', color: '#fbbf24', fontSize: '0.9rem', letterSpacing: '1px' }}>
                      {review.stars}
                    </div>
                  </div>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
