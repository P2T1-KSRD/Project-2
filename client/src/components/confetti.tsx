import { useEffect } from "react";

interface BurgerConfettiProps {
  trigger: boolean;
}

const BurgerConfetti: React.FC<BurgerConfettiProps> = ({ trigger }) => {
  useEffect(() => {
    if (!trigger) return;

    console.log("Confetti triggered!");

    // Remove any existing confetti container to prevent duplicates
    const existingContainer = document.querySelector(".burger-confetti-container");
    if (existingContainer) {
      console.log("Removing existing confetti container...");
      existingContainer.remove();
    }

    // Create a new confetti container
    const confettiContainer = document.createElement("div");
    confettiContainer.className = "burger-confetti-container";
    document.body.appendChild(confettiContainer);

    // Generate confetti emojis
    for (let i = 0; i < 30; i++) {
      const emoji = document.createElement("div");
      emoji.className = "burger-emoji";
      emoji.innerText = "🍔";

      // Randomize positions and animation properties
      emoji.style.left = Math.random() * 100 + "vw"; // Random horizontal position
      emoji.style.top = Math.random() * -20 + "vh"; // Start above the screen
      emoji.style.animationDuration = `${3 + Math.random() * 2}s`; // Randomize animation duration
      emoji.style.animationDelay = `${Math.random() * 1}s`; // Add random delay for staggered effect

      confettiContainer.appendChild(emoji);
    }

    // Clean up after the animation finishes
    const timeout = setTimeout(() => {
      console.log("Cleaning up confetti...");
      if (confettiContainer.parentNode) {
        confettiContainer.parentNode.removeChild(confettiContainer);
      }
    }, 6000); // Matches the longest animation duration (5s + 1s delay)

    return () => {
      clearTimeout(timeout);
      if (confettiContainer.parentNode) {
        confettiContainer.parentNode.removeChild(confettiContainer);
      }
    };
  }, [trigger]);

  return null;
};

export default BurgerConfetti;
