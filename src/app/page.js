import styles from "./page.module.css";
import ThemeToggle from "../components/ThemeToggle";
import Counter from "../components/Counter";

const reviews = [
  { name: "Rahul Sharma", role: "Software Engineer", text: "In my dev job, 360 AI saves me at least 2 hours every day. The short tricks for code generation and debugging are just insane. A must-have for techies.", stars: "★★★★★" },
  { name: "Pooja Verma", role: "Content Writer", text: "I bought the ₹51 Essentials course and it was worth 100x the price! The PDF guide is literally a cheat sheet that I keep open every day while working.", stars: "★★★★★" },
  { name: "Aditya Singh", role: "Computer Science Student", text: "The daily newsletters keep me updated with AI trends better than my professors. The Ultimate Edge package is a total steal.", stars: "★★★★★" },
  { name: "Sneha Reddy", role: "HR Executive", text: "I bought the Ultimate Edge tier. I use the techniques taught here to parse resumes and draft emails. Worth every single rupee and more.", stars: "★★★★★" },
  { name: "Vikram Desai", role: "Freelance Designer", text: "The short tricks on brainstorming and prompt engineering helped me land more gigs. 360 AI is like having a junior assistant available 24/7.", stars: "★★★★☆" },
];

const aiTools = [
  "Claude 3.5 Sonnet", "ChatGPT Plus", "Google Gemini",
  "NotebookLLM", "Midjourney", "Lovable", "Antigravity", "Cursor"
];

export default function Home() {
  return (
    <main className={styles.main}>
      <ThemeToggle />

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <h1 className={styles.heroTitle}>
          Master the <span className="text-gradient">AI Revolution</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Unlock the ultimate potential of 360 AI. From basic hacks to advanced workflows,
          become the tech genius everyone envies. Built for the modern creator.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="button button-primary" href="#pricing">
            Buy Now & Get Started
          </a>
          <a className="button button-outline" href="#why">
            Learn More
          </a>
        </div>
        <Counter target={1248} duration={2500} />
      </header>

      {/* AI Tools Marquee */}
      <div className={styles.toolsContainer} aria-hidden="true">
        <div className={styles.toolsTrack}>
          {[...aiTools, ...aiTools, ...aiTools].map((tool, idx) => (
            <div key={idx} className={styles.toolBadge}>

              {tool}
            </div>
          ))}
        </div>
      </div>

      {/* What You'll Learn Section (SEO Optimized & Insightful) */}
      <section id="why" className="section container">
        <div className="text-center">
          <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>Why 360 AI 101?</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Go beyond generic prompt copy-pasting. We teach deep, systemic AI automation techniques to give you an unfair advantage in your career.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent-primary)' }}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
            </span>
            <h3 className={styles.featureTitle}>Master Prompt Architecture</h3>
            <p className={styles.featureText}>Stop writing basic requests. Learn context-stacking, persona-injection, and constraint modeling to force LLMs into generating deterministic, high-quality outputs every single time.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent-primary)' }}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </span>
            <h3 className={styles.featureTitle}>Automate Workflow Pipelines</h3>
            <p className={styles.featureText}>Turn hours of manual research, writing, and data entry into a 5-minute automated AI script. We cover cross-tool integrations (Claude + Sheets + Midjourney) to build seamless pipelines.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent-primary)' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </span>
            <h3 className={styles.featureTitle}>Future-Proof Your Career</h3>
            <p className={styles.featureText}>The job market is splitting into those who use AI and those replaced by it. Gain the exact AI automation skillsets that top-tier tech companies are desperately demanding right now.</p>
          </div>
        </div>
      </section>

      {/* Pricing & Reviews Section */}
      <section id="pricing" className="section container">
        <div className={`text-center ${styles.pricingHeader}`}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>Choose Your Tier</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Transparent pricing, instant access. Join 10,000+ students taking control of their future.</p>
        </div>

        <div className={styles.comboGrid}>
          {/* Tier 1 */}
          <div className={styles.pricingCard}>
            <h3>The Essentials</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Perfect for getting started.</p>
            <div className={styles.pricingPrice}>
              <span className={styles.pricingCurrency}>₹</span>51
            </div>
            <ul className={styles.pricingFeatures}>
              <li className={styles.pricingFeature}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Full 360 AI 101 PDF Guide
              </li>
              <li className={styles.pricingFeature}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Lifetime Access to Course Material
              </li>
              <li className={styles.pricingFeature} style={{ opacity: 0.5 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                Daily Newsletters
              </li>
              <li className={styles.pricingFeature} style={{ opacity: 0.5 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                Updated Tech World News
              </li>
              <li className={styles.pricingFeature} style={{ opacity: 0.5 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                Advanced Short Tricks
              </li>
            </ul>
            <a href="/checkout?amount=51&tier=Essentials" className="button button-outline" style={{ textAlign: 'center' }}>Buy Now - ₹51</a>
          </div>

          {/* Tier 2 */}
          <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
            <h3>The Ultimate Edge</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>For those who want to stay ahead.</p>
            <div className={styles.pricingPrice}>
              <span className={styles.pricingCurrency}>₹</span>99
            </div>
            <ul className={styles.pricingFeatures}>
              <li className={styles.pricingFeature}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Full 360 AI 101 PDF Guide
              </li>
              <li className={styles.pricingFeature}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Lifetime Access to Course Material
              </li>
              <li className={styles.pricingFeature}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Daily Newsletters
              </li>
              <li className={styles.pricingFeature}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Updated Tech World News
              </li>
              <li className={styles.pricingFeature}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Advanced Short Tricks
              </li>
            </ul>
            <a href="/checkout?amount=99&tier=Ultimate" className="button button-primary" style={{ textAlign: 'center' }}>Get Started Today - ₹99</a>
          </div>

          {/* Vertical Reviews */}
          <div className={styles.reviewsVertical}>
            <div style={{ marginBottom: 'var(--space-2)' }}>
              <h3 style={{ fontSize: '1.5rem' }}>Trusted by 10,000+ Students & Professionals</h3>
            </div>
            {reviews.map((review, idx) => (
              <div key={idx} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewAvatar}>
                    {review.name.charAt(0)}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div className={styles.reviewName}>{review.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>{review.role}</div>
                  </div>
                  <div className={styles.reviewStars}>{review.stars}</div>
                </div>
                <p className={styles.reviewText}>"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="section container">
        <div className="text-center">
          <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>Frequently Asked Questions</h2>
        </div>
        <div className={styles.faqSection}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Is 360 AI 101 suitable for beginners without coding experience?</h3>
            <p className={styles.faqAnswer}>Absolutely. While we cover advanced prompt architecture, the course is designed to take you from zero to expert. You do not need a computer science degree or coding background to master these AI workflows.</p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>How do I get access to the AI course materials?</h3>
            <p className={styles.faqAnswer}>Immediately after your ₹51 or ₹99 payment is verified, you will receive an instant download link to the comprehensive 360 AI 101 PDF Guide, along with lifetime access to all future core updates.</p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What AI tools does this course cover?</h3>
            <p className={styles.faqAnswer}>Our curriculum is tool-agnostic but features deep dives into ChatGPT Plus, Claude 3.5 Sonnet, Google Gemini, and NotebookLLM, showing you how to chain these models together for maximum productivity.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} 360 AI 101. All rights reserved. Master Prompt Engineering Today.</p>
      </footer>
    </main>
  );
}
