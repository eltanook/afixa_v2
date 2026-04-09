'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ROW_1 = [
  { text: "La implementación de los marcos Clic-Clac de AFIX cambió por completo la dinámica de nuestras sucursales. Ahora el personal puede actualizar las promociones en segundos sin necesidad de herramientas ni asistencia técnica externa. Es una inversión que se paga sola en ahorro operativo.", author: "Gerente de Operaciones - Retail Líder" },
  { text: "Buscábamos una estética que estuviera a la altura de nuestra marca premium y AFIX superó las expectativas. El acabado del aluminio y la precisión del sistema de cierre son impecables. No solo es funcional, sino que aporta un valor visual arquitectónico a nuestros espacios.", author: "Director Creativo - Agencia de Branding" },
  { text: "Trabajamos con AFIX desde hace más de una década y la durabilidad de sus productos es asombrosa. Siguen funcionando como el primer día a pesar del uso intensivo en puntos de venta de alto tráfico. La fabricación nacional se nota en la robustez y el soporte post-venta.", author: "Jefe de Compras - Cadena Gastronómica" },
  { text: "El sistema Hang Paper es la solución más inteligente que encontramos para nuestras oficinas. Mantiene todo organizado y profesional, eliminando el desorden visual de los imanes o cintas adhesivas. Es minimalismo puro y funcional en el día a día corporativo.", author: "Administrador Senior - Consultora Internacional" },
  { text: "Impresionante la rapidez de entrega y la capacidad de personalización en medidas especiales. Necesitábamos tótems de gran formato para un evento masivo y AFIX respondió con calidad superior y plazos récord. Son socios estratégicos para cualquier proyecto de comunicación.", author: "Coordinador de Eventos - Firma de Tecnología" },
  { text: "La calidad de los materiales es insuperable. Hemos probado otros sistemas pero nada se compara a la estabilidad y el acabado de AFIX. Es el estándar que toda marca seria debería tener en sus puntos físicos.", author: "Marketing Manager - Automotriz" },
  { text: "Desde que cambiamos a marcos AFIX, el tiempo de recambio de gráficas se redujo un 80%. Nuestros visual merchandisers están felices y la tienda se ve siempre actualizada y pulcra.", author: "Store Manager - Moda Internacional" },
  { text: "El soporte técnico y asesoramiento para medidas especiales fue clave. Logramos señalizar todo el complejo con una coherencia visual increíble gracias a la flexibilidad de sus perfiles.", author: "Project Manager - Desarrolladora Inmobiliaria" },
];

const ROW_2 = [
  { text: "Nuestros clientes notaron el cambio de inmediato. La claridad de las gráficas protegidas por los marcos anti-reflejo de AFIX es superior a cualquier otra cosa en el mercado. La comunicación es ahora más nítida, profesional y alineada con nuestra identidad visual.", author: "Brand Manager - Sector Farmacéutico" },
  { text: "La versatilidad de los marcos modulares nos permitió adaptar la señalización en todo nuestro edificio corporativo con un solo sistema unificado. La instalación fue intuitiva y el resultado final es de un nivel de sofisticación que no encontrábamos en otros proveedores regionales.", author: "Arquitecto Senior - Estudio de Diseño Interior" },
  { text: "Como fabricantes, apreciamos la ingeniería detrás de los perfiles AFIX. Se nota que hay un desarrollo constante para mejorar la experiencia del usuario final. El sistema de rodillos de los Hang Paper es simplemente brillante y extremadamente confiable.", author: "Socio Fundador - Empresa de Equipamiento" },
  { text: "Llevamos instalados cientos de metros de Poster Snap en nuestros depósitos y áreas de atención. La sujeción es perfecta incluso para materiales pesados. AFIX nos brindó una solución técnica robusta que resolvió problemas que teníamos con sistemas convencionales.", author: "Gerente de Logística - Multinacional E-commerce" },
  { text: "La relación precio-calidad es imbatible. Obtener un producto de estándar internacional fabricado localmente nos permite escalar nuestra comunicación visual sin las complicaciones de las importaciones. El compromiso con la calidad de AFIX es una garantía de éxito.", author: "Responsable de Marketing - Banco Nacional" },
  { text: "El impacto visual en nuestras fachadas cambió radicalmente. Los sistemas de AFIX no solo sostienen la gráfica, la realzan. Es la diferencia entre un cartel y una pieza de comunicación institucional.", author: "Director de Comunicación - ONG Internacional" },
  { text: "La atención personalizada y el cumplimiento de plazos es lo que nos hace volver. AFIX entiende la urgencia del retail y responde siempre con excelencia y productos listos para instalar.", author: "Visual Lead - Cadena de Supermercados" },
  { text: "Excelente durabilidad en ambientes exigentes. Usamos sus marcos en áreas de producción y mantienen su brillo y funcionalidad intactos. Insuperable.", author: "Gerente de Planta - Industria Química" },
];

export default function ScrollingMarqueeTestimonials() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section 
      ref={containerRef} 
      style={{ 
        padding: '120px 0', 
        background: 'var(--bg)', 
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)' 
      }}
    >
      <div className="container-afix" style={{ marginBottom: '64px', textAlign: 'center' }}>
        <span className="tag-label">Experiencia AFIX®</span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, fontFamily: 'var(--font-head)' }}>
          Lo que dicen <span style={{ color: 'var(--brand-red)' }}>nuestros clientes</span>
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {/* Row 1: Moves Right */}
        <motion.div style={{ x: x1, display: 'flex', gap: '40px', paddingLeft: '5vw' }}>
          {[...ROW_1, ...ROW_1].map((t, i) => (
            <div 
              key={i} 
              style={{ 
                flexShrink: 0, 
                width: '600px', 
                padding: '40px', 
                background: 'var(--bg-alt)', 
                borderRadius: '24px',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '24px', lineHeight: 1.6, color: 'var(--text)' }}>
                "{t.text}"
              </p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '16px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--brand-red)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {t.author}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2: Moves Left */}
        <motion.div style={{ x: x2, display: 'flex', gap: '40px', paddingLeft: '10vw' }}>
          {[...ROW_2, ...ROW_2].map((t, i) => (
            <div 
              key={i} 
              style={{ 
                flexShrink: 0, 
                width: '600px', 
                padding: '40px', 
                background: 'var(--bg-alt)', 
                borderRadius: '24px',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '24px', lineHeight: 1.6, color: 'var(--text)' }}>
                "{t.text}"
              </p>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '16px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--brand-red)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {t.author}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        [data-theme='dark'] div[style*="background: var(--bg-alt)"] {
          background: #141414 !important;
          border-color: #333 !important;
        }
        [data-theme='dark'] p {
          color: #eee !important;
        }
      `}</style>
    </section>
  );
}
