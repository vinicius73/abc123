import type { sources } from "party-js";
import { confetti, variation } from "party-js";

const showConfetti = (source: sources.DynamicSourceType) => {
  return confetti(source, {
    count: variation.range(10, 30),
    size: variation.range(0.3, 1),
  });
};

export {
  showConfetti
}
