import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const t2 = setTimeout(() => setStep(2), 300);
    const t3 = setTimeout(() => setStep(3), 600);
    const t4 = setTimeout(() => setStep(4), 900);
    const t5 = setTimeout(() => {
      onComplete();
    }, 1300); // Total animation timeline around 1.3s (down from 2.4s)

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  // Helper to split text into staggered characters
  const renderStaggeredWords = (text) => {
    return text.split(' ').map((word, wordIdx) => (
      <span key={wordIdx} className="mr-3 sm:mr-5 flex whitespace-nowrap">
        {word.split('').map((char, charIdx) => (
          <motion.span
            key={charIdx}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.35,
              delay: charIdx * 0.04 + wordIdx * 0.12,
              ease: [0.25, 1, 0.5, 1]
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.55, ease: 'easeInOut' }
      }}
      className="fixed inset-0 bg-brand-white z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Cinematic Copy Steps */}
      <motion.div
        animate={{ 
          opacity: step === 4 ? 0 : 1,
          scale: step === 4 ? 0.98 : 1
        }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-6"
      >
        {/* Line 1 */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: step >= 2 ? 0.25 : 1,
            y: 0 
          }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-brand-charcoal font-sans"
        >
          YOU BUILT IT.
        </motion.h2>

        {/* Line 2 */}
        {step >= 2 && (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: step >= 3 ? 0.25 : 1,
              y: 0 
            }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-brand-charcoal font-sans"
          >
            WE BRING IT.
          </motion.h2>
        )}

        {/* Line 3 */}
        {step >= 3 && (
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-brand-red font-sans flex items-center justify-center flex-wrap leading-none">
            {renderStaggeredWords('TO THE WORLD.')}
          </h2>
        )}
      </motion.div>

      {/* Step 4 Loading Progress Indicator */}
      {step === 4 && (
        <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 max-w-[1440px] mx-auto space-y-4">
          {/* Horizontal red line growing */}
          <div className="w-full h-[1px] bg-brand-charcoal/5 relative overflow-hidden">
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 bg-brand-red"
            />
          </div>
          
          {/* Caption */}
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0.45, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[9px] font-mono tracking-[0.25em] uppercase text-brand-charcoal text-center font-bold"
          >
            Preparing Your Story...
          </motion.p>
        </div>
      )}
    </motion.div>
  );
}
