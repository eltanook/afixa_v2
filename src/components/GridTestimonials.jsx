'use client';
import styles from './GridTestimonials.module.css';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    text: "Olvidate de pegamentos, cintas o personal especializado. La tecnología de AFIX impacta el rendimiento operativo de nuestras tiendas enormemente.",
    name: "Karla Wasabichi",
    role: "STUNDUPERA",
    img: "/img/equipo/1.png"
  },
  {
    text: "Ogui fue amable y paciente desde el inicio, brindándome opciones claras y útiles. Un profesionalismo que se nota en cada detalle del sistema.",
    name: "Omar Villarreal",
    role: "VETERINARIO",
    img: "/img/equipo/2.png"
  },
  {
    text: "Con AFIX encontré el apoyo y guía que necesitaba; tengo la tranquilidad de saber que mi inversión está bien protegida y el impacto es total.",
    name: "Cristina Tirado",
    role: "INGENIERA",
    img: "/img/equipo/3.png"
  },
  {
    text: "La asesoría constante de AFIX nos da una sensación de seguridad absoluta. Siempre están innovando y eso se refleja en la calidad de sus productos.",
    name: "Dani Romero",
    role: "CHEF",
    img: "/img/equipo/4.png"
  },
  {
    text: "Profesionalismo y calidez. Entienden que detrás de cada sistema hay una marca que quiere destacar. Nuestra fachada cambió radicalmente.",
    name: "Dante Moflete",
    role: "CHEF",
    img: "/img/equipo/5.png"
  },
  {
    text: "El soporte post-venta es impecable. Surgió una duda con la instalación de los tótems y en 10 minutos tuvimos la solución videollamada mediante.",
    name: "Esteban Quito",
    role: "ARQUITECTO",
    img: "/img/equipo/6.png"
  }
];

export default function GridTestimonials() {
  return (
    <section className={styles.section}>
      <div className="container-afix">
        <div className={styles.header}>
            <span className="tag-label">Testimonios De Clientes</span>
            <p className={styles.subtitle}>Voces reales que avalan una trayectoria de compromiso y resultados tangibles.</p>
        </div>
        
        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={styles.card}>
              <p className={styles.text}>"{t.text}"</p>
              <div className={styles.footer}>
                <div className={styles.avatar}>
                  <Image src={t.img} alt={t.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.info}>
                  <h4 className={styles.name}>{t.name}</h4>
                  <p className={styles.role}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
