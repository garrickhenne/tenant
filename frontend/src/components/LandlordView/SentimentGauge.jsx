import { motion, useTransform, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

const translateValue = (value) => {
  const oldRange = [ -1, 1 ];
  const newRange = [ 64, 384 ];
  
  const newValue = ((value - oldRange[0]) * (newRange[1] - newRange[0]) / (oldRange[1] - oldRange[0])) + newRange[0];
  
  return newValue;
};

// Value is a number between [-1, 1].
const SentimentGauge = ({ value }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const x = useMotionValue(64);
  
  // Translate a value from [-1, 1] into a value from [64, 384]
  const valueToWidth = translateValue(value);
  const gaugeMeter = useTransform(x, [64, 384], ['#D43434', '#37D434']);

  useEffect(() => {
    setHasStarted(true);
  }, []);

  return (
    <div>
      <h1 className="text-start font-semibold">Sentiment</h1>
      <div id="sentiment-meter">
        <div className="w-96 h-14 bg-white opacity-5 rounded-full absolute" />
        <motion.div
          className="h-14 rounded-full absolute"
          animate={{
            width: hasStarted ? valueToWidth : 64,
          }}
          style={{
            backgroundColor: gaugeMeter,
          }}
          onUpdate={ (latest) => x.set(latest.width) }
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};

export default SentimentGauge;
