import { useEffect, useState } from "react";
import "./Slider.css"; // Import the CSS for animations
import Sassy from "../assets/images/Sassy.jpg";
import Astro from "../assets/images/Astro.jpg";
import Bobcat from "../assets/images/Bobcat.jpg";
import Elephant from "../assets/images/Ruth-Elephant.jpg";
import Brandy from "../assets/images/Brandy.jpg";
import Cloudy from "../assets/images/Cloudy.jpg";
import Codey from "../assets/images/Codey.jpg";
import Zebra from "../assets/images/Zebra.jpg";
import Squirrel from '../assets/images/squirrel.jpg'
import Dog from "../assets/images/Dog.jpg";
import Einstien from "../assets/images/Einstien.jpg";
import MaxTheMule from "../assets/images/Max-the-mule.jpg";

const images = [
  { id: 1, pos: "left", img: Sassy },
  { id: 2, pos: "right", img: Astro },
  { id: 3, pos: "right", img: Einstien },
  { id: 4, pos: "left", img: Codey },
  { id: 5, pos: "right", img: Cloudy },
  { id: 6, pos: "left", img: Brandy },
  { id: 7, pos: "right", img: Elephant },
  { id: 8, pos: "left", img: Zebra },
  { id: 9, pos: "right", img: Dog },
  { id: 10, pos: "left", img: Squirrel },
  { id: 11, pos: "left", img: Bobcat },
  { id: 12, pos: "left", img: MaxTheMule }
];

const Slider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div className="slider-container w-[100%] h-[275px] sm:h-[325px]  lg:w-[100%] lg:h-[400px]">
      {images.map((image, index) => (
        <div
          key={index}
          className={` w-auto md:!w-full image-box ${index === 0
            ? currentImageIndex === index
              ? "active-horizontal-right"
              : ""
            : index === 1
              ? currentImageIndex === index
                ? "active-horizontal-left"
                : ""
              : currentImageIndex >= 2 && currentImageIndex === index
                ? "active-vertical"
                : ""
            }`}
          style={{ justifyContent: image.pos === "right" ? "end" : "start" }}
        >
          <img src={image.img} alt={`Slide ${index}`} className="slider-image w-[100%] lg:w-[250px] lg:h-[350px] " />
        </div>
      ))}
    </div>
  );
};

export default Slider;
