import React, { useState, useEffect } from "react";

interface ProgressBarProps {
  progress: number;
  height?: string;
  backgroundColor?: string;
  progressColor?: string;
  progressTextColor?: string;
  className?: string;
  duration?: number; // Duration of the animation in milliseconds
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = "20px",
  backgroundColor = "#e0e0e0",
  progressColor = "#4CAF50",
  progressTextColor = "#ffffff",
  className = "",
  duration = 500, // Default duration is 500ms
}) => {
  const [width, setWidth] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setWidth(0); // Reset the width to 0 before starting the animation
    setAnimationProgress(0); // Reset the animationProgress to 0
    setIsAnimating(true); // Set isAnimating to true

    const incrementAnimation = setInterval(() => {
      setAnimationProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        if (newProgress >= progress) {
          clearInterval(incrementAnimation);
          setIsAnimating(false); // Set isAnimating to false when animation is complete
          return progress;
        }
        return newProgress;
      });
    }, duration / progress); // Adjust the interval based on the progress value

    return () => {
      clearInterval(incrementAnimation);
      setIsAnimating(false); // Set isAnimating to false when component unmounts
    };
  }, [progress, duration]);

  useEffect(() => {
    setWidth(animationProgress);
  }, [animationProgress]);

  const containerStyles: React.CSSProperties = {
    height,
    backgroundColor,
    borderRadius: "4px",
    width: "100%",
  };

  const progressBarStyles: React.CSSProperties = {
    width: `${width}%`,
    backgroundColor: progressColor,
    height: "100%",
    borderRadius: "inherit",
    transition: `width ${duration}ms ease`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const progressTextStyles: React.CSSProperties = {
    color: progressTextColor,
    fontSize: "0.8rem",
    fontWeight: "bold",
  };

  return (
    <div className={`progress-bar ${className}`} style={containerStyles}>
      <div
        style={progressBarStyles}
        className={isAnimating ? "animate-pulse" : ""}
      >
        <span style={progressTextStyles}>{`${
          progress > 100 ? 100 : progress
        }%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
