import Slider from "react-slick";
import { characterData } from "../utils/mock_data";
import "../App.css"
import { useMediaQuery } from "@mui/material";

export const Carousels = () => {
  const isTabletOrLarger = useMediaQuery('(min-width: 768px)');
  console.log(isTabletOrLarger, "isTabletOrLarger")
  const settings = {
    infinite: true,
    speed: 500,               // Transition speed
    slidesToShow: 2,          // Show one slide at a time
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
    <Slider {...settings} >
      {characterData.map((img) => (
        <div key={img.id}>
          <img src={img.image} className={isTabletOrLarger ? "!h-[250px]" : ""} />
        </div>
      ))}
    </Slider>
  );
};
