'use client';

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.afixsa.com.ar/#organization",
        "name": "AFIX S.A.",
        "url": "https://www.afixsa.com.ar",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.afixsa.com.ar/img/logos/logo_dark.png",
          "width": "180",
          "height": "80"
        },
        "sameAs": [
          "https://www.facebook.com/afixsa",
          "https://www.instagram.com/afix.sa",
          "https://www.youtube.com/@afixsa"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+54-911-3541-5059",
          "contactType": "customer service",
          "areaServed": "AR",
          "availableLanguage": "Spanish"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.afixsa.com.ar/#website",
        "url": "https://www.afixsa.com.ar",
        "name": "AFIX Sistemas de Exhibición",
        "publisher": { "@id": "https://www.afixsa.com.ar/#organization" },
        "inLanguage": "es-AR"
      },
      {
        "@type": "LocalBusiness",
        "parentOrganization": { "@id": "https://www.afixsa.com.ar/#organization" },
        "name": "AFIX S.A. Showroom & Fábrica",
        "image": "https://www.afixsa.com.ar/img/nosotros/fabrica.jpg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Luzuriaga 645, Barracas",
          "addressLocality": "CABA",
          "postalCode": "1280",
          "addressCountry": "AR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -34.6366,
          "longitude": -58.3789
        },
        "telephone": "+54-911-3541-5059",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "10:00",
            "closes": "17:00"
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
