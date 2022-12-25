import { mdiPlus, mdiMultiplication } from '@quasar/extras/mdi-v6';
import { type Component } from 'vue';

export enum Operand {
  SUM,
  MULTIPLY,
}

export enum GameState {
  EMPTY,
  CORRECT,
  WRONG,
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ICONS: Record<Operand, string> = {
  [Operand.MULTIPLY]: mdiMultiplication,
  [Operand.SUM]: mdiPlus,
};

export { ICONS };
