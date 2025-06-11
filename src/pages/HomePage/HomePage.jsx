import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFire } from 'react-icons/fa';

import Header from '../../components/Header/Header'; // Corregido: subir dos niveles
import Footer from '../../components/Footer/Footer';
import Productos from '../../components/Productos';
import Categorias from '../../components/Categorias';

import './HomePage.css';

const Divider = () => <hr className="divider" />;

const HomePage = () => {
  const navigate = useNavigate();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const images = [
    '/images/inicio.png',
    '/images/inicio2.png',
    '/images/inicio3.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const irATodosLosProductos = () => {
    navigate('/AllProductos'); // Asegúrate que exista esta ruta en App.jsx
  };

  return (
    <>
      <Header />

      <main>
        <section className="hero-image-container" style={{ textAlign: 'center' }}>
          <img
            src={images[currentImageIndex]}
            alt={`Imagen ${currentImageIndex + 1}`}
            className="hero-image"
          />
          <div className="slider-dots">
            {images.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                aria-label={`Ir a la imagen ${index + 1}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setCurrentImageIndex(index);
                  }
                }}
              />
            ))}
          </div>
        </section>

        <Divider />

        <section className="featured-products-header">
          <div className="featured-products-title">
            <FaFire className="fire-icon" />
            <h2>Productos Destacados</h2>
          </div>
          <button
            className="boton-ver-mas"
            onClick={irATodosLosProductos}
            aria-label="Ver más productos"
          >
            Ver más
          </button>
        </section>

        <Productos />

        <Divider />

        <section className="categories-section" id="categorias">
          <h2 className="texto-categoria">Categorías</h2>
          <Categorias />
        </section>

        <section className="frame-image-container">
          <img
            src="/images/frame.png"
            alt="Decoración visual"
            className="frame-image"
          />
        </section>
      </main>

      <Footer />

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Volver arriba"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default HomePage;


