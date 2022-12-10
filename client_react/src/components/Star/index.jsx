import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';
import './styles.scss';
const Star = ({ rate }) => {
  const renderStar = () => {
    var arrStar = new Array(5);
    rate = parseInt(rate);

    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        arrStar[i] = 1;
      } else arrStar[i] = 0.75;
    }

    return arrStar.map((item, index) => {
      if (item === 1) return <AiFillStar key={`star-${index}`}></AiFillStar>;
      else if (item === 0.5) return <BsStarHalf key={`star-${index}`}></BsStarHalf>;
      else return <AiOutlineStar key={`star-${index}`}></AiOutlineStar>;
    });
  };

  return <div className="star">{renderStar()}</div>;
};

export default Star;
