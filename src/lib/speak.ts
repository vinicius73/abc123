const synth = window.speechSynthesis;

const speak = async (text: string, speed = 1.0): Promise<void> => {
  synth.cancel();
  try {
    const utterThis = new SpeechSynthesisUtterance(text);
    await new Promise<void>((resolve, reject) => {
      utterThis.rate = speed;
      utterThis.addEventListener('end', () => {
        resolve();
      });
      utterThis.addEventListener('error', err => {
        reject(err);
      });

      synth.speak(utterThis);
    });
  } catch (err) {
    console.warn(err);
  }
};

export { speak };
