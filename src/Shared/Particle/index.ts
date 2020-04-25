import { CARD_HEIGHT, CARD_WIDTH } from "../../constants";

const offsetX = CARD_WIDTH / 2;
const offsetY = CARD_HEIGHT;

type Position = {
  x: number;
  y: number;
};

export function createParticles(num: number, pos: Position) {
  for (let i = 0; i < num; i++) {
    createParticle(pos);
  }
}

export function createParticle(pos: Position) {
  const particle = document.createElement("span");

  const size = `${Math.floor(Math.random() * 20 + 5)}px`;

  Object.assign(particle.style, {
    width: size,
    height: size,
    // Generate a random color in a blue/purple palette
    background: `hsl(${Math.random() * 90 + 180}, 70%, 60%)`,
    borderRadius: "50%",
    pointerEvents: "none",
    position: "fixed",
    opacity: 0,
    left: 0,
    top: 0,
  });

  document.body.appendChild(particle);

  const originX = pos.x + offsetX;
  const originY = pos.y + offsetY;

  const destinationX = pos.x + (Math.random() - 0.5) * 2 * 100;
  const destinationY = pos.y + (Math.random() - 0.5) * 2 * 100;

  const animation = particle.animate(
    [
      {
        // Set the origin position of the particle
        // We offset the particle with half its size to center it around the mouse
        transform: `translate(${originX}px, ${originY}px)`,
        opacity: 1,
      },
      {
        // We define the final coordinates as the second keyframe
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 0,
      },
    ],
    {
      // Set a random duration from 500 to 1500ms
      duration: Math.random() * 1000 + 500,
      easing: "cubic-bezier(0, .9, .57, 1)",
      // Delay every particle with a random value of 200ms
      delay: Math.random() * 200,
    }
  );

  // When the animation is complete, remove the element from the DOM
  animation.onfinish = () => {
    particle.remove();
  };
}
