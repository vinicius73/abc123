import { sample } from 'lodash-es';
import words from '../sources/words-simple.json';

export interface WordEvent {
  action: 'load-random-word';
}

export interface MessageWord {
  word: string;
}

const randomWord = (): string => sample(words) as string;

self.addEventListener('message', (ev: MessageEvent<WordEvent>): void => {
  if (ev.data.action === 'load-random-word') {
    const payload: MessageWord = { word: randomWord() };
    self.postMessage(payload);
  }
});
