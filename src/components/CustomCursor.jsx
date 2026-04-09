'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) {
      // Mobile/touch - hide cursor entirely
      if (cursor) cursor.style.display = 'none';
      return;
    }

    const lerp = (a, b, t) => a + (b - a) * t;

    // Smooth follow via RAF
    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, posRef.current.x, 0.4);
      currentPos.current.y = lerp(currentPos.current.y, posRef.current.y, 0.4);
      cursor.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const onMouseDown = () => cursor.classList.add('cursor-click');
    const onMouseUp = () => cursor.classList.remove('cursor-click');

    const onEnterInteractive = () => cursor.classList.add('cursor-hover');
    const onLeaveInteractive = () => cursor.classList.remove('cursor-hover');
    const onEnterText = () => cursor.classList.add('cursor-text');
    const onLeaveText = () => cursor.classList.remove('cursor-text');

    const bindInteractive = () => {
      document.querySelectorAll('a, button, [role="button"], label[for], select, .team-card, .product-card-new, .faq-question').forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
      document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="time"], input[type="date"], textarea').forEach(el => {
        el.addEventListener('mouseenter', onEnterText);
        el.addEventListener('mouseleave', onLeaveText);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    bindInteractive();

    // Re-bind on navigation changes
    const observer = new MutationObserver(bindInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="afix-cursor" aria-hidden="true" />;
}
