import { Operand } from '../contracts/math';

type Phraser = {
  question(numbers: number[]): string;
  correct(numbers: number[], result: number): string;
  wrong(numbers: number[], result: number, input: number): string;
};

const sumPhrases: Phraser = {
  question: numbers => `Quanto é ${numbers.join(' mais ')}?`,
  correct: (numbers, result) => `${numbers.join(' mais ')} é igual a ${result}`,
  wrong: (numbers, result, input) =>
    `${numbers.join(' mais ')} não é ${input}, o correto é ${result}`,
};

const multiplyPhrases: Phraser = {
  question: numbers => `Quanto é ${numbers.join(' vezes ')}?`,
  correct: (numbers, result) =>
    `${numbers.join(' vezes ')} é igual a ${result}`,
  wrong: (numbers, result, input) =>
    `${numbers.join(' vezes ')} não é ${input}, o correto é ${result}`,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const PHRASERS: Record<Operand, Phraser> = {
  [Operand.MULTIPLY]: multiplyPhrases,
  [Operand.SUM]: sumPhrases,
};

const buildFraser = (op: Operand): Phraser => PHRASERS[op];

export { buildFraser };
