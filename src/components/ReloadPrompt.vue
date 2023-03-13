<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';
const interval = 300000; // 5 minutes

const { needRefresh, updateServiceWorker } = useRegisterSW({
  onRegistered(r) {
    if (!r) {
      return;
    }

    // eslint-disable-next-line no-void
    void r.update();

    setInterval(() => {
      // eslint-disable-next-line no-void
      void r.update();
    }, interval);
  },
});

// const close = async () => {
//   offlineReady.value = false;
//   needRefresh.value = false;
// };
</script>

<template>
  <q-dialog v-model="needRefresh">
    <q-card>
      <q-card-section>
        <div class="text-h6">Atualização</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Há uma atualização disponível, atualize o app agora.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Adiar" color="red" v-close-popup />
        <q-btn
          flat
          label="Atualizar"
          color="primary"
          @click="updateServiceWorker(true)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
