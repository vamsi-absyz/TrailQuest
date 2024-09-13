import Lottie from 'react-lottie';
import confettiAnimationData from "../assets/Animation - 1726231407158.json";
import { useEffect, useRef } from 'react';

export const ConfettiBackground = ({ containerRef }) => {
  // const animationRef = useRef(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: confettiAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

 

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-30 pointer-events-none"
    >
      <Lottie
        options={defaultOptions}
        height="100%"
        width="100%"
        // ref={animationRef} // Attach ref to control the animation
      />
    </div>
  );
};
