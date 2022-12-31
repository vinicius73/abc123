import { sample } from 'lodash-es';
import words from '../sources/words-simple.json';

export type WordEvent = {
  action: 'load-random-word';
};

export type MessageWord = {
  word: string;
};

const randomWord = (): string => sample(words)!;

self.addEventListener('message', (ev: MessageEvent<WordEvent>): void => {
  if (ev.data.action === 'load-random-word') {
    self.postMessage({ word: randomWord() } as MessageWord);
  }
});
