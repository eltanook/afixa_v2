import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'AFIX - Sistemas de Exhibición Profesional';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          border: '12px solid #BF0311',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '120px',
            height: '120px',
            background: '#BF0311',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '30px',
            fontSize: '80px',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(191,3,17,0.5)',
          }}>
            A
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '100px', fontWeight: 'bold', color: 'white', letterSpacing: '-2px', lineHeight: 1 }}>
              AFIX
            </span>
            <span style={{ fontSize: '24px', color: '#BF0311', fontWeight: 'bold', letterSpacing: '4px', textTransform: 'uppercase' }}>
              Sistemas de Exhibición
            </span>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          fontSize: '48px', 
          color: '#e8e8e8', 
          textAlign: 'center', 
          maxWidth: '800px', 
          fontWeight: 'normal',
          lineHeight: 1.4,
          fontFamily: 'sans-serif',
        }}>
          Fabricantes líderes en Argentina de Marcos de Aluminio Clic-Clac
        </div>
        
        <div style={{
          marginTop: '60px',
          display: 'flex',
          gap: '20px',
          fontSize: '24px',
          color: '#888',
        }}>
          <span>trayectoria</span>
          <span style={{ color: '#BF0311' }}>•</span>
          <span>calidad premium</span>
          <span style={{ color: '#BF0311' }}>•</span>
          <span>innovación</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
