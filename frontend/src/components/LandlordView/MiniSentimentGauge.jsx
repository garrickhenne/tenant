import { motion, useTransform, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

const translateValue = (value) => {
  const oldRange = [ -1, 1 ];
  const newRange = [ 3, 112 ];
  
  const newValue = ((value - oldRange[0]) * (newRange[1] - newRange[0]) / (oldRange[1] - oldRange[0])) + newRange[0];
  
  return newValue;
};

// Value is a number between [-1, 1].
const MiniSentimentGauge = ({ value }) => {
  const baseWidth = 3;
  const [hasStarted, setHasStarted] = useState(false);
  const x = useMotionValue(baseWidth);
  
  // Translate a value from [-1, 1] into a value from [64, 112]
  const valueToWidth = translateValue(value);
  const gaugeMeter = useTransform(x, [baseWidth, 112], ['#D43434', '#37D434']);

  useEffect(() => {
    setHasStarted(true);
  }, []);

  return (
    <div id="sentiment-meter" className='flex w-28 flex-row items-center'>
      <div className="w-28 h-4 bg-white opacity-5 rounded-full absolute" />
      <motion.div
        className="h-4 rounded-full absolute"
        animate={{
          width: hasStarted ? valueToWidth : baseWidth,
        }}
        style={{
          backgroundColor: gaugeMeter,
        }}
        onUpdate={ (latest) => x.set(latest.width) }
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default MiniSentimentGauge;
