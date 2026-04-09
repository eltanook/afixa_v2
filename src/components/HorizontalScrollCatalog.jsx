'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';

const PRODUCTS = [
  { name: 'Marcos Clic-Clac 32', sub: 'El Estándar Indiscutible', img: '/img/PRODUCTOS/MCC32-A4-AL.png', href: '/sistemas#marcos-clicclac' },
  { name: 'Marcos Clic-Clac 20', sub: 'Compacto y Dinámico', img: '/img/PRODUCTOS/MCC20-A4-AL.png', href: '/sistemas#marcos-clicclac' },
  { name: 'Marcos Clic-Clac 18', sub: 'Perfil Fino y Elegante', img: '/img/PRODUCTOS/MCC18-A4-AL.png', href: '/sistemas#marcos-clicclac' },
  { name: 'Marcos Modulares', sub: 'Versatilidad Absoluta', img: '/img/PRODUCTOS/COMBI-A4-AL.png', href: '/sistemas#marcos-modulares' },
  { name: 'Poster Snap', sub: 'Grandes Formatos Seguros', img: '/img/PRODUCTOS/MCC50-A4-AL.png', href: '/sistemas#poster-snap' },
  { name: 'Cajas Backlight', sub: 'Iluminación Premium', img: '/img/PRODUCTOS/CAJA%20BACKLIGHT-A4-AL%202.png', href: '/sistemas#backlight' },
  { name: 'Pedestales', sub: 'Oficinas y Restoranes', img: '/img/PRODUCTOS/PEDESTAL-A4-AL.png', href: '/sistemas#hang-paper' },
  { name: 'Caballetes', sub: 'Comunicación en Doble Vía', img: '/img/PRODUCTOS/CABALLETE-A4-AL.png', href: '/sistemas#hang-paper' },
];

export default function HorizontalScrollCatalog() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let sectionTop = 0;
    let scrollRange = 0;
    let trackWidth = 0;
    let vpW = 0;
    let rafPending = false;

    const measure = () => {
      if (!sectionRef.current || !trackRef.current) return;
      sectionTop = sectionRef.current.offsetTop;
      // Scroll range = Total Section Height - Window Height
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

    measure();
    updatePlayhead();

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
    <section ref={sectionRef} style={{ height: '450vh', position: 'relative', background: '#0a0a0a' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        
        {/* Absolute Background Deco */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.15, pointerEvents: 'none', zIndex: 0 }}>
           <h2 style={{ fontSize: '20vw', fontFamily: 'var(--font-head)', color: '#fff', whiteSpace: 'nowrap', fontWeight: 800 }}>CATÁLOGO</h2>
           {/* Red Grid Overlay behind text - High Visibility */}
           <div style={{ 
             position: 'absolute', inset: -1000, 
             backgroundImage: 'linear-gradient(rgba(191, 3, 17, 0.45) 2px, transparent 2px), linear-gradient(90deg, rgba(191, 3, 17, 0.45) 2px, transparent 2px)',
             backgroundSize: '120px 120px',
             opacity: 0.8,
             zIndex: -1
           }} />
        </div>

        <div ref={trackRef} className="responsive-catalog-track" style={{ display: 'flex', gap: '3vw', padding: '0 10vw', width: 'max-content', willChange: 'transform' }}>
          
          {/* Intro Card */}
          <div className="intro-card-catalog" style={{ width: '40vw', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="tag-label">
              <Icon name="package" size={14} /> Soluciones AFIX
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 4rem)', fontFamily: 'var(--font-head)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', color: '#fff' }}>
              Diseñados para <br/>destacar.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '32px' }}>
              Cada sistema está construido con aluminio estructurado y terminales reforzadas, garantizando funcionalidad excepcional a lo largo de décadas.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
               <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                 <Icon name="arrow-right" size={24} />
               </div>
               <span style={{ alignSelf: 'center', fontWeight: 600, color: 'var(--brand-red)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Deslizá para explorar</span>
            </div>
          </div>

          {/* Product Cards */}
          {PRODUCTS.map((p, i) => (
            <Link key={i} href={p.href} className="product-card-catalog" style={{
              width: '70vw',
              maxWidth: '900px',
              height: '70vh',
              borderRadius: '24px',
              background: '#141414',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              border: '1px solid #333',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative',
              textDecoration: 'none'
            }}>
              
              <div style={{ flex: 1, position: 'relative', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className="group-hoverable"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedImg(p.img);
                }}
                onMouseEnter={(e) => { e.currentTarget.querySelector('.cta-overlay').style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.querySelector('.cta-overlay').style.opacity = '0'; }}>
                <div style={{ position: 'relative', width: '80%', height: '80%' }}>
                  <Image src={p.img} alt={p.name} fill style={{ objectFit: 'contain' }} />
                </div>
              
                {/* Overlay CTA */}
                <div className="cta-overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.6s ease', zIndex: 10
                }}>
                  <div style={{ padding: '12px 24px', background: 'var(--brand-red)', borderRadius: '30px', color: '#fff', fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon name="eye" size={20} /> Ver Imagen
                  </div>
                </div>
              </div>

              <div className="product-card-info-wrap" style={{ padding: '32px 40px', background: '#141414' }}>
                <span style={{ color: 'var(--brand-red)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'var(--font-head)' }}>{p.sub}</span>
                <h3 className="product-card-title" style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-head)', margin: '4px 0 0 0', color: '#fff' }}>{p.name}</h3>
              </div>
            </Link>
          ))}

          {/* Outro view */}
          <div className="outro-card-catalog" style={{ width: '40vw', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '4vw' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 4rem)', fontFamily: 'var(--font-head)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px', color: '#fff' }}>
               Elige la solución<br/>perfecta.
            </h2>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', alignSelf: 'flex-start' }}>
              <Link href="/cotizacion" className="btn-primary-afix">Solicitar Presupuesto</Link>
              <Link href="/contacto" className="cta-link-afix" style={{ color: '#fff' }}>Contactar Asesor <Icon name="arrow-right" size={16}/></Link>
            </div>
          </div>

        </div>
      </div>

      {/* Modal Zoom */}
      {selectedImg && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.98)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5vw', backdropFilter: 'blur(10px)' }}
          onClick={() => setSelectedImg(null)}
        >
          <button style={{ position: 'absolute', top: '40px', right: '40px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '60px', height: '60px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
            <Icon name="x" size={40} />
          </button>
          <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1200px', transform: 'scale(1)', animation: 'zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <Image src={selectedImg} alt="Producción AFIX Zoom" fill style={{ objectFit: 'contain' }} />
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .responsive-catalog-track {
            gap: 16px !important;
            padding: 0 4vw !important;
          }
          .intro-card-catalog, .outro-card-catalog {
            width: 85vw !important;
            min-width: auto !important;
            padding-left: 0 !important;
          }
          .product-card-catalog {
             width: 80vw !important;
             height: 55vh !important;
          }
          .product-card-info-wrap {
             padding: 16px !important;
          }
          .product-card-title {
             font-size: 1.6rem !important;
          }
        }
      `}</style>
    </section>
  );
}
