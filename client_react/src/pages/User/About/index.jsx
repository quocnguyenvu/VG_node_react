import React from 'react';
import './styles.scss';
import img from '../../../assets/images/ImgAbout.jpg';

function About(props) {
  return (
    <section>
      <div className="about container">
        <h1>What We Do ?</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed libero vel ex
          maximus vulputate nec eu ligula. Vestibulum elementum nisi ut fermentum lobortis. Sed quis
          iaculis felis.
        </p>
        <img src={img} alt="Img" />
        <ul>
          {/* {Array.from(new Array(7)).forEach(() => ( */}
          <li>
            There is something about the saree that makes a woman look dignified, glorifying and
            every bit stylish. Mikshaa was set up in the year 2017 with a motive to offer its
            designer collection at competitive price and merchantable quality to its whole seller
            and worldwide online customer.
          </li>
          <li>
            There is something about the saree that makes a woman look dignified, glorifying and
            every bit stylish. Mikshaa was set up in the year 2017 with a motive to offer its
            designer collection at competitive price and merchantable quality to its whole seller
            and worldwide online customer.
          </li>
          <li>
            There is something about the saree that makes a woman look dignified, glorifying and
            every bit stylish. Mikshaa was set up in the year 2017 with a motive to offer its
            designer collection at competitive price and merchantable quality to its whole seller
            and worldwide online customer.
          </li>
          <li>
            There is something about the saree that makes a woman look dignified, glorifying and
            every bit stylish. Mikshaa was set up in the year 2017 with a motive to offer its
            designer collection at competitive price and merchantable quality to its whole seller
            and worldwide online customer.
          </li>
          <li>
            There is something about the saree that makes a woman look dignified, glorifying and
            every bit stylish. Mikshaa was set up in the year 2017 with a motive to offer its
            designer collection at competitive price and merchantable quality to its whole seller
            and worldwide online customer.
          </li>
          <li>
            There is something about the saree that makes a woman look dignified, glorifying and
            every bit stylish. Mikshaa was set up in the year 2017 with a motive to offer its
            designer collection at competitive price and merchantable quality to its whole seller
            and worldwide online customer.
          </li>
          <li>
            There is something about the saree that makes a woman look dignified, glorifying and
            every bit stylish. Mikshaa was set up in the year 2017 with a motive to offer its
            designer collection at competitive price and merchantable quality to its whole seller
            and worldwide online customer.
          </li>
          {/* ))} */}
        </ul>
      </div>
    </section>
  );
}

export default About;
