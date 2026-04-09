'use client';
import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';

const FAQS = {
  'Productos': [
    {
      q: '¿Por qué un soporte para publicidad?',
      a: 'Cuando usted quiere llamar la atención con una publicidad, puede hacerlo pegando su afiche con cinta en la pared, pero ¿qué pasa si tiene que cambiarla semanalmente? La pared se descascara, la cinta pierde la adhesión, el afiche se dobla o mancha... Es ahí donde debe pensar en colocar un soporte que le permita en un instante cambiar su gráfica y que luzca siempre impecable. No solo leerán su publicidad, sino que verán que usted tiene un elegante estilo.',
    },
    {
      q: '¿Cómo realizar una compra?',
      a: 'Puede hacer Click en la pestaña de "¿Como Comprar?" y seguir los pasos. Recuerde: Elegí el estilo de producto → Elegí el perfil → Elegí según la medida de la lámina → Elegí su terminación.',
    },
    {
      q: '¿Cómo tomo las medidas del Marco Clic Clac?',
      a: 'Nosotros trabajamos con tres medidas: la exterior del marco, la de la gráfica (o lámina) que usted imprime, y la visual u óptica, que es el espacio que queda visible luego de ponerla en el marco. Los clientes que fabrican muebles utilizan la medida exterior, ya que colocan el marco dentro de un espacio. Los clientes que tienen una medida standard para imprimir utilizan la medida de lámina. Siempre que quiera colocarlo en algún espacio empotrado, dejar 0,5 cm de cada lado para cambiar su lámina.',
      img: '/img/productos/preg1.jpeg',
    },
    {
      q: '¿Cómo tomo las medidas del Marco Modular Afix?',
      a: 'Trabajamos con dos medidas: la exterior del marco y la de la gráfica (o lámina) que usted imprime. Tenga en cuenta que existen unos 5 cm entre la lámina y el marco. Si ninguna de las medidas que se encuentran en la tienda es la que usted desea, seleccione OTRA MEDIDA y haga click en "CONSULTAR".',
      img: '/img/productos/preg2.jpeg',
    },
    {
      q: '¿Hay medidas estándar?',
      a: 'No, nosotros construimos los marcos a pedido. Hacemos marcos con las medidas convencionales, pero en general las medidas son variadas. Para su mayor comodidad seleccionamos 5 medidas tradicionales (A4, A3, A2, A1, A0) y sumamos la categoría OTRA MEDIDA para medidas personalizadas.',
    },
    {
      q: '¿Qué perfil elegir?',
      a: 'Esta parte es a criterio del cliente. Nosotros recomendamos "a mayor medida, mayor espesor del marco".',
      img: '/img/productos/preg3.jpeg',
    },
    {
      q: '¿Cómo se arma un Marco Modular Afix?',
      a: 'Se toma la pinza y se tensiona el resorte, se coloca la hoja y se asegura la misma. El siguiente paso es colocar el vértice diagonal opuesto de la hoja mientras se la sujeta con la pinza. Luego se repite la operación en los ángulos restantes.',
      video: 'https://www.youtube.com/embed/dg0sb-fOSSs?si=Q0WrWu47IkwbW0sH',
    },
    {
      q: '¿Cómo funciona un Marco Clic Clac?',
      a: 'Pueden visualizar en el siguiente video la rapidez para efectuar el recambio de gráficas y la practicidad en cuanto a su estructura y apertura de solapas:',
      video: 'https://www.youtube.com/embed/eo2rjJM4YPI?si=4wCS9_TnTSDvFPXP',
    },
  ],
  'Pagos': [
    {
      q: '¿Es seguro utilizar mi tarjeta de crédito en la página web?',
      a: 'Sí, usted será redireccionado a la página de Mercado Pago, donde podrá seleccionar la tarjeta que usted prefiera.',
    },
    {
      q: '¿Puedo obtener una factura a nombre de mi empresa?',
      a: 'Sí. Podrá colocar sus datos antes de terminar su compra.',
    },
  ],
  'Envíos': [
    {
      q: '¿Cuál es el tiempo de entrega?',
      a: 'Los tiempos de entrega son muy cortos. Siempre respondemos a las urgencias. Nuestras instalaciones y nuestro personal están preparadas para la fabricación en serie, evitando los largos y eternos tiempos de entregas.',
    },
    {
      q: '¿Puedo saber en qué estado se encuentra mi pedido?',
      a: 'Sí. Tras la recepción de tu confirmación de pedido recibirás una notificación certificando la salida y envío del paquete. Si deseas disponer de más información no dudes en ponerte en contacto con nuestro departamento de atención al cliente.',
    },
    {
      q: '¿Cómo puedo cancelar mi pedido?',
      a: 'Podrás cancelar tu pedido, siempre y cuando el estado del mismo lo permita. Puede ser perfectamente factible antes de la recepción del correo electrónico de notificación de salida del envío. Para ello, podrás seleccionar al final de nuestra página, Botón de Arrepentimiento. A su vez, comunicarse con nuestro departamento de atención al cliente.',
    },
    {
      q: '¿Qué debo hacer si recibo un artículo incorrecto o defectuoso?',
      a: 'Si en alguna ocasión, por error, llegases a recibir un artículo no solicitado o con algún defecto, ponete en contacto con nuestro departamento de atención al cliente.',
    },
    {
      q: '¿Cuánto sale el envío?',
      a: 'Podrás calcular los costos de envío poniendo tu Código Postal. Recordá ir sumando todos tus productos en el carrito, luego colocar tu código postal y seleccionar forma de pago así pagarás un solo envío.',
    },
    {
      q: '¿Cuáles son las formas de envío?',
      a: 'Podrás seleccionar tu envío mediante Correo OCA o mismo, podremos acordarlo. Se retira GRATIS en Luzuriaga 645, Barracas CABA.',
    },
  ],
  'Políticas de Devolución': [
    {
      q: '¿Qué pasa si el producto NO es lo que solicité?',
      a: 'Si es así, nos hacemos cargo de nuestro error y enviaremos el producto que haya sido solicitado en el menor tiempo posible. Esto mismo se cumple si es informado antes de los 15 días.',
    },
    {
      q: '¿Qué sucede si no me gusta el producto o me equivoqué a la hora de realizar el pedido?',
      a: 'De ser así, NO se aceptan devoluciones. Es por ello, que recomendamos que se comuniquen con nosotros y lo asesoraremos. Siempre tenga en cuenta a la hora de solicitar una medida, si esta misma es medida exterior o medida lámina o medida visual.',
    },
  ],
};

function FaqItem({ q, a, img, video }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        {q}
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-answer">
        <p>{a}</p>
        {img && <img src={img} alt="Referencia" style={{ maxHeight: '300px', width: 'auto', display: 'block', margin: '12px auto', borderRadius: '8px' }} />}
        {video && (
          <div style={{ borderRadius: '12px', overflow: 'hidden', marginTop: '16px', aspectRatio: '16/9' }}>
            <iframe src={video} allowFullScreen style={{ width: '100%', height: '100%', border: 'none' }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <div className="page-header" style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(15, 15, 15, 0.75), rgba(0, 0, 0, 0.6)), url(/img/carousel-3-mobile.webp)'
      }}>
        <h1>Preguntas Frecuentes</h1>
        <nav className="breadcrumb">
          <a href="/">Inicio</a>
          <span>›</span>
          <span className="current">FAQ</span>
        </nav>
      </div>

      <section className="section">
        <div className="container-afix" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '60px', alignItems: 'flex-start' }}>
          
          <div style={{ maxWidth: '900px' }}>
            {Object.entries(FAQS).map(([category, items]) => (
              <div key={category} className="reveal">
                <p className="faq-section-label">{category}</p>
                {items.map((f, i) => (
                  <FaqItem key={i} {...f} />
                ))}
              </div>
            ))}
          </div>

          {/* Sticky Contact Box */}
          <aside className="sticky-contact-box">
             <div className="reveal">
               <h3>¿Tenés otras consultas?</h3>
               <p>Estamos para asesorarte y encontrar el sistema ideal para tu marca.</p>
               <div className="sticky-contact-links">
                  <a href="https://wa.me/1135415059" target="_blank">
                    <Icon name="whatsapp" size={20} /> WhatsApp
                  </a>
                  <a href="mailto:atencioncliente@afixsa.com">
                    <Icon name="mail" size={20} /> Email
                  </a>
               </div>
               <Link href="/contacto" className="btn-primary-afix" style={{ width: '100%', marginTop: '20px' }}>
                 Formulario de Contacto
               </Link>
             </div>
          </aside>
        </div>

        <style>{`
          .sticky-contact-box {
            position: sticky;
            top: 120px;
            background: var(--bg-alt);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 32px;
            color: var(--text);
            box-shadow: var(--shadow-xl);
          }
          .sticky-contact-box h3 {
            font-family: var(--font-head);
            font-size: 1.5rem;
            margin-bottom: 16px;
            color: var(--text);
          }
          .sticky-contact-box p {
            color: var(--text-muted);
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 24px;
          }
          .sticky-contact-links {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .sticky-contact-links a {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--text);
            text-decoration: none;
            font-weight: 600;
            padding: 12px;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 8px;
            transition: all 0.3s;
          }
          .sticky-contact-links a:hover {
            background: var(--brand-red);
            color: #fff;
            border-color: var(--brand-red);
          }
          @media (max-width: 991px) {
            .section > .container-afix {
              grid-template-columns: 1fr !important;
            }
            .sticky-contact-box {
              position: static;
              margin-top: 40px;
            }
          }
        `}</style>
      </section>
    </>
  );
}
