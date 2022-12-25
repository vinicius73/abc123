<script lang="ts">
import { defineComponent, ref, computed, watchEffect, nextTick } from 'vue';
import { random, sum, reduce, shuffle, round, uniq } from 'lodash-es';
import { mdiEqual, mdiCog } from '@quasar/extras/mdi-v6';

import MathOptions from '../components/MathOptions.vue';

import { showConfetti } from '../lib/confetti';
import { ringBells } from '../lib/bells';
import { speak } from '../lib/speak';

import { GameState, Operand, ICONS } from '../contracts/math';
import { buildFraser } from '../lib/phrases';

const MIN_OPTIONS = 2;
const MAX_VALUE = 9;
const HALF_VALUE = round(9 / 2);

const buildNumbers = (size: number): number[] => {
  return Array.from({ length: size })
    .map(() => random(1, MAX_VALUE, false))
    .sort();
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
  components: { MathOptions },
  setup() {
    const $el = ref();
    const editingOptions = ref(false);
    const size = ref(2);
    const input = ref<number | null>(null);
    const numbers = ref<number[]>([]);
    const tp = ref(Operand.SUM);

    const result = computed(() => operations[tp.value](numbers.value));
    const fraser = computed(() => buildFraser(tp.value));
    const opIcon = computed(() => ICONS[tp.value]);

    const STATE = computed(() => {
      if (input.value == null) {
        return GameState.EMPTY;
      }

      if (input.value === result.value) {
        return GameState.CORRECT;
      }

      return GameState.WRONG;
    });

    const isWrong = computed(() => STATE.value === GameState.WRONG);
    const isEmpty = computed(() => STATE.value === GameState.EMPTY);

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

    const onOptionsChange = (opt: { operation: Operand }) => {
      tp.value = opt.operation;
    };

    const showOptions = () => {
      editingOptions.value = true;
    };

    watchEffect(() => {
      if (options.value.length < MIN_OPTIONS) {
        refresh();
      }
    });

    watchEffect(() => {
      if (STATE.value === GameState.EMPTY) {
        speak(fraser.value.question(numbers.value));
        return;
      }

      if (STATE.value === GameState.CORRECT) {
        nextTick(() => showConfetti($el.value.$el));
        nextTick(ringBells);

        speak(fraser.value.correct(numbers.value, result.value)).then(refresh);
        return;
      }

      speak(
        fraser.value.wrong(numbers.value, result.value, input.value as number)
      ).then(refresh);
    });

    refresh();

    return {
      colorStatus,
      defineInput,
      input,
      mdiEqual,
      mdiCog,
      opIcon,
      numbers,
      options,
      result,
      size,
      isWrong,
      isEmpty,
      editingOptions,
      showOptions,
      onOptionsChange,
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
        size="2em"
        :key="`num-${i}`"
        :icon="i > 0 ? opIcon : undefined"
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

    <MathOptions @save="onOptionsChange" v-model="editingOptions" />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="showOptions" fab :icon="mdiCog" color="accent" />
    </q-page-sticky>
  </q-page>
</template>
