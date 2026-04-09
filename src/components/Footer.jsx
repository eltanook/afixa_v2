'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import styles from './Footer.module.css'; // We'll create this to keep it clean

const FOOTER_LINKS = {
  quick: [
    { label: 'Sobre Nosotros', href: '/nosotros' },
    { label: 'Nuestros Sistemas', href: '/sistemas' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Cotización', href: '/cotizacion' },
    { label: 'Contacto', href: '/contacto' },
  ],
  products: [
    { label: 'Marcos Clic-Clac', href: 'https://afixsa.com.ar/marcos-clic-clac', external: true },
    { label: 'Caballete Clic-Clac', href: 'https://afixsa.com.ar/caballete-clic-clac', external: true },
    { label: 'Pedestal Clic-Clac', href: 'https://afixsa.com.ar/pedestal-clic-clac', external: true },
    { label: 'Cajas Backlight', href: 'https://afixsa.com.ar/blink-light', external: true },
    { label: 'Catálogo Completo', href: 'https://afixsa.com.ar/productos', external: true },
  ],
};

const SOCIALS = [
  { icon: 'fb', label: 'Facebook', href: 'https://www.facebook.com/afixsa', svg: <Icon name="facebook" size={18} /> },
  { icon: 'ig', label: 'Instagram', href: 'https://www.instagram.com/afix.sa', svg: <Icon name="instagram" size={18} /> },
  { icon: 'yt', label: 'YouTube', href: 'https://www.youtube.com/@afixsa', svg: <Icon name="youtube" size={18} /> },
  { icon: 'wa', label: 'WhatsApp', href: 'https://wa.me/5491135415059', svg: <Icon name="whatsapp" size={18} /> },
];

export default function Footer() {
  const [height, setHeight] = useState(0);
  const footerRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) setHeight(footerRef.current.offsetHeight);
    const ob = new ResizeObserver(() => {
      setHeight(footerRef.current?.offsetHeight || 0);
    });
    if (footerRef.current) ob.observe(footerRef.current);
    return () => ob.disconnect();
  }, []);

  return (
    <>
      <div style={{ height: height, display: height ? 'block' : 'none' }} aria-hidden="true" />
      <footer 
        ref={footerRef}
        className={styles.footerMain}
        style={{ 
          position: height ? 'fixed' : 'relative',
          bottom: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <div className={styles.gridBg} />
        <div className={`container-afix ${styles.container}`} style={{ paddingTop: '80px', paddingBottom: '0' }}>
          <div className={styles.grid}>
            {/* Brand */}
            <div>
              <Image src="/img/logos/logo_light.png" alt="AFIX" width={110} height={44} style={{ marginBottom: '24px' }} />
              <p className={styles.infoRow}><Icon name="map-pin" size={16} /> Luzuriaga 645, Barracas, CABA</p>
              <p className={styles.infoRow}><Icon name="phone" size={16} /> 11 3541-5059</p>
              <p className={styles.infoRow}><Icon name="mail" size={16} /> atencioncliente@afixsa.com</p>
              <p className={styles.infoRow} style={{ marginBottom: '24px' }}><Icon name="clock" size={16} /> Lun-Vie: 10:00 - 17:00 hs</p>
              <div className={styles.socialRow}>
                {SOCIALS.map(s => (
                  <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={styles.social}>
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={styles.title}>Enlaces Rápidos</h4>
              <ul className={styles.linkList}>
                {FOOTER_LINKS.quick.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className={styles.fLink}>
                      <span className={styles.fLinkArrow}><Icon name="arrow-right" size={14} /></span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className={styles.title}>Productos</h4>
              <ul className={styles.linkList}>
                {FOOTER_LINKS.products.map(l => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className={styles.fLink}>
                      <span className={styles.fLinkArrow}><Icon name="arrow-right" size={14} /></span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Horarios */}
            <div>
              <h4 className={styles.title}>Horarios</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'rgba(255,255,255,0.5)' }}>Lunes a Viernes</p>
              <p style={{ color: '#fff', fontWeight: 600, marginBottom: '24px', fontFamily: 'var(--font-head)', letterSpacing: '0.5px' }}>10:00 hs — 17:00 hs</p>
              <a href="https://wa.me/5491135415059" target="_blank" rel="noopener noreferrer"
                className="btn-primary-afix" style={{ fontSize: '0.85rem', padding: '10px 18px', width: 'fit-content' }}>
                Escribinos por WhatsApp →
              </a>
            </div>
          </div>

          <div style={{ padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>© {new Date().getFullYear()} AFIX S.A. Todos los Derechos Reservados.</p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>Desarrollado interactivo por <a href="https://zevetix.site" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-red)' }}>Zevetix</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}
