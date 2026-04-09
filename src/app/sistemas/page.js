import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import SistemasScroll from "@/components/SistemasScroll";

export const metadata = {
  title: "Catálogo de Sistemas de Exhibición y Marcos de Aluminio | AFIX",
  description: "Explorá nuestra línea completa de marcos Clic-Clac, porta afiches, tótems y displays. Calidad premium en aluminio para una comunicación visual profesional y efectiva.",
  keywords: "catálogo afix, marcos de aluminio, porta afiches, portafolletos, displays publicitarios, tótems de aluminio, señalética, stands, comunicación visual",
};

const SYSTEMS = [
  {
    id: 'marcos-clicclac',
    badge: 'Sistema Estrella',
    name: 'Marcos ClicClac®',
    desc: 'Revolucionario sistema que permite abrir el marco sin necesidad de herramientas ni desmontar de la pared. Ideal para actualizar información visual de forma rápida y sencilla. Perfecto para empresas con múltiples sucursales donde no cuentan con personal especializado para actualizar material gráfico.',
    features: ['Apertura sin bisagras', 'Protección UV', 'Sin herramientas', 'Múltiples perfiles'],
    video: 'https://www.youtube.com/embed/wwP9Fmgw9C4',
    img: '/img/productos/mcc32-a4-al.png',
  },
  {
    id: 'marcos-modulares',
    badge: 'Sistema Versátil',
    name: 'Marcos Modulares',
    desc: 'Cuatro barras de aluminio y cuatro ángulos con fichas especiales para sujetar y tensar láminas. Su principal ventaja es la adaptabilidad a todo tipo de medidas y materiales. Ocupa mínimo espacio cuando no está en uso y se rearma fácilmente gracias a su intuitivo sistema de encastre.',
    features: ['Totalmente desarmable', 'Armado sin herramientas', 'Adaptable a cualquier medida', 'Liviano y práctico'],
    video: 'https://www.youtube.com/embed/dg0sb-fOSSs',
    img: '/img/productos/combi-a4-al.png',
  },
  {
    id: 'poster-snap',
    badge: 'Sistema Práctico',
    name: 'Poster Snap',
    desc: 'Dos barras de aluminio con el exclusivo sistema ClicClac® y cierre hermético con polímero antideslizante para sujeción perfecta de grandes formatos. Ideal para colgar lonas, vinilos o impresiones en papel.',
    features: ['Sujeción segura', 'Grandes dimensiones', 'Fácil instalación', 'Sistema ClicClac®'],
    video: 'https://www.youtube.com/embed/wwP9Fmgw9C4',
    img: '/img/productos/mcc50-a4-al.png',
  },
  {
    id: 'hang-paper',
    badge: 'Sistema Organizado',
    name: 'Hang Paper',
    desc: 'Barra de aluminio con sistema de rodillos internos que retiene cualquier papel insertado, liberándolo solo con un movimiento intencional. Ideal para oficinas, restaurantes, hoteles, colegios y hogares.',
    features: ['Sistema de rodillos', 'Múltiples aplicaciones', 'Fácil carga', 'Alta durabilidad'],
    video: 'https://www.youtube.com/embed/wwP9Fmgw9C4',
    img: '/img/productos/pedestal-a4-al.png',
  },
];

export default function SistemasPage() {
  return (
    <>
      <div className="page-header" style={{ paddingBottom: '160px', borderBottom: 'none' }}>
        <h1>Sistemas de Exhibición</h1>
        <nav className="breadcrumb">
          <a href="/">Inicio</a>
          <span>›</span>
          <span className="current">Nuestros Sistemas</span>
        </nav>
      </div>

      {/* Combined container to eliminate any white gap */}
      <div style={{ background: 'var(--bg-alt)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        
        {/* Intro cards overlapping */}
        <div className="container-afix" style={{ zIndex: 10, marginTop: '-80px', pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            {[
              { icon: 'medal', t: 'Fabricación Nacional', d: 'Máxima calidad garantizada' },
              { icon: 'tool', t: 'Sin Herramientas', d: 'Cambios rápidos y sencillos' },
              { icon: 'palette', t: 'Personalizable', d: 'Medidas y colores a elección' },
              { icon: 'shield-check', t: 'Durable', d: 'Interior y exterior resistente' },
            ].map((f, i) => (
              <div key={f.t} className={`glass-card reveal`} style={{ padding: '32px 24px', textAlign: 'center', transitionDelay: `${i * 0.1}s`, background: 'var(--bg)', flex: '1 1 220px', minWidth: '220px', maxWidth: '300px' }}>
                <div style={{ color: 'var(--brand-red)', marginBottom: '14px' }}>
                  <Icon name={f.icon} size={36} />
                </div>
                <h5 style={{ fontWeight: 700, marginBottom: '8px' }}>{f.t}</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GSAP-style Sticky Horizontal Scroll Systems */}
        <div style={{ paddingTop: '40px' }}>
            <SistemasScroll systems={SYSTEMS} />
        </div>
      </div>

      {/* Banner de Cotización */}
      <section className="section" style={{ background: 'var(--bg)', color: 'var(--text)', padding: '100px 0', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div className="container-afix" style={{ maxWidth: '800px' }}>
          <span className="tag-label" style={{ color: 'var(--brand-red)', borderColor: 'var(--border)', marginBottom: '24px' }}>Llevá tu marca al siguiente nivel</span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '32px', letterSpacing: '-1px' }}>¿Listo para equipar tu empresa?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '48px', lineHeight: 1.6 }}>Solicitá una cotización personalizada según las medidas y necesidades exactas de tu punto de venta.</p>
          <Link href="/cotizacion" className="btn-primary-afix" style={{ padding: '20px 48px', fontSize: '1.1rem' }}>Solicitar Presupuesto</Link>
        </div>
      </section>
    </>
  );
}
