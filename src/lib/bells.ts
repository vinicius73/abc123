import bell from '../assets/bells.wav';

const ringBells = async () => new Audio(bell).play();

export { ringBells };
