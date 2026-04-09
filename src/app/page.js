import HeroVideoSequence from "@/components/HeroVideoSequence";
import HorizontalScrollCatalog from "@/components/HorizontalScrollCatalog";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ScrollingMarqueeTestimonials from "@/components/ScrollingMarqueeTestimonials";

export const metadata = {
  title: "AFIX — Sistemas de Exhibición Profesional en Argentina | Marcos Clic-Clac",
  description: "Único fabricante nacional del sistema Clic-Clac®: marcos de aluminio para cambio ágil de gráficas sin herramientas. 20 años de trayectoria.",
  keywords: "marcos aluminio clic-clac, AFIX, sistema exhibición profesional, marcos publicitarios argentina, cambio gráfica sin herramientas",
  alternates: { canonical: "https://www.afixsa.com.ar" },
  openGraph: {
    title: "AFIX — Sistemas de Exhibición Profesional | Marcos Clic-Clac Argentina",
    description: "Únicos fabricantes nacionales del sistema Clic-Clac®. Marcos de aluminio premium.",
    type: "website",
    url: "https://www.afixsa.com.ar",
    images: [{ url: "https://www.afixsa.com.ar/img/logos/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "AFIX — Marcos Clic-Clac Argentina", description: "Único fabricante nacional del sistema Clic-Clac®." },
};

const CLIENTS_IMG = Array.from({ length: 18 }, (_, i) => `/img/CLIENTES/${i + 1}.png`);

export default function HomePage() {
  return (
    <>
      <HeroVideoSequence />
      <HorizontalScrollCatalog />
      <BeforeAfterSlider />
      <ScrollingMarqueeTestimonials />
      
      {/* ===== CLIENTS TICKER (Marcas) ===== */}
      <section style={{ padding: '64px 0', background: 'var(--bg)', overflow: 'hidden' }}>
        <div className="clients-ticker-wrap" style={{ padding: 0 }}>
          <div className="clients-ticker">
            {[...CLIENTS_IMG, ...CLIENTS_IMG].map((src, i) => (
              <img key={i} src={src} alt="Cliente AFIX" style={{ height: '32px' }} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
