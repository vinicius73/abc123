<script lang="ts">
import { defineComponent, ref, computed, watchEffect, nextTick } from 'vue';
import { random, sum, reduce, shuffle, round, uniq } from 'lodash-es';
import { mdiPlus, mdiEqual } from '@quasar/extras/mdi-v6';
import { showConfetti } from '../lib/confetti';
import { ringBells } from '../lib/bells';
import { speak } from '../lib/speak';

enum Operand {
  SUM,
  MULTIPLY,
}

enum GAME_STATE {
  EMPTY,
  CORRECT,
  WRONG,
}

const MIN_OPTIONS = 2;
const MAX_VALUE = 9;
const HALF_VALUE = round(9 / 2);

const buildNumbers = (size: number): number[] => {
  return Array.from({ length: size }).map(() => random(1, MAX_VALUE, false));
};

const operations: Record<Operand, (vals: number[]) => number> = {
  [Operand.SUM]: vals => sum(vals),
  [Operand.MULTIPLY]: ([initial, ...vals]) =>
    reduce(
      vals,
      (acc, val) => {
        return acc * val;
      },
      initial
    ),
};

export default defineComponent({
  name: 'Match',
  setup() {
    const $el = ref();
    const size = ref(2);
    const input = ref<number | null>(null);
    const numbers = ref<number[]>([]);
    const tp = ref(Operand.SUM);

    const result = computed(() => operations[tp.value](numbers.value));
    const STATE = computed(() => {
      if (input.value == null) {
        return GAME_STATE.EMPTY;
      }

      if (input.value === result.value) {
        return GAME_STATE.CORRECT;
      }

      return GAME_STATE.WRONG;
    });

    const isWrong = computed(() => STATE.value === GAME_STATE.WRONG);
    const isEmpty = computed(() => STATE.value === GAME_STATE.EMPTY);

    const colorStatus = computed(() => {
      if (isEmpty.value) {
        return 'gray';
      }

      return isWrong.value ? 'red' : 'green';
    });

    const options = computed(() => {
      const current = result.value;
      const min = round(current * (current < HALF_VALUE ? 0.4 : 0.7));
      const max = round(current * (current < HALF_VALUE ? 2.5 : 1.3));

      const list = Array.from({ length: MIN_OPTIONS }).map(() =>
        random(min, max, false)
      );

      return shuffle(uniq([...list, result.value]));
    });

    const refresh = () => {
      input.value = null;
      numbers.value = buildNumbers(size.value);
    };

    const defineInput = (val: number) => {
      input.value = val;
    };

    watchEffect(() => {
      if (options.value.length < MIN_OPTIONS) {
        refresh();
      }
    });

    watchEffect(() => {
      if (STATE.value === GAME_STATE.EMPTY) {
        return;
      }

      if (STATE.value === GAME_STATE.CORRECT) {
        speak(`${numbers.value.join(' mais ')} é igual a ${result.value}`);

        nextTick(() => showConfetti($el.value.$el));
        nextTick(ringBells);

        setTimeout(refresh, 3_000);
        return;
      }

      setTimeout(refresh, 2_000);
      speak(
        `${numbers.value.join(' mais ')} não é ${input.value}, o correto é ${
          result.value
        }`
      );
    });

    refresh();

    return {
      colorStatus,
      defineInput,
      input,
      mdiEqual,
      mdiPlus,
      numbers,
      options,
      result,
      size,
      isWrong,
      isEmpty,
      el: $el,
    };
  },
});
</script>

<template>
  <q-page padding>
    <div
      class="text-center"
      :class="{ 'shake animated': input && input !== result }"
    >
      <q-chip
        v-for="(num, i) in numbers"
        size="2.23em"
        :key="`num-${i}`"
        :icon="i > 0 ? mdiPlus : undefined"
      >
        {{ num }}
      </q-chip>
      <q-chip
        ref="el"
        :text-color="input ? 'white' : undefined"
        :color="colorStatus"
        :icon="mdiEqual"
        size="2.23em"
      >
        {{ input ?? '?' }}
      </q-chip>
    </div>

    <q-separator spaced="lg" />

    <q-btn-group rounded flat spread>
      <q-btn
        v-for="val in options"
        size="2.3em"
        :disabled="!isEmpty"
        :key="`val-${val}`"
        :label="val"
        @click="defineInput(val)"
      />
    </q-btn-group>
  </q-page>
</template>
