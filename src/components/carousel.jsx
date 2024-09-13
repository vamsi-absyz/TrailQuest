import Slider from "react-slick";
import { characterData } from "../utils/mock_data";
import "../App.css"
import { useMediaQuery } from "@mui/material";

export const Carousels = () => {
  const isTabletOrLarger = useMediaQuery('(min-width: 768px)');
  const settings = {
    infinite: true,
    speed: 500,               // Transition speed
    slidesToShow: 1,          // Show one slide at a time
    slidesToScroll: 1,        // Scroll one slide at a time
    vertical: true,           // Vertical scrolling
    autoplay: true,           // Automatically play the carousel
    autoplaySpeed: 2000,      // Speed of autoplay (2 seconds)
    arrows: false,            // Hide navigation arrows
    dots: false,            // Hide navigation dots
    pauseOnHover: false,
    pauseOnDotsHover: false
  };

  return (
    <Slider {...settings} className="!rounded-[40px]">
      {characterData.map((img) => (
        <div key={img.id} className="!rounded-[40px]">
          <img src={img.image} className={isTabletOrLarger ? "!object-contain !rounded-[40px]" : "!object-contain !rounded-[40px] "} />
        </div>
      ))}
    </Slider>
  );
};
