import { motion } from 'framer-motion';

function Spinner({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const sizes = {
    small: { width: 20, height: 20, borderWidth: 3 },
    medium: { width: 30, height: 30, borderWidth: 5 },
    large: { width: 50, height: 50, borderWidth: 7 },
  };

  const { width, height, borderWidth } = sizes[size] || sizes.medium;

  return (
    <div className="flex justify-center items-center">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'linear',
        }}
        style={{
          width,
          height,
          border: `${borderWidth}px solid lightgray`,
          borderTop: `${borderWidth}px solid blue`,
          borderRadius: '50%',
        }}
      />
    </div>
  );
}

export default Spinner;
