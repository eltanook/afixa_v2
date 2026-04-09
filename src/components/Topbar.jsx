import styles from './Topbar.module.css';
import Icon from './Icon';

export default function Topbar() {
  return (
    <div className={styles.topbar} role="complementary" aria-label="Información de contacto">
      <div className={styles.left}>
        <a href="https://maps.google.com/?q=Luzuriaga+645+Barracas+CABA" target="_blank" rel="noopener noreferrer" className={styles.item}>
          <Icon name="map-pin" size={13} />
          Luzuriaga 645, Barracas, CABA
        </a>
        <span className={styles.divider} aria-hidden="true">|</span>
        <span className={styles.item}>
          <Icon name="clock" size={13} />
          Lun – Vie: 10:00 – 17:00 hs
        </span>
      </div>
      <div className={styles.right}>
        <a href="tel:+5491135415059" className={styles.item}>
          <Icon name="phone" size={13} />
          11 3541-5059
        </a>
        <span className={styles.divider} aria-hidden="true">|</span>
        <div className={styles.socials} role="list" aria-label="Redes sociales">
          {[
            { icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/afixsa' },
            { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/afix.sa' },
            { icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@afixsa' },
            { icon: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/5491135415059' },
          ].map(s => (
            <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={styles.social} role="listitem">
              <Icon name={s.icon} size={13} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
