<script lang="ts">
import { defineComponent, ref, computed, watchEffect, nextTick } from 'vue'
import { random, sum, reduce, shuffle, round, uniq } from 'lodash-es'
import { mdiPlus, mdiEqual } from '@quasar/extras/mdi-v6'
import { showConfetti } from '../lib/confetti'
import { ringBells } from '../lib/bells'

enum Operand {
  SUM,
  MULTIPLY
}

const buildNumbers = (size: number): number[] => {
  return Array.from({ length: size })
    .map(() => random(1, 9, false))
}

const operations: Record<Operand, (vals: number[]) => number> = {
  [Operand.SUM]: (vals) => sum(vals),
  [Operand.MULTIPLY]: ([initial, ...vals]) => reduce(vals, (acc, val) => {
    return acc * val
  }, initial)
}

export default defineComponent({
  name: 'Home',
  setup() {
    const $el = ref()
    const size = ref(2)
    const input = ref<number | null>(null)
    const numbers = ref<number[]>([])
    const tp = ref(Operand.SUM)

    const result = computed(() => operations[tp.value](numbers.value))
    const colorStatus = computed(() => {
      if (input.value === null) {
        return 'gray'
      }

      return input.value === result.value
        ? 'green'
        : 'red'
    })

    const options = computed(() => {
      const current = result.value
      const min = round(current * (current < 5 ? .4 : .7))
      const max = round(current * (current < 5 ? 2.50 : 1.30))

      const list = Array.from({ length: 2 })
        .map(() => random(min, max, false))

      return shuffle(uniq([...list, result.value]))
    })

    const refresh = () => {
      input.value = null
      numbers.value = buildNumbers(size.value)
    }

    const defineInput = (val: number) => {
      input.value = val
    }

    watchEffect(() => {
      if (options.value.length < 2) {
        refresh()
      }
    })

    watchEffect(() => {
      if (input.value === result.value) {
        nextTick(() => showConfetti($el.value.$el))
        nextTick(ringBells)

        setTimeout(refresh, 3_000)
      }
    })

    refresh()

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
      el: $el
    }
  }
})
</script>

<template>
  <q-page padding>
    <div class="text-center">
      <q-chip v-for="num, i in numbers" size="2.23em" :key="`num-${i}`" :icon="(i > 0 ? mdiPlus : undefined)">
        {{ num }}
      </q-chip>
      <q-chip ref="el" :color="colorStatus" :icon="mdiEqual" size="2.23em">
        {{ input ?? '?' }}
      </q-chip>
    </div>

    <q-separator spaced="lg" />

    <q-btn-group rounded flat spread>
      <q-btn size="2.3em" v-for="val in options" :key="`val-${val}`" :label="val" @click="defineInput(val)" />
    </q-btn-group>
  </q-page>
</template>
