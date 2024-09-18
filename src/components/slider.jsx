import { useEffect, useState } from "react";
import "./slider.css";
import Astro from "../assets/images/Astro.jpg";
import Bobcat from "../assets/images/Bobcat.jpg";
import Elephant from "../assets/images/Ruth-Elephant.jpg";
import Einstien from "../assets/images/Einstien.jpg";
import Dog from "../assets/images/Dog.jpg"


const images = [
  { id: 1, pos: "right", img: Astro },
  { id: 2, pos: "right", img: Einstien },
  { id: 3, pos: "right", img: Elephant },
  { id: 4, pos: "right", img: Dog },
  { id: 5, pos: "left", img: Bobcat },
];

const Slider = ({isModalOpen}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!isModalOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 700);

      return () => clearInterval(interval);
    }
  }, [isModalOpen]);

  return (
    <div className="slider-container w-[100%] h-[275px] sm:h-[325px]  lg:w-[100%] lg:h-[400px] bg-[#f1efef] rounded-[30px]">
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
          style={{ justifyContent: image.pos === "right" ? "end" : "start", backgroundColor: "#f1efef" }}
        >
          <img src={image.img} alt={`Slide ${index}`} className="slider-image w-[100%] lg:w-[250px] lg:h-[350px] " />
        </div>
      ))}
    </div>
  );
};

export default Slider;
