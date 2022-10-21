import type { sources } from "party-js";
import { confetti, variation } from "party-js";

const showConfetti = (source: sources.DynamicSourceType) => {
  return confetti(source, {
    count: variation.range(30, 100),
    size: variation.range(0.6, 1.4),
  });
};

export {
  showConfetti
}
