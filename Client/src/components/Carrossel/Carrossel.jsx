import Slider from "react-slick";
import "../Carrossel/Carrossel.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SimpleSlider() {
  const settings = {
    slidesToShow: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
      
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img
            src="https://images8.alphacoders.com/877/thumb-1920-877849.jpg"
            alt=""
          />
        </div>
        <div>
          <img src="https://images4.alphacoders.com/134/1347667.jpeg" alt="" />
        </div>
        <div>
          <img
            src="https://images7.alphacoders.com/133/thumb-1920-1330226.jpeg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://images5.alphacoders.com/134/thumb-1920-1343612.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://images.alphacoders.com/133/thumb-1920-1335781.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://images3.alphacoders.com/133/thumb-1920-1333016.jpeg"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
