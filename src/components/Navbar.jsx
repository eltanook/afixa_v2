'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import Icon from './Icon';
import Topbar from './Topbar';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setScrolled(window.scrollY > 10);
      } else {
        setScrolled(true); // Always pill on mobile if preferred, or matching logic
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      {scrolled ? (
        // --- SCROLLED STATE (FLOATING PILL) ---
        <div className={styles.pillContainer}>
          <Link href="/" className={styles.pillLogo}>
            <Image
              src={theme === 'dark' ? '/img/logos/logo_light.png' : '/img/logos/logo_dark.png'}
              alt="AFIX Logo"
              width={64} height={26}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>

          {/* Desktop Nav in inner dark pill */}
          <div className={styles.navCapsule}>
            <nav className={styles.navLinks}>
              <NavItem href="/" label="Inicio" active={isActive('/')} />
              <NavItem href="/sistemas" label="Sistemas" active={isActive('/sistemas')} />
              <NavItem href="/nosotros" label="Nosotros" active={isActive('/nosotros')} />
              <NavItem href="/faq" label="FAQ" active={isActive('/faq')} />
              <NavItem href="/cotizacion" label="Cotización" active={isActive('/cotizacion')} />
              <NavItem href="/contacto" label="Contacto" active={isActive('/contacto')} />

              {mounted && (
                <button onClick={toggleTheme} className={styles.themeToggleBtn}>
                  {theme === 'dark' ? <Icon name="sun" size={16} /> : <Icon name="moon" size={16} />}
                </button>
              )}
            </nav>
          </div>

          {/* Mobile Icons */}
          <div className={styles.mobileIcons}>
             {mounted && (
               <button onClick={toggleTheme} className={styles.iconBtn}>
                 {theme === 'dark' ? <Icon name="sun" size={20} /> : <Icon name="moon" size={20} />}
               </button>
             )}
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.iconBtn}>
               <div style={{ position: 'relative', width: 22, height: 22 }}>
                 <Icon name="menu" size={22} style={{ position: 'absolute', transition: 'all 0.3s ease', opacity: isMenuOpen ? 0 : 1, transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0)' }} />
                 <Icon name="x" size={22} style={{ position: 'absolute', transition: 'all 0.3s ease', opacity: isMenuOpen ? 1 : 0, transform: isMenuOpen ? 'rotate(0)' : 'rotate(-90deg)' }} />
               </div>
             </button>
          </div>

          <Link href="/cotizacion" className={styles.ctaScrolled} style={{ textTransform: 'uppercase' }}>
            CATÁLOGO
          </Link>
        </div>
      ) : (
        // --- TOP STATE (FULL WIDTH) ---
        <div className={styles.topWrapper}>
          <Topbar />
          <div className={styles.topContainer}>
            <Link href="/" className={styles.topLogo}>
            <Image
              src={theme === 'dark' || !isHome ? '/img/logos/logo_light.png' : '/img/logos/logo_dark.png'}
              alt="AFIX Logo"
              width={96} height={38}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <nav className={styles.topNavLinks}>
              <TopNavItem href="/" label="Inicio" active={isActive('/')} isHome={isHome} />
              <TopNavItem href="/sistemas" label="Sistemas" active={isActive('/sistemas')} isHome={isHome} />
              <TopNavItem href="/nosotros" label="Nosotros" active={isActive('/nosotros')} isHome={isHome} />
              <TopNavItem href="/faq" label="FAQ" active={isActive('/faq')} isHome={isHome} />
              <TopNavItem href="/cotizacion" label="Cotización" active={isActive('/cotizacion')} isHome={isHome} />
              <TopNavItem href="/contacto" label="Contacto" active={isActive('/contacto')} isHome={isHome} />
              
              {mounted && (
                <button onClick={toggleTheme} className={`${styles.topThemeToggle} ${!isHome ? 'text-white' : ''}`} style={{ color: !isHome ? '#fff' : undefined }}>
                  {theme === 'dark' ? <Icon name="sun" size={20} /> : <Icon name="moon" size={20} />}
                </button>
              )}
            </nav>

          <div className={styles.mobileIcons}>
            {mounted && (
              <button onClick={toggleTheme} className={`${styles.iconBtn} ${styles.iconBtnSolid}`}>
                {theme === 'dark' ? <Icon name="sun" size={20} /> : <Icon name="moon" size={20} />}
              </button>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${styles.iconBtn} ${styles.iconBtnSolid}`}>
               <div style={{ position: 'relative', width: 22, height: 22 }}>
                 <Icon name="menu" size={22} style={{ position: 'absolute', transition: 'all 0.3s ease', opacity: isMenuOpen ? 0 : 1, transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0)' }} />
                 <Icon name="x" size={22} style={{ position: 'absolute', transition: 'all 0.3s ease', opacity: isMenuOpen ? 1 : 0, transform: isMenuOpen ? 'rotate(0)' : 'rotate(-90deg)' }} />
               </div>
            </button>
          </div>

            <Link href="/cotizacion" className="btn-primary-afix" style={{ textTransform: 'uppercase' }}>
              CATÁLOGO
            </Link>
          </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <MobileNavItem href="/" label="Inicio" active={isActive('/')} onClick={() => setIsMenuOpen(false)} />
          <MobileNavItem href="/sistemas" label="Sistemas" active={isActive('/sistemas')} onClick={() => setIsMenuOpen(false)} />
          <MobileNavItem href="/nosotros" label="Nosotros" active={isActive('/nosotros')} onClick={() => setIsMenuOpen(false)} />
          <MobileNavItem href="/faq" label="FAQ" active={isActive('/faq')} onClick={() => setIsMenuOpen(false)} />
          <MobileNavItem href="/cotizacion" label="Cotización" active={isActive('/cotizacion')} onClick={() => setIsMenuOpen(false)} />
          <MobileNavItem href="/contacto" label="Contacto" active={isActive('/contacto')} onClick={() => setIsMenuOpen(false)} />
          <Link href="/cotizacion" onClick={() => setIsMenuOpen(false)} className={styles.mobileCta} style={{ textTransform: 'uppercase' }}>
            CATÁLOGO COMPLETO
          </Link>
        </nav>
      </div>
    </header>
  );
}

// ------ NAV COMPONENTS ------

function NavItem({ href, label, active }) {
  return (
    <Link href={href} className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}>
      {label}
      <span className={`${styles.navDot} ${active ? styles.navDotActive : ''}`} />
    </Link>
  );
}

function TopNavItem({ href, label, active, isHome }) {
  return (
    <Link href={href} className={`${styles.topNavItem} ${active ? styles.topNavItemActive : ''} ${!isHome ? styles.topNavItemWhite : ''}`}>
      {label}
      <span className={`${styles.topNavDot} ${active ? styles.topNavDotActive : ''}`} />
    </Link>
  );
}

function MobileNavItem({ href, label, active, onClick }) {
  return (
    <Link href={href} onClick={onClick} className={`${styles.mobileNavItem} ${active ? styles.mobileNavItemActive : ''}`}>
      {label}
      {active && <span className={styles.mobileNavIndicator} />}
    </Link>
  );
}
