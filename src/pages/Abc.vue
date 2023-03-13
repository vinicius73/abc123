<script lang="ts">
import type { MessageWord } from '../workers/words';
import { defineComponent, ref, onBeforeUnmount } from 'vue';

const words = new Worker(new URL('../workers/words.ts', import.meta.url), {
  type: 'module',
});

export default defineComponent({
  name: 'PageAbc',
  setup() {
    const word = ref('--');

    const onMessage = (ev: MessageEvent<MessageWord>): void => {
      word.value = ev.data.word;
    };

    const reload = () => {
      words.postMessage({
        action: 'load-random-word',
      });
    };

    words.addEventListener('message', onMessage);

    const interval = setInterval(reload, 5_000);

    onBeforeUnmount(() => {
      // @ts-ignore
      words.removeEventListener('messsage', onMessage);
      clearInterval(interval);
    });

    return {
      word,
    };
  },
});
</script>

<template>
  <q-page padding>
    <h1>{{ word }}</h1>
  </q-page>
</template>
