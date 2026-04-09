'use client';
import { useState } from 'react';
import Image from 'next/image';
import ImageCarousel from '@/components/ImageCarousel';

const PRODUCTS = [
  'Marcos Clic-Clac', 'Caballete Clic-Clac', 'Pedestal Clic-Clac',
  'Marco Modular', 'Cajas Backlight', 'Display Luminoso',
  'Sistema Combinado', 'Poster Snap', 'Hang Paper', 'Otro',
];
const ACCESSORIES = [
  'Iluminación LED', 'Soporte de pared', 'Cable de suspensión',
  'Protector acrílico', 'Kit de instalación', 'Pie soporte',
];

export default function CotizacionPage() {
  const [wantCall, setWantCall] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    e.target.reset();
    setWantCall(false);
  };

  return (
    <>
      <div className="page-header">
        <h1>Solicitar Cotización</h1>
        <nav className="breadcrumb">
          <a href="/">Inicio</a>
          <span>›</span>
          <span className="current">Cotización</span>
        </nav>
      </div>

      <section className="section">
        <div className="container-afix">
          <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'stretch' }}>
            {/* Left: Interactive Carousel ONLY */}
            <div className="reveal cotizacion-left-col" style={{ width: '100%' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', height: '100%', minHeight: '100%' }}>
                <ImageCarousel />
              </div>
            </div>

            {/* Right: Form */}
            <div className="reveal reveal-delay-1">
              {sent && (
                <div style={{ background: '#dcfce7', border: '1px solid #16a34a', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px', color: '#15803d', fontWeight: 600 }}>
                  ✅ ¡Gracias! Tu solicitud fue enviada. Nos pondremos en contacto a la brevedad.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label htmlFor="cotNombre">Tu Nombre *</label>
                    <input type="text" id="cotNombre" name="nombre" required placeholder="Ej: Juan García" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cotEmail">Tu Email *</label>
                    <input type="email" id="cotEmail" name="email" required placeholder="tu@email.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cotProducto">Tipo de Producto *</label>
                  <select id="cotProducto" name="producto" required defaultValue="">
                    <option value="" disabled>Seleccione un producto</option>
                    {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label htmlFor="cotMedidas">Medidas (cm)</label>
                    <input type="text" id="cotMedidas" name="medidas" placeholder="Ej: 50x70" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cotCantidad">Cantidad</label>
                    <input type="number" id="cotCantidad" name="cantidad" min="1" placeholder="1" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cotAccesorios">Accesorios adicionales</label>
                  <select id="cotAccesorios" name="accesorios" defaultValue="">
                    <option value="" disabled>Seleccione (opcional)</option>
                    {ACCESSORIES.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="cotMensaje">Detalles adicionales</label>
                  <textarea id="cotMensaje" name="mensaje" placeholder="Contanos más sobre tu proyecto o consulta..." />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', padding: '14px 16px', background: 'var(--bg-alt)', borderRadius: '10px' }}>
                  <input type="checkbox" id="llamada" checked={wantCall} onChange={e => setWantCall(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                  <label htmlFor="llamada" style={{ fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>Quiero agendar una llamada con un asesor</label>
                </div>
                {wantCall && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label htmlFor="cotFecha">Fecha preferida</label>
                      <input type="date" id="cotFecha" name="fecha" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cotHora">Hora preferida</label>
                      <input type="time" id="cotHora" name="hora" />
                    </div>
                  </div>
                )}
                <button type="submit" className="btn-primary-afix" style={{ width: '100%', justifyContent: 'center', padding: '16px', marginTop: '8px' }}>
                  Enviar Solicitud de Cotización →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .cotizacion-left-col {
          height: 100%;
          min-height: 600px;
        }
        @media (max-width: 991px) {
          .cotizacion-left-col {
            min-height: 400px;
          }
        }
        @media (max-width: 575px) {
          .cotizacion-left-col {
            min-height: 300px;
          }
        }
      `}</style>
    </>
  );
}
