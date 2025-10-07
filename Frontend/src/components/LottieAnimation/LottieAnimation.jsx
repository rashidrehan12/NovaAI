import Lottie from 'lottie-react';

const LottieAnimation = ({ 
  animationData, 
  width = 200, 
  height = 200, 
  loop = true, 
  autoplay = true,
  className = "",
  ...props 
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width, height }}
        {...props}
      />
    </div>
  );
};

export default LottieAnimation;