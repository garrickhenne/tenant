import { arc } from "d3-shape";
import { useMotionValue } from 'framer-motion';

const Gauge = ({
  value=1,
  fill='#4834d4',
  label
}) => {
  // Value is the avg rating in range [0, 5].

  const valueToPercent = value / 5;

  const backgroundArc = arc()
    .innerRadius(0.81)
    .outerRadius(0.999)
    .startAngle(-Math.PI)
    .endAngle(Math.PI)
    .cornerRadius(1)();

  const filledArc = arc()
    .innerRadius(0.80)
    .outerRadius(1)
    .startAngle(0)
    .endAngle(2 * Math.PI * (valueToPercent))
    .cornerRadius(0.2)();
  
  return (
    <div className="flex items-center justify-center">
      <svg
        width="15em"
        height='16em'
        viewBox={[
          -1, -0.5,
          2, 1,
        ].join(" ")}>
        <path
          d={backgroundArc}
          fill="#dbdbe70F"
        />
        <path
          d={filledArc}
          fill={fill}
        />
      </svg>
      <div className="absolute font-bold">
        <p className="text-4xl">{label}</p>
        <p className="text-4xl">{value.toFixed(1)}/5</p>
      </div>
    </div>
  );
};

export default Gauge;