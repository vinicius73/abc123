const synth = window.speechSynthesis;

const speak = async (text: string): Promise<void> => {
  try {
    const utterThis = new SpeechSynthesisUtterance(text);

    synth.speak(utterThis);
  } catch (err) {
    console.warn(err)
  }
}

export { speak };
