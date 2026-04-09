'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';

export default function TeamCarousel({ team }) {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
      
      if (scrollRef.current.children.length > 0) {
        const cardWidth = scrollRef.current.children[0].offsetWidth + 24;
        const exactIdx = Math.round(scrollLeft / cardWidth);
        setActiveIdx(exactIdx);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      handleScroll();
    }
  }, []);

  const slide = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 60px' }}>
      
      {/* Floating Controls */}
      <button 
        onClick={() => slide('left')} 
        className="team-carousel-control team-carousel-prev"
        aria-label="Equipo Anterior"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>

      <button 
        onClick={() => slide('right')} 
        className="team-carousel-control team-carousel-next"
        aria-label="Equipo Siguiente"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      {/* Cards Scroll Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ 
          display: 'flex', 
          gap: '24px', 
          overflowX: 'auto', 
          scrollSnapType: 'x mandatory', 
          padding: '10px 4px 40px',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          scrollBehavior: 'smooth'
        }} 
        className="hide-scrollbar"
      >
        {team.map((m, i) => (
          <div key={m.name} className="team-item-col" style={{ 
            transitionDelay: `${(i % 3) * 0.1}s`, 
            scrollSnapAlign: 'start', 
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <Image src={m.img} alt={m.name} fill style={{ objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.5s ease' }} className="team-img-hover" />
            
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px 24px', background: 'linear-gradient(transparent, rgba(0,0,0,0.95))', color: '#fff', zIndex: 1 }}>
              <h4 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '4px', fontFamily: 'var(--font-head)', letterSpacing: '0.5px' }}>{m.name}</h4>
              <span style={{ fontSize: '0.95rem', color: 'var(--brand-red)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{m.role}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
        {team.map((_, i) => (
          <button 
            key={i}
            onClick={() => {
              if (scrollRef.current?.children[i]) {
                const card = scrollRef.current.children[i];
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
              }
            }}
            style={{ 
              width: activeIdx === i ? '24px' : '10px', 
              height: '10px', 
              borderRadius: '10px', 
              background: activeIdx === i ? 'var(--brand-red)' : 'var(--border)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Ir a tarjeta de equipo ${i+1}`}
          />
        ))}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .team-item-col {
          min-width: calc(33.333% - 16px);
          aspect-ratio: 1/1;
        }
        @media (max-width: 991px) {
          .team-item-col {
            min-width: calc(50% - 12px);
          }
        }
        @media (max-width: 575px) {
          .team-item-col {
            min-width: 100%;
          }
        }
        .team-carousel-control {
          position: absolute;
          top: 45%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          background: var(--bg);
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        .team-carousel-prev { left: -10px; }
        .team-carousel-next { right: -10px; }
        
        @media (max-width: 768px) {
          .team-carousel-prev { left: -16px; }
          .team-carousel-next { right: -16px; }
        }
        
        .team-carousel-control:hover {
          background: var(--brand-red);
          color: #fff;
          border-color: var(--brand-red);
          transform: translateY(-50%) scale(1.1);
        }
      `}</style>
    </div>
  );
}
