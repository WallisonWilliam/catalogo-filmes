import React from "react";

const StarRating = ({ rating }) => {
  // Calcula o número de estrelas inteiras, meias estrelas e estrelas vazias
  const fullStars = Math.floor(rating);
  const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  // Gera os arrays com as estrelas
  const fullStarsArray = Array(fullStars).fill(<i className="fa fa-star"></i>); // estrela cheia
  const halfStarsArray = halfStars
    ? [<i className="fa fa-star-half-o"></i>]
    : []; // meia estrela
  const emptyStarsArray = Array(emptyStars).fill(
    <i className="fa fa-star-o"></i>
  ); // estrela vazia

  // Junta tudo em um único array
  const starsArray = [...fullStarsArray, ...halfStarsArray, ...emptyStarsArray];

  // Formata a nota para uma casa decimal
  const formattedRating = (rating * 2).toFixed(1);

  // Retorna as estrelas como um componente
  return (
    <div className="star-rating">
      <div className="stars">
        {starsArray.map((star, index) => (
          <span key={index} className="star">
            {star}
          </span>
        ))}
      </div>
      <span className="rating">{formattedRating}/10</span>
      <style>{`
        .star-rating {
          display: flex;
          align-items: center;
        }
        
        .stars {
          display: flex;
          margin-right: 5px;
        }
        
        .star {
          background: linear-gradient(53.6deg, #FC6076 3.85%, #FF9A44 115.28%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .rating {
          font-weight: bold;
          font-family: 'Exo 2', sans-serif;
          letter-spacing: 0.02em;
          color: #838383;
        }
      `}</style>
    </div>
  );
};

export default StarRating;
