'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

const slides = [
  { img: '/img/productos/preg1.jpeg', alt: 'Sistema Clic-Clac', title: 'Sistema Clic-Clac' },
  { img: '/img/productos/preg2.jpeg', alt: 'Sistema Modular', title: 'Sistema Modular' },
  { img: '/img/productos/preg3.jpeg', alt: 'Perfiles Disponibles', title: 'Perfiles Disponibles' },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isLightboxOpen) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isLightboxOpen]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '600px', borderRadius: '16px', overflow: 'hidden' }} className="image-carousel-wrapper">
      {slides.map((slide, i) => (
        <div 
          key={slide.title} 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            opacity: current === i ? 1 : 0, 
            transition: 'opacity 0.8s ease-in-out',
            zIndex: current === i ? 1 : 0
          }}
        >
          <div 
            onClick={() => setIsLightboxOpen(true)}
            style={{ position: 'absolute', inset: 0, cursor: 'zoom-in' }}
          >
            <Image src={slide.img} alt={slide.alt} fill style={{ objectFit: 'cover' }} />
          </div>
          
          <div style={{ position: 'absolute', bottom: '32px', left: '32px', zIndex: 2 }}>
            <div style={{ 
              background: 'var(--brand-red)', 
              color: '#fff', 
              padding: '12px 24px', 
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h5 style={{ margin: 0, fontWeight: 800, fontSize: '1.25rem', color: '#fff', letterSpacing: '0.5px' }}>{slide.title}</h5>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', padding: '0 16px', zIndex: 3 }}>
        <button onClick={prev} className="carousel-control" aria-label="Anterior">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button onClick={next} className="carousel-control" aria-label="Siguiente">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div style={{ position: 'absolute', bottom: '32px', right: '32px', display: 'flex', gap: '8px', zIndex: 2, background: 'rgba(0,0,0,0.3)', padding: '10px 16px', borderRadius: '30px', backdropFilter: 'blur(8px)' }}>
        {slides.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            style={{ 
              width: current === i ? '24px' : '10px', 
              height: '10px', 
              borderRadius: '10px', 
              background: current === i ? 'var(--brand-red)' : 'rgba(255,255,255,0.5)',
              border: current === i ? '1px solid rgba(255,255,255,0.3)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Ir a diapositiva ${i+1}`}
          />
        ))}
      </div>

      {/* Lightbox Overlay using Portal to bypass parent transforms */}
      {isLightboxOpen && mounted && createPortal(
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.98)',
          zIndex: 99999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(20px)',
          padding: '40px'
        }}
        onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button 
             onClick={() => setIsLightboxOpen(false)}
             style={{ position: 'absolute', top: '32px', right: '32px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', zIndex: 100000000, width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
             className="lightbox-btn"
          >
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          
          <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => e.stopPropagation()}>
             <div style={{ position: 'relative', width: '100%', height: '100%', animation: 'zoomIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)' }}>
                <Image src={slides[current].img} alt={slides[current].alt} fill style={{ objectFit: 'contain' }} />
             </div>
          </div>
          
           {/* Lightbox Controls */}
           <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: 'absolute', left: '32px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', color: '#fff', width: '64px', height: '64px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', zIndex: 100000000 }} className="lightbox-btn">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <button onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: 'absolute', right: '32px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', color: '#fff', width: '64px', height: '64px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', zIndex: 100000000 }} className="lightbox-btn">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
           </button>
           
           {/* Lightbox Badge Info */}
           <div style={{ position: 'absolute', bottom: '48px', textAlign: 'center', zIndex: 100000000 }}>
             <span style={{ background: 'var(--brand-red)', color: '#fff', padding: '12px 32px', borderRadius: '30px', fontWeight: 800, fontSize: '1.4rem', boxShadow: '0 8px 24px rgba(0,0,0,0.6)', letterSpacing: '0.5px' }}>
               {slides[current].title}
             </span>
           </div>
        </div>,
        document.body
      )}

      <style>{`
        .carousel-control {
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .carousel-control:hover {
          background: var(--brand-red);
          transform: scale(1.1);
        }
        .lightbox-btn:hover {
          background: var(--brand-red) !important;
          border-color: var(--brand-red) !important;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
