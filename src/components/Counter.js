"use client";
import { useState, useEffect } from "react";

export default function Counter({ target = 1000, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smooth slowdown
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--color-surface)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-border)', marginTop: 'var(--space-3)' }}>
      <div style={{ display: 'flex' }}>
        {/* Render stacked avatars to simulate multiple users */}
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ff4d4f', border: '2px solid var(--color-surface)', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>A</div>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1890ff', border: '2px solid var(--color-surface)', marginLeft: '-8px', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>R</div>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#52c41a', border: '2px solid var(--color-surface)', marginLeft: '-8px', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'white', fontWeight: 'bold' }}>M</div>
      </div>
      <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>
        Join <span style={{ color: 'var(--color-accent-primary)' }}>{count}+</span> students who already bought!
      </span>
    </div>
  );
}
