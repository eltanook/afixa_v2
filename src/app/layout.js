import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollAnimations from "@/components/ScrollAnimations";
import Icon from "@/components/Icon";

export const metadata = {
  title: "AFIX - Sistemas de Exhibición Profesional | Fabricantes de Marcos Clic-Clac Argentina",
  description: "AFIX S.A. fabricamos sistemas de exhibición premium con tecnología Clic-Clac. Líderes en Argentina con más de 20 años de trayectoria. Marcos de aluminio, porta afiches, tótems y displays publicitarios de alta calidad.",
  keywords: "marcos de aluminio, sistema clic-clac, marcos clic-clac argentina, exhibición profesional, tótems publicitarios, displays para gráficas, señalética corporativa, portafolletos aluminio, porta afiches, cartelería profesional argentina, fabricación nacional marcos aluminio",
  openGraph: {
    title: "AFIX - Sistemas de Exhibición Profesional | Marcos Clic-Clac",
    description: "Líderes en fabricación de sistemas de exhibición con tecnología Clic-Clac. Marcos de aluminio premium para una exposición estilizada y cambio ágil de gráficas.",
    type: "website",
    url: "https://www.afixsa.com.ar",
    siteName: "AFIX Sistemas de Exhibición",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "AFIX - Sistemas de Exhibición Profesional",
    description: "Marcos de aluminio Clic-Clac y sistemas de exhibición premium fabricados en Argentina.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://www.afixsa.com.ar'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon_dark.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon_light.png" media="(prefers-color-scheme: dark)" />
      </head>
      <body>
        <ThemeProvider>
          <CustomCursor />
          <ScrollAnimations />
          <Navbar />
          <main>{children}</main>
          <Footer />

          {/* Back to Top */}
          <a href="#" className="back-to-top" aria-label="Volver arriba">
            <Icon name="arrow-up" size={20} />
          </a>

          {/* WhatsApp Float */}
          <a href="https://wa.me/5491135415059" target="_blank" rel="noopener noreferrer"
            className="whatsapp-float" aria-label="WhatsApp">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
          </a>
        </ThemeProvider>
      </body>
    </html>
  );
}
