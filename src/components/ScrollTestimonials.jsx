'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './ScrollTestimonials.module.css';

const ROW_1 = [
  { text: "MÁXIMA DURABILIDAD EN ALUMINIO", author: "Arq. Javier Ferreyra" },
  { text: "LA AGILIDAD QUE NUESTRAS TIENDAS NECESITAN", author: "Gerente Retail Grupo Norte" },
  { text: "EXHIBICIÓN IMPECABLE SIN ESFUERZO", author: "Lucía Méndez" },
  { text: "20 AÑOS SIENDO LÍDERES EN INNOVACIÓN", author: "Sector Publicitario" },
  { text: "CALIDAD QUE SE NOTA A SIMPLE VISTA", author: "Diseño & Espacios" }
];

const ROW_2 = [
  { text: "SISTEMA PATENTADO CLIC-CLAC", author: "AFIX Ingeniería" },
  { text: "TRANSFORMAMOS TU PUNTO DE VENTA", author: "Marketing Team" },
  { text: "TODO EN UN SOLO PASO Y SIN HERRAMIENTAS", author: "Ana Clara Stundupera" },
  { text: "LA SOLUCIÓN PERFECTA PARA GRANDES CADENAS", author: "Compras Corporativas" },
  { text: "LOGÍSTICA FEDERAL - ENVÍOS A TODO EL PAÍS", author: "Distribución AFIX" }
];

export default function ScrollTestimonials() {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTrigger = window.innerHeight;
      
      // Calculate progress relative to section entry
      // When top of section hits bottom of viewport, progress starts (0)
      // When bottom of section hits top of viewport, progress ends (1)
      const progress = 1 - (rect.top / scrollTrigger);
      setOffset(progress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        
        {/* Row 1 - Moves LEFT */}
        <div className={styles.row} style={{ transform: `translateX(${-offset * 0.5}%)` }}>
          {[...ROW_1, ...ROW_1].map((t, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.quoteText}>{t.text}</span>
              <span className={styles.author}>{t.author}</span>
            </div>
          ))}
        </div>

        {/* Row 2 - Moves RIGHT */}
        <div className={styles.row} style={{ transform: `translateX(${(offset * 0.5) - 50}%)` }}>
          {[...ROW_2, ...ROW_2].map((t, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.quoteText}>{t.text}</span>
              <span className={styles.author}>{t.author}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
