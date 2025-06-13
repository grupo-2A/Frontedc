import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener esto importado
import './Categorias.css'; // Importa el CSS

const categorias = [
  { label: 'PC Gamer', image: '/images/pcgamer.png', path: '/pcgamer' },
  { label: 'Periféricos', image: '/images/perifericos.png', path: '/perifericos' },
  { label: 'Sillas', image: '/images/sillas.png', path: '/sillas' },
  { label: 'Figuras', image: '/images/figuras.png', path: '/figuras' },
  { label: 'Hardware', image: '/images/hardware.png', path: '/hardware' },
  { label: 'Accesorios', image: '/images/acsesorios.png', path: '/accesorios' },
  { label: 'Consolas', image: '/images/consolas.png', path: '/consolas' },
  { label: 'Juegos', image: '/images/juegos.png', path: '/juegos' }
];

const CategoryButton = ({ label, image, path }) => (
  <div className="category-button-container">
    <Link to={path}>
      <button className="boton-morado">
        <img src={image} alt={label} />
      </button>
    </Link>
    <p className="texto-cte">{label}</p>
  </div>
);

const Categorias = () => {
  const rows = [];
  for (let i = 0; i < categorias.length; i += 4) {
    rows.push(
      <div key={i} className="categorias-row">
        {categorias.slice(i, i + 4).map((cat, idx) => (
          <CategoryButton key={idx} label={cat.label} image={cat.image} path={cat.path} />
        ))}
      </div>
    );
  }

  return <>{rows}</>;
};

export default Categorias;
