import React from "react";

interface ProgressBarProps {
  progress: number;
  height?: string;
  backgroundColor?: string;
  progressColor?: string;
  progressTextColor?: string;
  className?: string;
  progressValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = "20px",
  backgroundColor = "#e0e0e0",
  progressColor = "#4CAF50",
  progressTextColor = "#ffffff",
  className = "",
  progressValue,
}) => {
  const containerStyles: React.CSSProperties = {
    height,
    backgroundColor,
    borderRadius: "4px",
    width: "100%",
  };

  const progressBarStyles: React.CSSProperties = {
    width: `${progress}%`,
    backgroundColor: progressColor,
    height: "100%",
    borderRadius: "inherit",
    transition: "width 0.5s ease",
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
      <div className="animate-pulse " style={progressBarStyles}>
        <span style={progressTextStyles}>{`${progressValue}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
