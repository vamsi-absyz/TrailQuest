// import { useEffect, useState } from "react";
// import "./Slider.css"; // Import the CSS for animations
// import Astro from "../assets/images/Astro.jpg";
// import Bobcat from "../assets/images/Bobcat.jpg";
// import Brandy from "../assets/images/Brandy.jpg";
// import Cloudy from "../assets/images/Cloudy.jpg";
// import Codey from "../assets/images/Codey.jpg";
// import Dog from "../assets/images/Dog.jpg";
// import Einstien from "../assets/images/Einstien.jpg";
// import MaxTheMule from "../assets/images/Max-the-mule.jpg";

// const images = [
//   Astro,
//   Bobcat,
//   Brandy,
//   Cloudy,
//   Codey,
//   Dog,
//   Einstien,
//   MaxTheMule,
// ];

// const Slider = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 1200); // Change image every 1.2 milli seconds

//     return () => clearInterval(interval); // Clean up on component unmount
//   }, []);

//   return (
//     <div className="slider-container">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`image-box ${currentImageIndex === index ? "active" : ""}`}
//         >
//           <img src={image} alt={`Slide ${index}`} className="slider-image" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Slider;

import { useEffect, useState } from "react";
import "./Slider.css"; // Import the CSS for animations
import Astro from "../assets/images/Astro.jpg";
import Bobcat from "../assets/images/Bobcat.jpg";
import Brandy from "../assets/images/Brandy.jpg";
import Cloudy from "../assets/images/Cloudy.jpg";
import Codey from "../assets/images/Codey.jpg";
import Dog from "../assets/images/Dog.jpg";
import Einstien from "../assets/images/Einstien.jpg";
import MaxTheMule from "../assets/images/Max-the-mule.jpg";

const images = [
  Astro,
  Bobcat,
  Brandy,
  Cloudy,
  Codey,
  Dog,
  Einstien,
  MaxTheMule,
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
    <div className="slider-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`image-box ${
            index === 0
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
        >
          <img src={image} alt={`Slide ${index}`} className="slider-image" />
        </div>
      ))}
    </div>
  );
};

export default Slider;
