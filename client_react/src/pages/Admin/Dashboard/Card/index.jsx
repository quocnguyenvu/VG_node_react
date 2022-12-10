import React from 'react';
import './style.scss';

const Card = ({ data }) => {
  return (
    <div className="card">
      {data?.map((item) => (
        <div className="card__item" key={item.id}>
          <div className="card__content">
            <p className="card__title">{item.title}</p>
            <p className="card__count">{item.count.toLocaleString('vi')}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
