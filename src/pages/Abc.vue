<script lang="ts">
import type { MessageWord } from '../workers/words';
import { defineComponent, ref, onBeforeUnmount, computed } from 'vue';
import { separateSyllables } from '../lib/syllables';

const words = new Worker(new URL('../workers/words.ts', import.meta.url), {
  type: 'module',
});

export default defineComponent({
  name: 'PageAbc',
  setup() {
    const word = ref('');

    const splited = computed(() => separateSyllables(word.value));

    const onMessage = (ev: MessageEvent<MessageWord>): void => {
      word.value = ev.data.word;
    };

    const reload = () => {
      words.postMessage({
        action: 'load-random-word',
      });
    };

    words.addEventListener('message', onMessage);


    onBeforeUnmount(() => {
      // @ts-ignore
      words.removeEventListener('messsage', onMessage);
    });

    return {
      word,
      splited,
      reload,
    };
  },
});
</script>

<template>
  <q-page padding>
    <h1>{{ word }}</h1>
    <h2>{{ splited }}</h2>
    <button @click="reload">reload</button>
  </q-page>
</template>
