import { motion } from 'framer-motion';
import { Check, ArrowLeft, RefreshCw } from 'lucide-react';
import MagneticButton from '../../components/MagneticButton/MagneticButton';

export default function Confirmation({ booking_id, onBack, onSubmitAnother }) {
  const containerVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="min-h-[85vh] min-h-[85dvh] py-24 px-6 flex items-center justify-center bg-brand-offwhite relative overflow-hidden select-none">
      {/* Background soft glowing red gradient to match Testimonials / Worldwide aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-red/5 blur-[120px] pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="w-full max-w-xl bg-brand-white border border-brand-charcoal/10 rounded-2xl p-8 sm:p-12 text-center shadow-[0_15px_50px_rgba(33,33,33,0.03)] relative z-10"
      >
        {/* Red Circle Success Badge */}
        <motion.div 
          variants={itemVariants}
          className="w-16 h-16 bg-brand-red/10 border border-brand-red rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm"
        >
          <Check className="w-8 h-8 text-brand-red" />
        </motion.div>

        {/* Title */}
        <motion.h2 
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-brand-charcoal font-sans"
        >
          PROJECT REQUEST RECEIVED
        </motion.h2>

        {/* Supporting Copy */}
        <motion.div 
          variants={itemVariants}
          className="text-sm sm:text-base text-brand-charcoal/65 mt-4 leading-relaxed font-sans max-w-sm mx-auto space-y-2"
        >
          <p className="font-bold text-brand-charcoal">
            Thank you for reaching out to Behind The Build.
          </p>
          <p>
            Your project request has been received successfully.
          </p>
        </motion.div>

        {/* Reference ID Block */}
        <motion.div 
          variants={itemVariants}
          className="my-8 py-5 px-8 bg-brand-offwhite border border-brand-charcoal/5 rounded-2xl inline-flex flex-col items-center justify-center min-w-[200px]"
        >
          <span className="text-[10px] font-mono font-bold text-brand-charcoal/40 uppercase tracking-widest block mb-1">
            Booking ID
          </span>
          <span className="font-mono text-2xl font-black text-brand-red tracking-wider">
            {booking_id || 'BTB-XXXX'}
          </span>
        </motion.div>

        {/* Short Email Note */}
        <motion.p 
          variants={itemVariants}
          className="text-xs text-brand-charcoal/50 font-sans leading-normal mb-8"
        >
          Our team will review your requirements and contact you within 24 hours.
        </motion.p>

        {/* Buttons Action Group */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4 border-t border-brand-charcoal/5"
        >
          {/* Back to Home */}
          <MagneticButton>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onBack();
              }}
              className="w-full sm:w-auto border border-brand-charcoal text-brand-charcoal text-xs font-bold uppercase tracking-wider px-6 py-3.5 hover:bg-brand-charcoal hover:text-brand-white transition-all duration-300 flex items-center gap-1.5 focus-ring"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </button>
          </MagneticButton>

          {/* Submit Another Request */}
          <MagneticButton>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onSubmitAnother();
              }}
              className="w-full sm:w-auto bg-brand-red text-brand-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 hover:bg-brand-red/90 transition-all duration-300 flex items-center gap-1.5 focus-ring shadow-lg shadow-brand-red/10"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Submit Another Request
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
