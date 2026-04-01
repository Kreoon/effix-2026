import { useState, useEffect } from 'react';

export default function LandingBlackDirecta() {
  const [timeLeft, setTimeLeft] = useState({ days: 234, hours: 12, mins: 45, secs: 30 });
  const [cuposVendidos] = useState(127);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { text: "Con Effi pasé de un negocio de 2 personas a 12 personas. Las conexiones que hice en la zona Black fueron clave para mi crecimiento.", name: "Carlos Mendoza", city: "Bogotá", role: "Fundador, TechStore CO" },
    { text: "La mentoría durante el almuerzo con Vilma Núñez me dio la estrategia que necesitaba. Ese solo consejo valió 10 veces lo que pagué.", name: "María Fernanda López", city: "Quito, Ecuador", role: "CEO, Bella Cosmetics" },
    { text: "Vengo desde Ecuador cada año. El ticket Black incluye todo, no gasté un peso extra. Y las conexiones... invaluables.", name: "Andrés Villacís", city: "Guayaquil, Ecuador", role: "Director, DropLatam" }
  ];

  const speakers = [
    { name: "Jürgen Klarić", role: "Neuromarketing", country: "🇺🇸", followers: "+1M seguidores" },
    { name: "Vilma Núñez", role: "Estrategia Digital", country: "🇪🇸", followers: "Top Voice LinkedIn" },
    { name: "Gabriel Beltrán", role: "Monetización Global", country: "🇺🇸", followers: "8 cifras generadas" },
    { name: "Rigoberto Urán", role: "Emprendedor & Ciclista", country: "🇨🇴", followers: "+2M seguidores" },
    { name: "Fernando Anzures", role: "Marca Personal", country: "🇲🇽", followers: "Autor Best Seller" },
    { name: "Stevenson Rivera", role: "Fundador Grupo Effi", country: "🇨🇴", followers: "CEO +$100M" }
  ];

  const comparison = [
    { feature: "Acceso a +300 stands", general: true, vip: true, black: true },
    { feature: "160+ conferencias", general: true, vip: true, black: true },
    { feature: "Inauguración VIP", general: false, vip: true, black: true },
    { feature: "Zona exclusiva", general: false, vip: true, black: true },
    { feature: "Asientos primera fila", general: false, vip: true, black: true },
    { feature: "Masterminds privados", general: false, vip: true, black: true },
    { feature: "Cena con ponentes", general: false, vip: true, black: true },
    { feature: "DESAYUNO 3 DÍAS", general: false, vip: false, black: true },
    { feature: "ALMUERZO 3 DÍAS", general: false, vip: false, black: true },
    { feature: "CENA 3 DÍAS", general: false, vip: false, black: true },
    { feature: "9 MENTORÍAS PRIVADAS", general: false, vip: false, black: true },
    { feature: "ZONA NETWORKING BLACK", general: false, vip: false, black: true },
    { feature: "DESCUENTOS HOTELEROS", general: false, vip: false, black: true },
    { feature: "SOPORTE DEDICADO", general: false, vip: false, black: true }
  ];

  const faqs = [
    { q: "¿Puedo pagar en cuotas?", a: "Sí. 12 cuotas de $96,250 COP/mes sin interés con tarjeta de crédito. El proceso es automático al momento del checkout en LaTiquetera." },
    { q: "¿Qué pasa si no pueden asistir los speakers anunciados?", a: "Garantizamos speakers de calibre equivalente. En 5 ediciones nunca hemos fallado en traer figuras de talla internacional como Jürgen Klarić, Vilma Núñez y más." },
    { q: "¿La comida está incluida realmente?", a: "Sí. Desayuno, almuerzo y cena buffet los 3 días. Valor aproximado: $450,000 COP que ya está incluido en tu ticket. No gastas un peso adicional en alimentación." },
    { q: "¿Cuántas personas tienen acceso Black?", a: "Máximo 200 cupos. Las mentorías se realizan en grupos de 20-25 personas para garantizar interacción real con cada speaker." },
    { q: "Vengo de otro país, ¿hay descuentos en hoteles?", a: "Sí. Los asistentes Black reciben códigos exclusivos con partners hoteleros en Medellín, incluyendo hoteles 4 y 5 estrellas cerca de Plaza Mayor." }
  ];

  return (
    <div style={{ 
      fontFamily: "'Outfit', sans-serif",
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .gradient-text {
          background: linear-gradient(135deg, #d4a574 0%, #c9a227 50%, #d4a574 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gold-border {
          border: 1px solid rgba(201, 162, 39, 0.3);
        }
        
        .gold-glow {
          box-shadow: 0 0 60px rgba(201, 162, 39, 0.15);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #c9a227 0%, #d4a574 100%);
          color: #0a0a0a;
          font-weight: 700;
          padding: 18px 48px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(201, 162, 39, 0.4);
        }
        
        .card-dark {
          background: linear-gradient(145deg, #141414 0%, #0d0d0d 100%);
          border: 1px solid rgba(255,255,255,0.05);
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .bg-pattern {
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(201, 162, 39, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(201, 162, 39, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 40% 80%, rgba(201, 162, 39, 0.03) 0%, transparent 50%);
        }
        
        .check-gold { color: #c9a227; }
        .check-gray { color: #333; }
        
        .testimonial-card {
          transition: all 0.5s ease;
        }
        
        .faq-item {
          border-bottom: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
        }
        
        .faq-item:hover {
          background: rgba(201, 162, 39, 0.05);
        }
      `}</style>

      {/* Sticky Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201, 162, 39, 0.2)',
        padding: '12px 0'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ 
              width: 40, 
              height: 40, 
              background: 'linear-gradient(135deg, #c9a227, #d4a574)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#0a0a0a',
              fontSize: 14
            }}>EX</div>
            <span style={{ fontWeight: 600, letterSpacing: 1 }}>FERIA EFFIX</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontSize: 14, color: '#888' }}>Solo quedan <strong style={{ color: '#c9a227' }}>{200 - cuposVendidos}</strong> cupos</span>
            <button className="btn-primary" style={{ padding: '12px 24px', fontSize: 13 }}>
              ASEGURAR CUPO
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-pattern" style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 100,
        position: 'relative'
      }}>
        <div style={{ 
          position: 'absolute',
          top: '50%',
          right: '-10%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 70%)',
          transform: 'translateY(-50%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          {/* Badge */}
          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(201, 162, 39, 0.1)',
            border: '1px solid rgba(201, 162, 39, 0.3)',
            padding: '8px 16px',
            borderRadius: 100,
            marginBottom: 32
          }}>
            <span style={{ 
              width: 8, 
              height: 8, 
              background: '#c9a227',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{ fontSize: 13, letterSpacing: 1, color: '#c9a227' }}>
              SOLO 200 CUPOS DISPONIBLES — EDICIÓN LIMITADA
            </span>
          </div>

          <h1 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(42px, 6vw, 72px)',
            fontWeight: 500,
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 800
          }}>
            La experiencia más{' '}
            <span className="gradient-text">exclusiva</span>{' '}
            de Feria Effix 2026
          </h1>

          <p style={{ 
            fontSize: 20,
            color: '#888',
            marginBottom: 40,
            maxWidth: 600
          }}>
            9 mentorías privadas con los mejores speakers de Latinoamérica.
            Alimentación completa. Networking de alto nivel.
          </p>

          {/* Event Info */}
          <div style={{ 
            display: 'flex',
            gap: 32,
            marginBottom: 40,
            flexWrap: 'wrap'
          }}>
            {[
              { icon: '📅', text: '16-18 Octubre 2026' },
              { icon: '📍', text: 'Plaza Mayor Medellín' },
              { icon: '👥', text: '50,000+ Asistentes esperados' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ color: '#ccc' }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Price Box */}
          <div className="card-dark gold-border gold-glow" style={{ 
            padding: 32,
            borderRadius: 12,
            maxWidth: 480,
            marginBottom: 40
          }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ 
                background: 'linear-gradient(135deg, #c9a227, #d4a574)',
                color: '#0a0a0a',
                padding: '4px 12px',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1
              }}>BOLETA BLACK</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
              <span style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: 48,
                fontWeight: 600,
                color: '#fff'
              }}>$1,155,000</span>
              <span style={{ color: '#888' }}>COP</span>
            </div>
            
            <p style={{ 
              color: '#c9a227',
              fontSize: 18,
              marginBottom: 24
            }}>
              12 cuotas de $96,250/mes
            </p>

            <div style={{ 
              background: 'rgba(201, 162, 39, 0.1)',
              padding: 12,
              borderRadius: 8,
              marginBottom: 24
            }}>
              <p style={{ fontSize: 14, color: '#c9a227' }}>
                ✓ Incluye alimentación completa 3 días — valorada en $450,000
              </p>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginBottom: 16 }}>
              ASEGURAR MI CUPO BLACK
            </button>

            <p style={{ fontSize: 13, color: '#666', textAlign: 'center' }}>
              Pago seguro vía LaTiquetera • Factura electrónica incluida
            </p>
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { number: '140,000+', label: 'Asistentes históricos' },
              { number: '381K', label: 'Seguidores Instagram' },
              { number: '5', label: 'Ediciones exitosas' }
            ].map((item, i) => (
              <div key={i}>
                <div className="gradient-text" style={{ 
                  fontSize: 28,
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif"
                }}>{item.number}</div>
                <div style={{ fontSize: 13, color: '#888' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section style={{ padding: '120px 24px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              marginBottom: 16
            }}>
              ¿Qué hace <span className="gradient-text">única</span> la experiencia Black?
            </h2>
            <p style={{ color: '#888', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
              No es solo un upgrade de boleta. Es acceso a lo que realmente importa.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 32
          }}>
            {[
              {
                icon: '🎯',
                title: 'Mentorías Exclusivas',
                subtitle: '9 sesiones privadas con speakers top',
                description: 'Desayuno, almuerzo y cena con los ponentes que están generando millones. Acceso que no se compra con dinero — solo con el ticket Black.',
                features: ['Grupos reducidos (máx 20 personas)', 'Preguntas directas a expertos', 'Networking de alto nivel']
              },
              {
                icon: '🍽️',
                title: 'Experiencia Completa',
                subtitle: 'Todo incluido durante 3 días',
                description: 'Olvídate de buscar dónde comer o perder conferencias. Tu única preocupación es absorber conocimiento y hacer conexiones.',
                features: ['Desayuno, almuerzo y cena buffet', 'Zona Black exclusiva con servicio', 'Línea de soporte dedicada']
              },
              {
                icon: '🤝',
                title: 'Acceso Privilegiado',
                subtitle: 'Donde se cierran los negocios reales',
                description: 'Los deals más importantes no se hacen en el auditorio — se hacen en la zona de networking Black.',
                features: ['Inauguración y clausura VIP', 'Asientos reservados primera fila', 'Descuentos exclusivos en hoteles']
              }
            ].map((card, i) => (
              <div key={i} className="card-dark" style={{ 
                padding: 40,
                borderRadius: 16,
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}>
                <div style={{ 
                  fontSize: 48,
                  marginBottom: 24
                }}>{card.icon}</div>
                
                <h3 className="gradient-text" style={{ 
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 8
                }}>{card.title}</h3>
                
                <p style={{ 
                  color: '#c9a227',
                  fontSize: 14,
                  marginBottom: 16,
                  letterSpacing: 0.5
                }}>{card.subtitle}</p>
                
                <p style={{ 
                  color: '#999',
                  lineHeight: 1.7,
                  marginBottom: 24
                }}>{card.description}</p>
                
                <ul style={{ listStyle: 'none' }}>
                  {card.features.map((feature, j) => (
                    <li key={j} style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 12,
                      color: '#ccc'
                    }}>
                      <span style={{ color: '#c9a227' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              marginBottom: 16
            }}>
              Compara tu <span className="gradient-text">experiencia</span>
            </h2>
          </div>

          <div className="card-dark gold-border" style={{ 
            borderRadius: 16,
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 100px 100px 100px',
              background: 'rgba(201, 162, 39, 0.1)',
              padding: '20px 24px',
              fontWeight: 600
            }}>
              <div>Característica</div>
              <div style={{ textAlign: 'center', color: '#666' }}>General</div>
              <div style={{ textAlign: 'center', color: '#888' }}>VIP</div>
              <div style={{ textAlign: 'center' }} className="gradient-text">BLACK</div>
            </div>

            {/* Rows */}
            {comparison.map((row, i) => (
              <div key={i} style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr 100px 100px 100px',
                padding: '16px 24px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: row.black && !row.vip ? 'rgba(201, 162, 39, 0.05)' : 'transparent'
              }}>
                <div style={{ 
                  color: row.black && !row.vip ? '#c9a227' : '#ccc',
                  fontWeight: row.black && !row.vip ? 600 : 400
                }}>{row.feature}</div>
                <div style={{ textAlign: 'center' }}>
                  {row.general ? <span className="check-gold">✓</span> : <span className="check-gray">—</span>}
                </div>
                <div style={{ textAlign: 'center' }}>
                  {row.vip ? <span className="check-gold">✓</span> : <span className="check-gray">—</span>}
                </div>
                <div style={{ textAlign: 'center' }}>
                  {row.black ? <span style={{ color: '#c9a227', fontWeight: 700 }}>✓</span> : <span className="check-gray">—</span>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button className="btn-primary">
              QUIERO LA EXPERIENCIA COMPLETA
            </button>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section style={{ padding: '120px 24px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              marginBottom: 16
            }}>
              Aprende de quienes ya lo <span className="gradient-text">lograron</span>
            </h2>
            <p style={{ color: '#888', fontSize: 18 }}>
              +200 speakers de 15 países. Con tu boleta Black, tendrás acceso privado a 9 de ellos.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 24,
            marginBottom: 40
          }}>
            {speakers.map((speaker, i) => (
              <div key={i} className="card-dark" style={{ 
                padding: 24,
                borderRadius: 12,
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ 
                  width: 80,
                  height: 80,
                  background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
                  borderRadius: '50%',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  border: '2px solid rgba(201, 162, 39, 0.3)'
                }}>
                  {speaker.country}
                </div>
                <h4 style={{ fontWeight: 600, marginBottom: 4 }}>{speaker.name}</h4>
                <p style={{ color: '#c9a227', fontSize: 13, marginBottom: 4 }}>{speaker.role}</p>
                <p style={{ color: '#666', fontSize: 12 }}>{speaker.followers}</p>
              </div>
            ))}
          </div>

          <div style={{ 
            background: 'rgba(201, 162, 39, 0.1)',
            border: '1px solid rgba(201, 162, 39, 0.2)',
            borderRadius: 12,
            padding: 24,
            textAlign: 'center'
          }}>
            <p style={{ color: '#c9a227' }}>
              📣 Speakers 2026 en proceso de confirmación. Históricamente incluyen referentes de España, México, USA y Colombia.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              marginBottom: 16
            }}>
              Lo que dicen quienes ya <span className="gradient-text">vivieron</span> la experiencia
            </h2>
          </div>

          <div className="card-dark gold-border gold-glow testimonial-card" style={{ 
            padding: 48,
            borderRadius: 16,
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{ fontSize: 48, color: 'rgba(201, 162, 39, 0.3)', marginBottom: 24 }}>"</div>
            <p style={{ 
              fontSize: 22,
              lineHeight: 1.7,
              marginBottom: 32,
              fontStyle: 'italic',
              color: '#ccc'
            }}>
              {testimonials[activeTestimonial].text}
            </p>
            <div>
              <p style={{ fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                {testimonials[activeTestimonial].name}
              </p>
              <p style={{ color: '#c9a227', fontSize: 14 }}>
                {testimonials[activeTestimonial].city}
              </p>
              <p style={{ color: '#666', fontSize: 13 }}>
                {testimonials[activeTestimonial].role}
              </p>
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{ 
                    width: i === activeTestimonial ? 32 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === activeTestimonial ? '#c9a227' : 'rgba(201, 162, 39, 0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Media Logos */}
          <div style={{ marginTop: 60, textAlign: 'center' }}>
            <p style={{ color: '#666', marginBottom: 24, fontSize: 14, letterSpacing: 2 }}>COMO VISTO EN</p>
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: 40,
              flexWrap: 'wrap',
              opacity: 0.5
            }}>
              {['El Tiempo', 'El Colombiano', 'Portafolio', 'La República', 'RCN Radio'].map((media, i) => (
                <span key={i} style={{ 
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#888'
                }}>{media}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '120px 24px', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              marginBottom: 16
            }}>
              Tu inversión está <span className="gradient-text">protegida</span>
            </h2>
          </div>

          <div style={{ marginBottom: 40 }}>
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="faq-item"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ padding: '24px 0' }}
              >
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <h4 style={{ fontWeight: 600, fontSize: 18 }}>{faq.q}</h4>
                  <span style={{ 
                    color: '#c9a227',
                    fontSize: 24,
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease'
                  }}>+</span>
                </div>
                {openFaq === i && (
                  <p style={{ 
                    color: '#888',
                    marginTop: 16,
                    lineHeight: 1.7
                  }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>

          {/* Guarantees */}
          <div className="card-dark" style={{ 
            padding: 32,
            borderRadius: 12,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24
          }}>
            {[
              { icon: '🔒', text: 'Compra segura vía LaTiquetera' },
              { icon: '📄', text: 'Factura electrónica incluida' },
              { icon: '↩️', text: 'Reembolso hasta 30 días antes' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{ color: '#ccc' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ 
        padding: '120px 24px',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 50%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            marginBottom: 24,
            lineHeight: 1.2
          }}>
            Octubre 2026 llegará más rápido de lo que crees
          </h2>

          <p style={{ 
            fontSize: 20,
            color: '#888',
            marginBottom: 40
          }}>
            200 cupos Black. 50,000+ personas compitiendo por atención de los mismos speakers.<br/>
            <strong style={{ color: '#fff' }}>¿Dónde quieres estar?</strong>
          </p>

          {/* Countdown */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 40
          }}>
            {[
              { value: timeLeft.days, label: 'Días' },
              { value: timeLeft.hours, label: 'Horas' },
              { value: timeLeft.mins, label: 'Min' },
              { value: timeLeft.secs, label: 'Seg' }
            ].map((item, i) => (
              <div key={i} className="card-dark gold-border" style={{ 
                padding: '16px 24px',
                borderRadius: 8,
                minWidth: 80
              }}>
                <div className="gradient-text" style={{ 
                  fontSize: 32,
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif"
                }}>{String(item.value).padStart(2, '0')}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{item.label}</div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8
            }}>
              <span style={{ color: '#888', fontSize: 14 }}>Cupos Black vendidos</span>
              <span style={{ color: '#c9a227', fontWeight: 600 }}>{cuposVendidos} de 200</span>
            </div>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 100,
              height: 8,
              overflow: 'hidden'
            }}>
              <div style={{ 
                background: 'linear-gradient(90deg, #c9a227, #d4a574)',
                height: '100%',
                width: `${(cuposVendidos / 200) * 100}%`,
                borderRadius: 100,
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>

          {/* Final Price Box */}
          <div className="card-dark gold-border gold-glow" style={{ 
            padding: 40,
            borderRadius: 16,
            marginBottom: 32
          }}>
            <div style={{ 
              display: 'inline-block',
              background: 'linear-gradient(135deg, #c9a227, #d4a574)',
              color: '#0a0a0a',
              padding: '6px 16px',
              borderRadius: 4,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 1,
              marginBottom: 24
            }}>
              BOLETA BLACK — FERIA EFFIX 2026
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: 56,
                fontWeight: 600
              }}>$1,155,000</div>
              <div style={{ color: '#888' }}>COP</div>
              <div style={{ color: '#c9a227', fontSize: 20, marginTop: 8 }}>
                o 12 cuotas de $96,250/mes
              </div>
            </div>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 12,
              marginBottom: 32,
              textAlign: 'left'
            }}>
              {[
                '9 mentorías privadas con speakers',
                'Alimentación completa 3 días',
                'Zona networking Black',
                'Acceso VIP total',
                'Asientos primera fila',
                'Soporte dedicado'
              ].map((item, i) => (
                <div key={i} style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#ccc'
                }}>
                  <span style={{ color: '#c9a227' }}>✓</span>
                  <span style={{ fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary" style={{ 
              width: '100%',
              padding: '20px 48px',
              fontSize: 18
            }}>
              ASEGURAR MI CUPO BLACK
            </button>

            <p style={{ 
              color: '#666',
              fontSize: 13,
              marginTop: 16
            }}>
              Pago seguro vía LaTiquetera
            </p>
          </div>

          {/* Contact */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            <a href="https://wa.me/573206556725" style={{ 
              color: '#c9a227',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              💬 WhatsApp: +57 320 655 6725
            </a>
            <a href="mailto:gerencia@feriaeffix.com" style={{ 
              color: '#888',
              textDecoration: 'none'
            }}>
              ✉️ gerencia@feriaeffix.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '60px 24px',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 40,
            marginBottom: 40
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  background: 'linear-gradient(135deg, #c9a227, #d4a574)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: '#0a0a0a',
                  fontSize: 14
                }}>EX</div>
                <span style={{ fontWeight: 600 }}>FERIA EFFIX</span>
              </div>
              <p style={{ color: '#666', fontSize: 14, maxWidth: 300 }}>
                La feria de ecommerce presencial más grande de Latinoamérica.
              </p>
            </div>

            <div>
              <p style={{ color: '#888', marginBottom: 8, fontSize: 13 }}>Organizado por</p>
              <p style={{ fontWeight: 600 }}>Grupo Effi — EffiX S.A.S</p>
              <p style={{ color: '#666', fontSize: 14 }}>NIT 901497359</p>
              <p style={{ color: '#666', fontSize: 14 }}>Transversal 39B Circular 76-19</p>
              <p style={{ color: '#666', fontSize: 14 }}>Laureles, Medellín</p>
            </div>

            <div>
              <p style={{ color: '#888', marginBottom: 16, fontSize: 13 }}>Síguenos</p>
              <div style={{ display: 'flex', gap: 16 }}>
                {['IG', 'TT', 'YT', 'FB'].map((social, i) => (
                  <div key={i} style={{ 
                    width: 40,
                    height: 40,
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>{social}</div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ 
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <p style={{ color: '#666', fontSize: 13 }}>
              © 2026 Feria Effix. Todos los derechos reservados.
            </p>
            <div style={{ display: 'flex', gap: 24 }}>
              <a href="#" style={{ color: '#666', fontSize: 13, textDecoration: 'none' }}>Términos y condiciones</a>
              <a href="#" style={{ color: '#666', fontSize: 13, textDecoration: 'none' }}>Política de privacidad</a>
              <a href="#" style={{ color: '#666', fontSize: 13, textDecoration: 'none' }}>Política de reembolso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
