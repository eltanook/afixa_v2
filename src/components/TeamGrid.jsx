'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function TeamGrid({ team }) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '32px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}
    >
      {team.map((m, i) => (
        <motion.div 
          key={m.name} 
          variants={cardVariants}
          style={{ 
            position: 'relative', 
            aspectRatio: '1/1', 
            borderRadius: 'var(--radius-lg, 16px)', 
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <Image 
            src={m.img} 
            alt={m.name} 
            fill 
            style={{ objectFit: 'cover', objectPosition: 'top' }} 
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '24px',
            opacity: 0,
            transition: 'opacity 0.3s'
          }} className="member-overlay">
            <h4 style={{ color: '#fff', margin: 0, fontSize: '1.25rem' }}>{m.name}</h4>
            <p style={{ color: 'var(--brand-red)', margin: 0, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>{m.role}</p>
          </div>
        </motion.div>
      ))}
      
      <style>{`
        .member-overlay:hover {
          opacity: 1 !important;
        }
        @media (max-width: 991px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 575px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
