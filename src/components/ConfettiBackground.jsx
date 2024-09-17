import Lottie from 'react-lottie';
import confettiAnimationData from "../assets/Animation - 1726231407158.json";

export const ConfettiBackground = ({ containerRef }) => {
  const defaultOptions = {
    loop: false, 
    autoplay: true,
    animationData: confettiAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    >
      <Lottie
        options={defaultOptions}
        height="100%"
        width="100%"
      />
    </div>
  );
};
