'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { useTheme } from './ThemeProvider';
import styles from './HeroVideoSequence.module.css';

const TOTAL_FRAMES = 240;
const NATIVE_W = 720;
const NATIVE_H = 1280;
const FRAMES_DIR = '/frames/';
const pad = (n) => String(n).padStart(4, '0');

const STEPS = [
  { step: "01", title: "Presionar el Perfil", desc: "Un simple toque sobre el perfil de aluminio libera el sistema. Sin necesidad de herramientas." },
  { step: "02", title: "Marco Abierto", desc: "El perfil se abre sin resistencia. Retirás la gráfica anterior de forma inmediata." },
  { step: "03", title: "Insertar la Gráfica", desc: "Colocás la nueva lámina junto al protector transparente anti-reflejo. Perfecto alineamiento." },
  { step: "04", title: "Cierre Perfecto", desc: "Cerrás el perfil. La gráfica queda impecable, tensada y lista para impresionar." }
];

export default function HeroVideoSequence() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const { theme } = useTheme();

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedPct, setLoadedPct] = useState(0);

  // States to drive CSS visually via inline styles (bypassing full React re-renders for purely transform performance,
  // but using simple requestAnimationFrame overrides)
  useEffect(() => {
    let vpW = 0, vpH = 0, dpr = 1;
    let sectionTop = 0;
    
    // Geometry bounds
    let S_W, S_H, S_L, S_T; 
    let M_W, M_H, M_L, M_T; 
    let E_W, E_H, E_L, E_T; 
    let cardScale = 1;
    let cardOpacity = 1;
    let currentFrame = -1;
    let rafPending = false;

    // Elements
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const cardEl = document.getElementById('hero-card');
    const stepBlocks = document.querySelectorAll('.step-block');
    const heroTitle = document.getElementById('hero-title');

    const computeGeometry = () => {
      vpW = window.innerWidth;
      vpH = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      // Canvas sizing for rendering
      canvas.width = Math.round(vpW * dpr);
      canvas.height = Math.round(vpH * dpr);

      // Math bounds (replacing getBoundingClientRect)
      const isMobile = vpW < 768;
      
      const padding = isMobile ? 24 : 48;
      const gap = isMobile ? 0 : 40; // Mobile stacks, no horizontal gap
      const cw = Math.min(vpW * 0.9, 1200);
      const ch = Math.min(vpH * 0.75, 800);
      
      if (isMobile) {
        // Mobile stack: Canvas on bottom
        S_W = cw - padding * 2;
        S_H = (ch - padding * 2) * 0.45; // 45% height
        S_L = (vpW - S_W) / 2;
        S_T = (vpH - ch) / 2 + (ch - padding - S_H);
        
        M_W = vpW * 0.9; M_H = vpH * 0.6;
        M_L = (vpW - M_W) / 2; M_T = (vpH - M_H) / 2;
        
        E_W = vpW; E_H = vpH * 0.35; // 35% height on mobile
        E_L = 0; E_T = 0;
      } else {
        S_W = (cw - padding * 2 - gap) / 2;
        S_H = ch - padding * 2;
        S_L = (vpW / 2) + (gap / 2);
        S_T = (vpH - S_H) / 2;

        M_W = vpW * 0.7; M_H = vpH * 0.7;
        M_L = (vpW - M_W) / 2; M_T = (vpH - M_H) / 2;

        E_W = vpW * 0.35; E_H = vpH;
        E_L = 0; E_T = 0;
      }
      
      if (containerRef.current) {
        sectionTop = containerRef.current.offsetTop;
      }
    };

    const drawFit = (img) => {
      if (!img || !img.naturalWidth) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
      ctx.scale(dpr, dpr);
      
      const imgAspect = NATIVE_W / NATIVE_H;
      const canvasAspect = vpW / vpH;

      let drawW, drawH, drawX, drawY;

      if (canvasAspect > imgAspect) {
        // Window is wider than video (Landscape/Desktop)
        drawH = vpH;
        drawW = vpH * imgAspect;
        drawX = (vpW - drawW) / 2;
        drawY = 0;
      } else {
        // Window is narrower than video (Mobile/Tall)
        drawW = vpW;
        drawH = vpW / imgAspect;
        drawX = 0;
        drawY = (vpH - drawH) / 2;
      }

      // Clear canvas with theme-aware color or #f7f7f7 to match video background
      // In dark mode, we'll use a slightly darker tone to reduce the "light box" effect
      ctx.fillStyle = theme === 'light' ? '#f7f7f7' : '#0d0d0d';
      ctx.fillRect(0, 0, vpW / dpr, vpH / dpr);
      ctx.drawImage(img, 0, 0, NATIVE_W, NATIVE_H, drawX, drawY, drawW, drawH);
    };

    const draw = (idx) => {
      // Clamp index explicitly before trying to load frame
      idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, idx));
      if (idx === currentFrame) return;
      currentFrame = idx;
      if (framesRef.current[idx]) {
        drawFit(framesRef.current[idx]);
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const onScroll = () => {
      const scrollY = window.scrollY;
      // p represents "screens passed" inside our container
      const p = Math.max(0, (scrollY - sectionTop) / vpH);
      
      let w, h, l, t, radius = 0, opacity = 1;
      let frameT = 0; 
      
      // Phase mappings:
      // p = 0 to 0.5: Canvas in Hero rigid.
      // p = 0.5 to 1.5: Canvas -> Middle. Hero Fades.
      // p = 1.5 to 2.5: Canvas -> Left (or Top).
      // p = 2.5 to 6.5: Video scrubbing (4 steps).
      // p > 6.5: End of sequence.

      if (p <= 0.5) {
        w = S_W; h = S_H; l = S_L; t = S_T;
        radius = 16; cardOpacity = 1; cardScale = 1 - (p * 0.1);
        if (heroTitle) heroTitle.style.transform = `translateY(${p * 40}px)`;
      } else if (p > 0.5 && p <= 1.5) {
        const t2 = (p - 0.5); // 0 to 1
        // Smooth easing in sine
        const e = -(Math.cos(Math.PI * t2) - 1) / 2; 
        w = lerp(S_W, M_W, e);
        h = lerp(S_H, M_H, e);
        l = lerp(S_L, M_L, e);
        t = lerp(S_T, M_T, e);
        radius = lerp(16, 24, e);
        cardScale = lerp(0.95, 0.8, e);
        cardOpacity = lerp(1, 0, e);
      } else if (p > 1.5 && p <= 2.5) {
        const t2 = (p - 1.5); // 0 to 1
        const e = -(Math.cos(Math.PI * t2) - 1) / 2;
        w = lerp(M_W, E_W, e);
        h = lerp(M_H, E_H, e);
        l = lerp(M_L, E_L, e);
        t = lerp(M_T, E_T, e);
        radius = lerp(24, 0, e);
        cardOpacity = 0;
        cardScale = 0.8;
      } else if (p > 2.5) {
        w = E_W; h = E_H; l = E_L; t = E_T;
        radius = 0; cardOpacity = 0;
        // Scrub video
        const scrubSpan = 4; // 2.5 to 6.5
        let scrubP = (p - 2.5) / scrubSpan;
        if (scrubP > 1) scrubP = 1;
        frameT = scrubP;
      }

      // Apply Canvas bounds
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      canvas.style.transform = `translate(${l}px, ${t}px)`;
      canvas.style.borderRadius = `${radius}px`;
      
      // Apply Hero Fading
      if (cardEl) {
        cardEl.style.opacity = cardOpacity;
        cardEl.style.transform = `translate(-50%, -50%) scale(${cardScale})`;
        // Prevent pointer events when faded out
        cardEl.style.pointerEvents = cardOpacity < 0.1 ? 'none' : 'all';
      }

      // Apply Video Scrubbing
      const targetFrame = Math.floor(frameT * (TOTAL_FRAMES - 1));
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => { 
          draw(targetFrame); 
          rafPending = false; 
        });
      }

      // Step blocks logic (revolver cartridge style stacking)
      if (p > 2.5 && p < 7.5) {
        const localP = p - 2.5; // ranges 0 to 5
        stepBlocks.forEach((block, idx) => {
          const diff = idx - localP;
          let bOpacity = 0, bTransform = 0, bScale = 1;

          if (diff > 0.8) { // Future
            bOpacity = 0; bTransform = 100;
          } else if (diff > 0) { // Entering
            const enterT = 1 - (diff / 0.8); // 0 to 1
            bOpacity = enterT;
            bTransform = 100 * (1 - enterT);
          } else { // Active & Past stacked
            bOpacity = Math.max(0, 1 + diff * 0.7); // fade out faster
            bTransform = diff * 125; // move up
            bScale = Math.max(0.65, 1 + diff * 0.1); 
          }
          block.style.opacity = bOpacity;
          block.style.transform = `translateY(${bTransform}px) scale(${bScale})`;
          block.style.pointerEvents = bOpacity > 0.5 ? 'all' : 'none';
        });
      } else {
        stepBlocks.forEach(b => { b.style.opacity = 0; b.style.pointerEvents = 'none'; });
      }
    };

    const preload = () => new Promise(resolve => {
      let loaded = 0;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new globalThis.Image();
        img.onload = img.onerror = () => {
          loaded++;
          setLoadedPct(Math.round((loaded / TOTAL_FRAMES) * 100));
          if (loaded === TOTAL_FRAMES) resolve();
        };
        img.src = `${FRAMES_DIR}frame_${pad(i + 1)}.jpg`;
        framesRef.current[i] = img;
      }
    });

    computeGeometry();
    
    preload().then(() => {
      setIsLoaded(true);
      computeGeometry();
      draw(0);
      onScroll(); // initial state

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', () => {
        computeGeometry();
        onScroll();
        const saveFrame = currentFrame;
        currentFrame = -1;
        draw(saveFrame);
      });
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <section ref={containerRef} className={styles.sequenceContainer}>
        {/* The sticky wrapper covers exactly 100vh and holds the absolute elements */}
        <div className={styles.stickyWrapper}>
        
          {/* Main Hero Card (Fixed size, absolutely centered) */}
          <div id="hero-card" className={styles.heroCard}>
             <div className={styles.heroTextCol}>
                 <div id="hero-title">
                     <span className="tag-label">
                        <span className="brand-circle"/>
                        Sistema Patentado AFIX
                     </span>
                     <h1 className={styles.hTitle}>Ingeniería visual<br/><span style={{color: 'var(--brand-red)'}}>reinventada.</span></h1>
                     <p className={styles.hDesc}>
                        El sistema Clic-Clac® permite el recambio de gráficas sin herramientas, combinando durabilidad premium con un diseño minimalista.
                     </p>
                     <div style={{marginTop: '32px', display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap'}}>
                        <Link href="https://www.afixsa.com.ar/productos" target="_blank" className="btn-primary-afix">Explorar Catálogo</Link>
                        <Link href="/nosotros" className="cta-link-afix">Conocer Más <Icon name="arrow-right" size={16}/></Link>
                     </div>
                 </div>
             </div>
             {/* Right column is an empty space placeholder exactly where the initial canvas is overlaid */}
             <div className={styles.heroCanvasCol} />
          </div>

          {/* Stepper text that appears during scrub phase */}
          <div className={styles.stepsContainer}>
            {STEPS.map((s, i) => (
              <div key={i} className={`step-block ${styles.stepBlock}`}>
                <div className={styles.stepNum}>{s.step}</div>
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* The Canvas - absolutely positioned, driven by JavaScript interpolation */}
          <canvas ref={canvasRef} className={styles.animCanvas} />

        </div>
      </section>

      {/* Global initial loader */}
      {/* Global initial loader */}
      {!isLoaded && (
        <div className={styles.loaderOverlay}>
          <div className={styles.loaderCenter}>
            <div className={styles.loaderLogoWrap}>
               <Image 
                 src={theme === 'light' ? "/img/logos/logo_dark.png" : "/img/logos/logo_light.png"} 
                 alt="AFIX Logo" 
                 width={180} 
                 height={80} 
                 style={{ objectFit: 'contain' }}
                 className={styles.loaderLogoAnim}
               />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
