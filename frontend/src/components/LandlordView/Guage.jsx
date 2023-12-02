import { motion } from 'framer-motion';
import { useEffect, useState } from "react";

// Value is the avg rating in range [0, 5].
const Gauge = ({
  value=1,
  fill='#4834d4',
  label
}) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setIsShown(true);
  }, []);
  
  const strokeWidth = 0.15;
  const valueToPercent = value / 5 * 100;

  const radius = 0.85;
  const circumference = Math.ceil(2 * Math.PI * radius);
  const fillPercents = Math.abs(
    Math.ceil((circumference / 100) * (valueToPercent - 100))
  );

  const transition = {
    duration: 0.5,
    ease: "easeOut",
    delay: 0.2
  };

  const variant = {
    hidden: {
      strokeDashoffset: circumference,
      transition
    },
    show: {
      strokeDashoffset: fillPercents,
      transition
    }
  };
  
  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox={[-1, -0.5, 2, 1].join(' ')}
        width='16em'
        height='16em'
        style={{
          transform: "rotate(-90deg)",
          strokeLinecap: 'round'
        }}
      >
        <circle
          cx='0'
          cy='0'
          r={radius}
          strokeWidth={strokeWidth}
          stroke='#dbdbe70f'
          fill="transparent"
        />
        <motion.circle
          cx='0'
          cy='0'
          r={radius}
          strokeWidth={strokeWidth}
          stroke={fill}
          fill='transparent'
          strokeDashoffset={fillPercents}
          strokeDasharray={circumference}
          variants={variant}
          initial='hidden'
          animate={isShown ? 'show' : 'hidden'}
        />
      </svg>
      <div className="absolute font-bold">
        <p className="text-4xl">{label}</p>
        <motion.p className="text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >{value.toFixed(1)}/5</motion.p>
      </div>
    </div>
  );
};

export default Gauge;