import JSConfetti from 'js-confetti';
import { useEffect } from 'react';

const BurgerConfetti = () => {
  const triggerConfetti = () => {
    const jsConfetti = new JSConfetti();

    jsConfetti.addConfetti({
      confettiRadius: 6,
      confettiNumber: 200,
      emojis: ['🍔'],  // Use the burger emoji as confetti
    });
  };

  useEffect(() => {
    triggerConfetti();  // Trigger the confetti effect when component mounts
  }, []);

  return null;  // No visible UI needed for this component
};

export default BurgerConfetti;
