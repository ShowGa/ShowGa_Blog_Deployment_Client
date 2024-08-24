// confetti
import confetti from "canvas-confetti";

export const confettiAction = (position) => {
  confetti({
    particleCount: 10,
    spread: 70,
    origin: position,
  });
};
