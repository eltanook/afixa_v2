'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { 
          if (e.isIntersecting) { 
            e.target.classList.add('revealed'); 
          } 
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach(el => observer.observe(el));

    // Reset revealed state on new pages (optional but good for consistency)
    // reveals.forEach(el => el.classList.remove('revealed'));

    // Counter-up
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && !e.target.dataset.ran) {
            e.target.dataset.ran = '1';
            const target = parseInt(e.target.dataset.counter);
            const suffix = e.target.dataset.suffix || '';
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
              current = Math.min(current + step, target);
              e.target.textContent = Math.floor(current) + suffix;
              if (current >= target) clearInterval(timer);
            }, 16);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(el => counterObserver.observe(el));

    // Back to Top
    const backToTop = document.querySelector('.back-to-top');
    const onScroll = () => {
      if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
    };
    const onBTTClick = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (backToTop) backToTop.addEventListener('click', onBTTClick);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      counterObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (backToTop) backToTop.removeEventListener('click', onBTTClick);
  return null;
}
