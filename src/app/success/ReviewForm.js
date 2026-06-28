"use client";
import { useState } from "react";
import styles from "./success.module.css";

const DRIVE_LINK_51  = "https://drive.google.com/your-essentials-pdf-link"; // ← Replace with real link
const DRIVE_LINK_99  = "https://drive.google.com/your-ultimate-pdf-link";   // ← Replace with real link

export default function ReviewForm({ amount }) {
  const driveLink = amount === "99" ? DRIVE_LINK_99 : DRIVE_LINK_51;

  const [rating, setRating] = useState(0);
  const [hover, setHover]   = useState(0);
  const [review, setReview] = useState("");
  const [name,   setName]   = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) { alert("Please select a star rating!"); return; }
    // In a real app, POST to an API that saves the review to a database or sheet
    console.log("Review submitted:", { name, rating, review });
    setSubmitted(true);
  };

  return (
    <div className={styles.wrapper}>
      {/* Download CTA */}
      <div className={styles.downloadCard}>
        <div className={styles.downloadIcon}>🎉</div>
        <h2 className={styles.downloadTitle}>Your Course is Ready!</h2>
        <p className={styles.downloadSubtitle}>
          Click the button below to download your 360 AI 101 guide from Google Drive.
        </p>
        <a
          href={driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`button button-primary ${styles.downloadBtn}`}
        >
          Download Your PDF Now
        </a>
        <p className={styles.downloadNote}>
          A link has also been sent to your registered email.
        </p>
      </div>

      {/* Review Form */}
      <div className={styles.reviewFormCard}>
        <h3 className={styles.reviewFormTitle}>Share Your Experience</h3>
        <p className={styles.reviewFormSubtitle}>
          Help other students by leaving a quick review. It takes 30 seconds!
        </p>

        {submitted ? (
          <div className={styles.successMessage}>
            <span>⭐</span>
            <p>Thank you for your review! You're awesome.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Your Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Your Rating</label>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${styles.star} ${star <= (hover || rating) ? styles.starActive : ""}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    role="button"
                    aria-label={`Rate ${star} stars`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Your Review</label>
              <textarea
                required
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="What did you love most about 360 AI 101?"
                className={styles.textarea}
              />
            </div>

            <button type="submit" className={`button button-primary ${styles.submitBtn}`}>
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
