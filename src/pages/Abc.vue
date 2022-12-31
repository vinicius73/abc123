<script lang="ts">
import type { MessageWord } from '../workers/words';
import { defineComponent, ref, onBeforeUnmount } from 'vue';

const words = new Worker(new URL('../workers/words.ts', import.meta.url), {
  type: 'module',
});

export default defineComponent({
  name: 'PageAbc',
  setup(props, ctx) {
    const word = ref('--');

    const onMessage = (ev: MessageEvent<MessageWord>) => {
      word.value = ev.data.word;
    };

    const reload = () => {
      words.postMessage({
        action: 'load-random-word'
      })
    }

    words.addEventListener('message', onMessage);

    const interval = setInterval(reload, 5_000)

    onBeforeUnmount(() => {
      words.removeEventListener('messsage', onMessage);
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
