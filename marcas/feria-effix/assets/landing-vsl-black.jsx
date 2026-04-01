import { useState, useEffect } from 'react';

export default function VSLPageBlack() {
  const [showCTA, setShowCTA] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [cuposVendidos] = useState(127);

  // Simular progreso del video (en producción, esto vendría del player real)
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setVideoProgress(prev => {
          const newProgress = prev + 0.5;
          // Mostrar CTA al 60% del video (aproximadamente minuto 8-10 de un video de 15 min)
          if (newProgress >= 60 && !showCTA) {
            setShowCTA(true);
          }
          // Mostrar contenido adicional al 90%
          if (newProgress >= 90 && !showContent) {
            setShowContent(true);
          }
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, showCTA, showContent]);

  const faqs = [
    { q: "¿Puedo pagar en cuotas?", a: "Sí. 12 cuotas de $96,250 COP/mes sin interés." },
    { q: "¿La comida está incluida?", a: "Sí. Desayuno, almuerzo y cena buffet los 3 días." },
    { q: "¿Cuántos cupos Black hay?", a: "Solo 200 cupos en total. Mentorías en grupos de 20-25 personas." }
  ];

  return (
    <div style={{ 
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#000000',
      color: '#ffffff',
      minHeight: '100vh'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .gradient-gold {
          background: linear-gradient(135deg, #b8860b 0%, #daa520 50%, #b8860b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .btn-gold {
          background: linear-gradient(135deg, #b8860b 0%, #daa520 100%);
          color: #000;
          font-weight: 600;
          padding: 18px 48px;
          border: none;
          border-radius: 2px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.4s ease;
          letter-spacing: 3px;
          text-transform: uppercase;
        }
        
        .btn-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 60px rgba(218, 165, 32, 0.3);
        }
        
        .video-container {
          position: relative;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          aspect-ratio: 16/9;
          background: #0a0a0a;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
        }
        
        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          background: rgba(218, 165, 32, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s ease;
          border: none;
        }
        
        .play-button:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 0 60px rgba(218, 165, 32, 0.5);
        }
        
        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #b8860b, #daa520);
          transition: width 0.3s ease;
        }
        
        .fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .cta-reveal {
          animation: ctaReveal 0.6s ease forwards;
        }
        
        @keyframes ctaReveal {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95);
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }

        .ambient-glow {
          position: fixed;
          pointer-events: none;
          opacity: 0.5;
        }
      `}</style>

      {/* Ambient Background Effects */}
      <div className="ambient-glow" style={{
        top: '10%',
        left: '5%',
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(218,165,32,0.03) 0%, transparent 70%)',
      }} />
      <div className="ambient-glow" style={{
        bottom: '20%',
        right: '10%',
        width: 500,
        height: 500,
        background: 'radial-gradient(circle, rgba(218,165,32,0.02) 0%, transparent 70%)',
      }} />

      {/* Minimal Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)'
      }}>
        <div style={{ 
          fontSize: 12, 
          letterSpacing: 4, 
          color: 'rgba(255,255,255,0.4)',
          fontWeight: 500
        }}>
          FERIA EFFIX 2026
        </div>
        <div style={{ 
          fontSize: 12, 
          letterSpacing: 2, 
          color: 'rgba(218,165,32,0.8)'
        }}>
          16 — 18 OCTUBRE • MEDELLÍN
        </div>
      </header>

      {/* Main Video Section */}
      <section style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '120px 24px 80px'
      }}>
        {/* Pre-video Headline */}
        <div style={{ 
          textAlign: 'center',
          marginBottom: 48,
          maxWidth: 700
        }}>
          <h1 style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 400,
            lineHeight: 1.4,
            color: '#fff',
            letterSpacing: 1
          }}>
            Cómo <span className="gradient-gold" style={{ fontWeight: 600 }}>9 conversaciones</span> pueden
            transformar tu negocio en los próximos 12 meses
          </h1>
        </div>

        {/* Video Player */}
        <div className="video-container">
          {!isPlaying ? (
            <>
              {/* Video Thumbnail/Poster */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Decorative Elements */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 300,
                  height: 300,
                  border: '1px solid rgba(218,165,32,0.1)',
                  borderRadius: '50%'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  height: 400,
                  border: '1px solid rgba(218,165,32,0.05)',
                  borderRadius: '50%'
                }} />

                {/* Duration Badge */}
                <div style={{
                  position: 'absolute',
                  top: 24,
                  right: 24,
                  background: 'rgba(0,0,0,0.6)',
                  padding: '8px 16px',
                  borderRadius: 2,
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: 1
                }}>
                  15:42
                </div>
              </div>

              <button 
                className="play-button"
                onClick={() => setIsPlaying(true)}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#000">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>

              <div style={{
                position: 'absolute',
                bottom: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontSize: 13, 
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: 2
                }}>
                  CLICK PARA REPRODUCIR
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Simulated Video Playing State */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: '#0a0a0a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="pulse" style={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #b8860b, #daa520)',
                    margin: '0 auto 24px'
                  }} />
                  <p style={{ 
                    color: 'rgba(255,255,255,0.6)', 
                    fontSize: 14,
                    letterSpacing: 2
                  }}>
                    REPRODUCIENDO VIDEO...
                  </p>
                  <p style={{ 
                    color: 'rgba(218,165,32,0.8)', 
                    fontSize: 12,
                    marginTop: 8
                  }}>
                    {Math.floor(videoProgress * 0.15)}:{String(Math.floor((videoProgress * 0.15 % 1) * 60)).padStart(2, '0')} / 15:42
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress-bar" style={{ width: `${videoProgress}%` }} />
            </>
          )}
        </div>

        {/* Video Progress Indicator */}
        {isPlaying && (
          <div style={{ 
            marginTop: 24, 
            textAlign: 'center',
            color: 'rgba(255,255,255,0.3)',
            fontSize: 12,
            letterSpacing: 1
          }}>
            {videoProgress < 60 ? (
              <span>Sigue viendo para desbloquear el acceso exclusivo...</span>
            ) : (
              <span style={{ color: 'rgba(218,165,32,0.8)' }}>✓ Acceso desbloqueado</span>
            )}
          </div>
        )}

        {/* CTA Button - Appears at 60% of video */}
        {showCTA && (
          <div className="cta-reveal" style={{ 
            marginTop: 48,
            textAlign: 'center'
          }}>
            <button className="btn-gold">
              ASEGURAR MI CUPO BLACK
            </button>
            <p style={{ 
              marginTop: 16,
              fontSize: 13,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: 1
            }}>
              Solo quedan {200 - cuposVendidos} cupos disponibles
            </p>
          </div>
        )}
      </section>

      {/* Post-Video Content - Appears after video ends or at 90% */}
      {showContent && (
        <section className="fade-in" style={{ 
          padding: '80px 24px 120px',
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            
            {/* Offer Summary */}
            <div style={{ 
              background: 'linear-gradient(145deg, #0a0a0a 0%, #111 100%)',
              border: '1px solid rgba(218,165,32,0.2)',
              borderRadius: 4,
              padding: 48,
              marginBottom: 60,
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: 11,
                letterSpacing: 4,
                color: 'rgba(218,165,32,0.8)',
                marginBottom: 24
              }}>
                BOLETA BLACK — FERIA EFFIX 2026
              </div>
              
              <div style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 56,
                fontWeight: 400,
                marginBottom: 8
              }}>
                $1,155,000
              </div>
              
              <div style={{ 
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 8
              }}>
                COP
              </div>
              
              <div style={{ 
                color: 'rgba(218,165,32,0.9)',
                fontSize: 18,
                marginBottom: 32
              }}>
                o 12 cuotas de $96,250/mes
              </div>

              {/* Quick Benefits */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 16,
                marginBottom: 32,
                textAlign: 'left'
              }}>
                {[
                  '9 mentorías privadas',
                  'Alimentación 3 días',
                  'Zona networking Black',
                  'Acceso VIP total'
                ].map((item, i) => (
                  <div key={i} style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 14
                  }}>
                    <span style={{ color: '#daa520' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>

              <button className="btn-gold" style={{ width: '100%' }}>
                ASEGURAR MI CUPO BLACK
              </button>

              <p style={{ 
                marginTop: 16,
                fontSize: 12,
                color: 'rgba(255,255,255,0.3)'
              }}>
                Pago seguro vía LaTiquetera
              </p>
            </div>

            {/* Mini FAQ */}
            <div style={{ marginBottom: 60 }}>
              <h3 style={{ 
                textAlign: 'center',
                fontSize: 12,
                letterSpacing: 4,
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 32
              }}>
                PREGUNTAS FRECUENTES
              </h3>

              {faqs.map((faq, i) => (
                <div 
                  key={i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ 
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    padding: '20px 0',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontWeight: 500 }}>{faq.q}</span>
                    <span style={{ 
                      color: '#daa520',
                      transform: openFaq === i ? 'rotate(45deg)' : 'none',
                      transition: 'transform 0.3s ease'
                    }}>+</span>
                  </div>
                  {openFaq === i && (
                    <p style={{ 
                      marginTop: 12,
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 14,
                      lineHeight: 1.6
                    }}>{faq.a}</p>
                  )}
                </div>
              ))}
            </div>

            {/* WhatsApp Contact */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                fontSize: 12,
                letterSpacing: 2,
                color: 'rgba(255,255,255,0.3)',
                marginBottom: 16
              }}>
                ¿TIENES PREGUNTAS?
              </p>
              <a 
                href="https://wa.me/573206556725"
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  color: '#daa520',
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: 500
                }}
              >
                <span style={{ fontSize: 20 }}>💬</span>
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/573206556725"
        style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          width: 56,
          height: 56,
          background: '#25d366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          zIndex: 1000,
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Minimal Footer */}
      <footer style={{ 
        padding: '40px 24px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center'
      }}>
        <p style={{ 
          fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: 1,
          marginBottom: 8
        }}>
          FERIA EFFIX 2026 — GRUPO EFFI
        </p>
        <p style={{ 
          fontSize: 11,
          color: 'rgba(255,255,255,0.2)'
        }}>
          © 2026 EffiX S.A.S. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
