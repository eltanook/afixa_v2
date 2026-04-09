'use client';
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import TeamGrid from "@/components/TeamGrid";
import ScrollingMarqueeTestimonials from "@/components/ScrollingMarqueeTestimonials";

const TEAM = [
  { name: 'JONY', role: 'Jefe de Taller', img: '/img/equipo/1.png' },
  { name: 'RODRI', role: 'Encargado de Corte', img: '/img/equipo/2.png' },
  { name: 'DANI', role: 'Encargado de Armado', img: '/img/equipo/3.png' },
  { name: 'LAU', role: 'Administrativa', img: '/img/equipo/4 (1).jpg' },
  { name: 'SILVIO', role: 'Gerente', img: '/img/equipo/5.png' },
  { name: 'IVÁN', role: 'Gerente de Compras', img: '/img/equipo/6 (1).jpg' },
  { name: 'NATASHA', role: 'Ejecutiva de Ventas', img: '/img/equipo/7.png' },
];

const CLIENTS_IMG = Array.from({ length: 18 }, (_, i) => `/img/clientes/${i + 1}.png`);

export default function NosotrosPage() {
  return (
    <>
      <div className="page-header">
        <h1>Sobre Nosotros</h1>
        <nav className="breadcrumb">
          <a href="/">Inicio</a>
          <span>›</span>
          <span className="current">Nosotros</span>
        </nav>
      </div>

      {/* Historia */}
      <section className="section">
        <div className="container-afix">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div style={{ position: 'relative', height: '500px' }} className="reveal">
              <div style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius-lg, 24px)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <Image src="/img/general/1.jpg" alt="AFIX fábrica" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '220px', height: '220px', borderRadius: 'var(--radius-lg, 24px)', overflow: 'hidden', border: '4px solid var(--bg)', boxShadow: 'var(--shadow-lg)', animation: 'slideInLeft 1s ease-out forwards' }}>
                <Image src="/img/general/5.jpg" alt="AFIX equipo" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>

            <div className="reveal reveal-delay-1">
              <span className="tag-label">Nuestra Historia</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', margin: '12px 0 20px' }}>
                20 Años Fabricando Productos Publicitarios de Calidad
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
                En AFIX nos dedicamos a la fabricación de productos para la publicidad con una trayectoria de 20 años y con una amplia cartera de clientes. En los inicios de la empresa, los productos eran importados de Europa, pero hace 20 años decidimos realizar nuestras propias matrices y comenzar la producción a nivel nacional.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '28px' }}>
                Nuestro objetivo principal es transmitir la funcionalidad de nuestros productos con el Sistema Clic-Clac, ya que es un sistema innovador para nuestro país (siendo los únicos fabricantes de este sistema). Buscamos comunicar que no son unos simples Marcos como uno se imagina, sino que con este Sistema Clic-Clac te permite un recambio ágil y práctico de la gráfica, brindando a la vez una exposición de la lámina más estilizada.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                {['Productos Personalizados', 'Materiales de Alta Calidad', 'Innovación Constante', 'Producción 100% Nacional'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <Icon name="check" size={16} color="var(--primary)" /> {f}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contacto" className="btn-primary-afix">Contacto</Link>
                <a href="tel:+5491135415059" className="btn-outline-afix">
                  <Icon name="phone" size={16} /> 11 3541-5059
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios Scrolling Marquee */}
      <ScrollingMarqueeTestimonials />

      {/* Proceso de Fabricación (Parallax Banner) */}
      <section className="section" style={{
        background: 'linear-gradient(to right, rgba(15,15,15,0.95) 0%, rgba(15,15,15,0.5) 100%), url(/img/general/18.jpg) center center no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        color: '#fff',
        padding: '80px 0'
      }}>
        <div className="container-afix">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <div className="reveal">
              <span className="tag-label" style={{ background: 'none', color: 'var(--brand-red)', borderColor: 'transparent', paddingLeft: 0 }}>Nuestro Proceso</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', margin: '4px 0 16px', color: '#fff' }}>
                Fabricación de Calidad con Perfiles de Aluminio
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                Todos nuestros productos están realizados en Aluminio. Con las matrices que poseemos, tenemos en nuestro taller las tiras de los distintos perfiles de 6 metros, donde luego se realiza el corte en tiras de 3 metros para poder enviarlos a pintar en la variedad de colores que tenemos.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                <Link href="/cotizacion" className="btn-primary-afix">
                  Cotizar Sistema
                </Link>
                <Link href="/sistemas" className="btn-outline-afix" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                  Ver Catálogo
                </Link>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {[
                { icon: 'scissors', title: 'Corte Preciso', desc: 'Al confirmar un pedido, nuestro operario realiza el corte exacto según las medidas.' },
                { icon: 'palette', title: 'Múltiples Colores', desc: 'Ofrecemos una amplia variedad de colores para que cada cliente personalice sus marcos.' },
                { icon: 'tool', title: 'Ensamblado Manual', desc: 'La unión de cada lado es mediante escuadras formando el producto con precisión.' },
                { icon: 'package', title: 'Embalaje Seguro', desc: 'Cada producto es limpiado y embalado cuidadosamente para su entrega.' },
              ].map(p => (
                <div key={p.title} className="glass-card reveal" style={{ padding: '24px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ color: 'var(--brand-red)', marginBottom: '14px' }}>
                    <Icon name={p.icon} size={32} />
                  </div>
                  <h5 style={{ fontWeight: 700, marginBottom: '8px', color: '#fff' }}>{p.title}</h5>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" style={{ overflowX: 'hidden' }}>
        <div className="container-afix" style={{ maxWidth: '100vw', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="tag-label reveal">Equipo AFIX</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', margin: '12px 0 16px' }} className="reveal reveal-delay-1">
              Las Caras Detrás de Nuestros Productos
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }} className="reveal reveal-delay-2">
              Conocé al equipo que hace posible que cada marco y sistema Clic-Clac llegue a tus manos con la mejor calidad.
            </p>
          </div>
          
          <TeamGrid team={TEAM} />
          
        </div>
      </section>

      {/* ===== CLIENTS TICKER (Marcas) ===== */}
      <section style={{ padding: '64px 0', background: 'var(--bg)', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>
        <div className="clients-ticker-wrap" style={{ padding: 0 }}>
          <div className="clients-ticker">
            {[...CLIENTS_IMG, ...CLIENTS_IMG].map((src, i) => (
              <img key={i} src={src} alt="Cliente AFIX" style={{ height: '32px' }} />
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes slideInLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
