import React from "react";

type DotProps = {
  x: number;
  y: number;
  radius: number;
};

const CustomDot = (props: DotProps) => {
  const { x, y, radius } = props;

  return (
    <svg
      width="20"
      height="20"
      x={x - radius}
      y={y - radius}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={`${radius}`}
        cy={`${radius}`}
        r={`${radius}`}
        fill="#8884d8"
      />
    </svg>
  );
};

export default CustomDot;
