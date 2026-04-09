'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';

export default function SistemasScroll({ systems }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let sectionTop = 0;
    let scrollRange = 0;
    let trackWidth = 0;
    let vpW = 0;
    let rafPending = false;

    const measure = () => {
      if (!sectionRef.current || !trackRef.current) return;
      sectionTop = sectionRef.current.offsetTop;
      // Make the scroll range tall enough for smooth tracking of 4 items
      scrollRange = sectionRef.current.offsetHeight - window.innerHeight;
      trackWidth = trackRef.current.scrollWidth;
      vpW = window.innerWidth;
    };

    const updatePlayhead = () => {
      const scrollY = window.scrollY;
      let p = (scrollY - sectionTop) / scrollRange;
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      
      const maxTranslateX = trackWidth - vpW;
      if (trackRef.current && maxTranslateX > 0) {
        trackRef.current.style.transform = `translate3d(-${p * maxTranslateX}px, 0, 0)`;
      }
    };

    const onScroll = () => {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => {
          updatePlayhead();
          rafPending = false;
        });
      }
    };

    // Give a little time for images to calculate layout
    requestAnimationFrame(() => {
      measure();
      updatePlayhead();
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      measure();
      updatePlayhead();
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: '400vh', position: 'relative', background: 'var(--bg-alt)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div ref={trackRef} style={{ display: 'flex', gap: '32px', padding: '0 5vw', width: 'max-content', willChange: 'transform' }}>
          
          {systems.map((sys, idx) => (
            <div key={sys.id} id={sys.id} className="glass-card systems-card-mobile" style={{
              width: '80vw',
              minWidth: '320px',
              maxWidth: '900px',
              display: 'flex',
              flexDirection: 'column',
              padding: '40px',
              gap: '32px',
              marginRight: idx === systems.length - 1 ? '5vw' : 0
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                 <div>
                   <span className="tag-label" style={{ marginBottom: '8px' }}>{sys.badge}</span>
                   <h3 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-head)' }}>{sys.name}</h3>
                 </div>
                 <h4 style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--border)', fontFamily: 'var(--font-head)', lineHeight: 1, opacity: 0.5 }}>0{idx + 1}</h4>
              </div>

              <div className="systems-main-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
                 {/* Media Column (No iframes, transparent bg) */}
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ background: 'transparent', display: 'flex', justifyContent: 'center' }}>
                      <Image src={sys.img} alt={sys.name} width={400} height={350} style={{ objectFit: 'contain', width: '100%', height: '320px' }} />
                    </div>
                 </div>

                 {/* Text Column */}
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '32px' }}>
                      {sys.desc}
                    </p>
                    <div className="systems-features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '40px' }}>
                      {sys.features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>
                          <Icon name="check" size={16} style={{ color: 'var(--brand-red)' }} /> {f}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Link href="/cotizacion" className="btn-primary-afix">Cotizar este Sistema</Link>
                    </div>
                 </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          .systems-card-mobile {
            padding: 24px !important;
            width: 90vw !important;
          }
          .systems-features-grid {
             grid-template-columns: 1fr !important;
          }
          .systems-main-grid {
             gap: 24px !important;
             grid-template-columns: 1fr !important;
          }
          .systems-idx-bg {
             font-size: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
