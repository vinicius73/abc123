import bell from '../assets/bells.wav';

const ringBells = async (): Promise<void> => {
  await new Audio(bell).play();
};

export { ringBells };
