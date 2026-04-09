'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BeforeAfterSlider() {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let pct = (x / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    setPosition(pct);
  };

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePosition(e);
  };

  const handlePointerUp = (e) => {
    e.target.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updatePosition(e);
  };



  return (
    <section className="section" id="sobre-nosotros">
      <div className="container-afix" style={{ maxWidth: '1400px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: '80px', alignItems: 'center' }}>
          
          {/* Left: Text */}
          <div className="reveal">
            <span className="tag-label">Sobre Nosotros</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontFamily: 'var(--font-head)', fontWeight: '700', lineHeight: 1.1, marginBottom: '24px' }}>
              El antes y el <br/>
              <span style={{ color: 'var(--brand-red)' }}>después</span> de la exhibición.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '32px' }}>
              Olvídate de pegamentos, cintas o personal especializado. La diferencia tecnológica de AFIX impacta el rendimiento operativo y la estética general del espacio corporativo. Comprobá el impacto al cambiar tus exhibidores tracionales por marcos de última generación.
            </p>
            <Link href="/nosotros" className="btn-primary-afix">Conocer nuestra Fábrica</Link>
          </div>

          {/* Right: Slider */}
          <div className="reveal reveal-delay-1" style={{ display: 'flex', justifyContent: 'center' }}>
            <div 
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerMove={handlePointerMove}
              onPointerCancel={handlePointerUp}
              onMouseLeave={handlePointerUp}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: '24px',
                overflow: 'hidden',
                background: '#ccc',
                boxShadow: 'var(--shadow-lg)',
                cursor: 'none',
                touchAction: 'none'
              }}
            >
              {/* IMAGE A - BEFORE (Background) */}
              <div style={{ position: 'absolute', inset: 0 }}>
                <Image src="/img/general/antiguo.jpg" alt="Exhibición Tradicional - Antes" fill style={{ objectFit: 'cover', pointerEvents: 'none' }} draggable={false} />
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '6px 14px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Tradicional</div>
              </div>

              {/* IMAGE B - AFTER (Foreground Cliped via clip-path) */}
              <div style={{ 
                  position: 'absolute', inset: 0, 
                  clipPath: `inset(0 ${100 - position}% 0 0)`,
                  zIndex: 2
              }}>
                <Image src="/img/general/actual.jpg" alt="Exhibición AFIX - Después" fill style={{ objectFit: 'cover', pointerEvents: 'none' }} draggable={false} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'var(--brand-red)', color: 'white', padding: '6px 14px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Con AFIX</div>
              </div>

              {/* Slider Handle Line */}
              <div style={{
                position: 'absolute',
                top: 0, bottom: 0,
                left: `${position}%`,
                width: '4px',
                marginLeft: '-2px',
                background: '#fff',
                boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                pointerEvents: 'none'
              }}>
                 {/* Center Dot */}
                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '54px', height: '54px', background: 'var(--brand-red)', border: '2px solid #fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', color: '#fff' }}>
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M12 5l-7 7 7 7M12 19l7-7-7-7"/>
                   </svg>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Adjust mobile view via style tag to avoid an external CSS file for one tweak */}
      <style>{`
        @media (max-width: 768px) {
          #sobre-nosotros .container-afix > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
