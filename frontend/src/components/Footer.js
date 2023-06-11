import React from "react";
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom";
import { FaHome, FaFilm } from "react-icons/fa"; // importando os ícones

const Footer = () => {
  // Utilize o hook useMediaQuery para verificar se a tela é de um dispositivo móvel
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' })

  return (
    isMobile && (
      <div style={footerStyle}>
        <Link to="/">
          <FaHome size={24} />
        </Link>
        <Link to="/search?q=bat">
          <FaFilm size={24} />
        </Link>
      </div>
    )
  )
};

// Estilo do footer
const footerStyle = {
  width: '100%',
  position: 'fixed',
  bottom: '0',
  height: '60px',
  borderTop: '1px solid #999',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(7.5px)',
};

export default Footer;
