import React from 'react';
import './Categorias.css'; // Importa el CSS

const categorias = [
  { label: 'PC Gamer', image: '/images/pcgamer.png' },
  { label: 'Periféricos', image: '/images/perifericos.png' },
  { label: 'Sillas', image: '/images/sillas.png' },
  { label: 'Figuras', image: '/images/figuras.png' },
  { label: 'Hardware', image: '/images/hardware.png' },
  { label: 'Accesorios', image: '/images/acsesorios.png' },
  { label: 'Consolas', image: '/images/consolas.png' },
  { label: 'Juegos', image: '/images/juegos.png' }
];

const CategoryButton = ({ label, image }) => (
  <div className="category-button-container">
    <button className="boton-morado">
      <img src={image} alt={label} />
    </button>
    <p className="texto-cte">{label}</p>
  </div>
);

const Categorias = () => {
  const rows = [];
  for (let i = 0; i < categorias.length; i += 4) {
    rows.push(
      <div key={i} className="categorias-row">
        {categorias.slice(i, i + 4).map((cat, idx) => (
          <CategoryButton key={idx} label={cat.label} image={cat.image} />
        ))}
      </div>
    );
  }

  return <>{rows}</>;
};

export default Categorias;
