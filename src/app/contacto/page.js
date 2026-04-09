import Icon from "@/components/Icon";

export const metadata = {
  title: "Contacto | AFIX — Sistemas de Exhibición Profesional",
  description: "Contactate con AFIX para consultas sobre marcos Clic-Clac, presupuestos, asesoramiento técnico y postventa. Atención Lun-Vie 10–17 hs.",
  alternates: { canonical: "https://www.afixsa.com.ar/contacto" },
  openGraph: {
    title: "Contacto | AFIX — Sistemas de Exhibición",
    description: "Consultá, pedí presupuesto o coordiná una visita a nuestra fábrica en Barracas, CABA.",
    url: "https://www.afixsa.com.ar/contacto",
  },
};

const CONTACT_INFO = [
  { icon: 'map-pin', label: 'Dirección', value: 'Luzuriaga 645, Barracas, CABA', href: 'https://maps.google.com/?q=Luzuriaga+645+CABA' },
  { icon: 'phone', label: 'Teléfono', value: '11 3541-5059', href: 'tel:+5491135415059' },
  { icon: 'mail', label: 'Email', value: 'atencioncliente@afixsa.com', href: 'mailto:atencioncliente@afixsa.com' },
  { icon: 'clock', label: 'Horario', value: 'Lun – Vie: 10:00 – 17:00 hs', href: null },
];

const SOCIALS = [
  { icon: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/5491135415059' },
  { icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/afixsa' },
  { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/afix.sa' },
  { icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@afixsa' },
];

export default function ContactoPage() {
  return (
    <>
      <div className="page-header" style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(15, 15, 15, 0.75), rgba(0, 0, 0, 0.6)), url(/img/general/header_bg.png)'
      }}>
        <h1>Contacto</h1>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Inicio</a>
          <span aria-hidden="true">›</span>
          <span className="current">Contacto</span>
        </nav>
      </div>

      <section className="section">
        <div className="container-afix">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '52px' }}>
            <span className="tag-label reveal">
              <Icon name="headphones" size={13} />
              Contacto
            </span>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.3px', maxWidth: '600px' }} className="reveal reveal-delay-1">
              ¿En qué podemos ayudarte?
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '640px', fontSize: '0.98rem' }} className="reveal reveal-delay-2">
              Comunicate con AFIX para consultas sobre productos, solicitar presupuestos, coordinar entregas, recibir asesoramiento técnico, o resolver cualquier inquietud sobre tu pedido.
            </p>
          </div>

          <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '56px', marginBottom: '56px', alignItems: 'start' }}>
            {/* Form */}
            <form
              action="https://formsubmit.co/atencioncliente@afixsa.com"
              method="POST"
              className="reveal"
              aria-label="Formulario de contacto"
            >
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://www.afixsa.com.ar" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Nuevo Contacto desde el Sitio Web" />
              <input type="text" name="_honey" style={{ display: 'none' }} />
              <input type="hidden" name="_autoresponse" value="Gracias por contactarte con AFIX. Hemos recibido tu mensaje y nos comunicaremos a la brevedad." />

              <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label htmlFor="cName">Nombre *</label>
                  <input type="text" id="cName" name="name" required placeholder="Juan García" autoComplete="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="cEmail">Email *</label>
                  <input type="email" id="cEmail" name="email" required placeholder="tu@email.com" autoComplete="email" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cSubject">Asunto *</label>
                <input type="text" id="cSubject" name="subject" required placeholder="¿En qué podemos ayudarte?" />
              </div>
              <div className="form-group">
                <label htmlFor="cMessage">Mensaje *</label>
                <textarea id="cMessage" name="message" required placeholder="Dejá tu mensaje acá..." style={{ minHeight: '150px' }} />
              </div>
              <button type="submit" className="btn-primary-afix" style={{ width: '100%', justifyContent: 'center', padding: '15px' }}>
                Enviar Mensaje
                <Icon name="send" size={16} />
              </button>
            </form>

            {/* Contact Info */}
            <div className="reveal reveal-delay-1">
              <div className="glass-card" style={{ padding: '28px', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 600, marginBottom: '22px', letterSpacing: '0.3px' }}>
                  Información de Contacto
                </h3>
                {CONTACT_INFO.map(item => (
                  <div key={item.icon} className="contact-info-item">
                    <div className="contact-info-icon">
                      <Icon name={item.icon} size={18} />
                    </div>
                    <div className="contact-info-text">
                      <h4>{item.label}</h4>
                      {item.href
                        ? <p><a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{item.value}</a></p>
                        : <p>{item.value}</p>
                      }
                    </div>
                  </div>
                ))}

                <hr style={{ borderColor: 'var(--border)', margin: '20px 0' }} />
                <h4 style={{ fontFamily: 'var(--font-head)', fontWeight: 600, marginBottom: '14px', fontSize: '0.9rem', letterSpacing: '0.5px' }}>
                  Seguinos en Redes
                </h4>
                <div className="social-links">
                  {SOCIALS.map(s => (
                    <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social-link">
                      <Icon name={s.icon} size={17} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Map */}
          <div className="reveal" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '380px', border: '1px solid var(--border)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.6517831060736!2d-58.387953124515654!3d-34.63824327293815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334b0ab824415%3A0xadbc8894721c35!2sLuzuriaga%20645%2C%20C1280%20CABA!5e0!3m2!1ses-419!2sar!4v1688473371147!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 'none', display: 'block' }}
              title="Ubicación AFIX — Luzuriaga 645, Barracas, CABA"
            />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          #contacto-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
