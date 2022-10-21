import bell from '../assets/bells.wav'

const ringBells = () => {
  return (new Audio(bell)).play()
}

export {
  ringBells
}