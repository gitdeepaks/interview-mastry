import React from "react";

interface ProgressBarProps {
  progress: number;
  key: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const [animatedProgress, setAnimatedProgress] = React.useState(0);
  React.useEffect(() => {
    setTimeout(() => setAnimatedProgress(progress), 1200);
  }, [progress]);
  return (
    <div className="outer">
      <div
        className="inner"
        style={{
          transform: `translateX(${animatedProgress - 100}%)`,
          color: animatedProgress < 5 ? "black" : "white",
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {progress}%
      </div>
    </div>
  );
};
