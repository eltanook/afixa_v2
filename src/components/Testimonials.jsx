'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    name: 'Mariana González',
    role: 'Directora de Marketing — Grupo Lúmen',
    avatar: '/img/clientes/3.png',
    quote: 'Los marcos Clic-Clac nos cambiaron la operativa. Antes tardábamos horas actualizando gráficas en 15 sucursales; ahora lo hace cualquier empleado en minutos, sin herramientas.',
    stars: 5,
  },
  {
    name: 'Roberto Espinoza',
    role: 'Gerente General — Cadena Farmacéutica',
    avatar: '/img/clientes/7.png',
    quote: 'La calidad del aluminio es impresionante. 3 años después todos nuestros marcos siguen impecables. AFIX tiene el mejor producto del mercado, sin dudas.',
    stars: 5,
  },
  {
    name: 'Claudia Méndez',
    role: 'Encargada Visual — Retail Moda',
    avatar: '/img/clientes/12.png',
    quote: 'Implementamos los sistemas en toda la tienda. El cambio de imagen de temporada ahora es tan simple que nuestra clienta casi no lo nota — eso es exactamente lo que buscábamos.',
    stars: 5,
  },
  {
    name: 'Lucas Ferrara',
    role: 'Arquitecto — Estudio Ferrara & Asociados',
    avatar: '/img/clientes/15.png',
    quote: 'Recomiendo AFIX a todos mis clientes cuando necesitan soluciones de cartelería premium. El producto es elegante, prolijo y muy duradero. Impecables en atención también.',
    stars: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const next = () => setActive(a => (a + 1) % TESTIMONIALS.length);
  const prev = () => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goTo = (i) => setActive(i);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(next, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, active]);

  const t = TESTIMONIALS[active];
  const prevIdx = (active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
  const nextIdx = (active + 1) % TESTIMONIALS.length;

  return (
    <section className="section" id="testimonios">
      <div className="container-afix">
        <div className={styles.header}>
          <span className="tag-label reveal">Testimonios</span>
          <h2 className={`${styles.title} reveal reveal-delay-1`}>Lo Que Dicen Nuestros Clientes</h2>
          <p className={`${styles.sub} reveal reveal-delay-2`}>Más de 700 empresas eligen AFIX para su imagen corporativa.</p>
        </div>

        <div
          className={styles.carousel}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Prev card (ghost) */}
          <div className={`${styles.card} ${styles.cardSide} ${styles.cardLeft}`} onClick={prev}>
            <div className={styles.cardInner}>
              <p className={styles.quote}>"{TESTIMONIALS[prevIdx].quote}"</p>
              <div className={styles.author}>
                <div>
                  <strong>{TESTIMONIALS[prevIdx].name}</strong>
                  <span>{TESTIMONIALS[prevIdx].role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main active card */}
          <div className={`${styles.card} ${styles.cardMain}`}>
            <div className={styles.cardInner}>
              <p className={styles.quoteMain}>"{t.quote}"</p>
              <div className={styles.author}>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next card (ghost) */}
          <div className={`${styles.card} ${styles.cardSide} ${styles.cardRight}`} onClick={next}>
            <div className={styles.cardInner}>
              <p className={styles.quote}>"{TESTIMONIALS[nextIdx].quote}"</p>
              <div className={styles.author}>
                <div>
                  <strong>{TESTIMONIALS[nextIdx].name}</strong>
                  <span>{TESTIMONIALS[nextIdx].role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={prev} aria-label="Anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <div className={styles.dots}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={`${styles.dot} ${i === active ? styles.dotActive : ''}`} onClick={() => goTo(i)} aria-label={`Testimonio ${i + 1}`} />
            ))}
          </div>
          <button className={styles.arrowBtn} onClick={next} aria-label="Siguiente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
