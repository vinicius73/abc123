<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-icon :name="mdiCalculatorVariant" size="30px" />
          </q-avatar>
          ABC123
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab :to="{ name: 'math' }" label="123" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>@vinicius73</div>
        </q-toolbar-title>
        <q-space />
        <div>{{ appVersion }}</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mdiCalculatorVariant } from '@quasar/extras/mdi-v6';

const appVersion = import.meta.env.VITE_APP_VERSION;

export default defineComponent({
  name: 'Root',
  setup() {
    return {
      appVersion,
      mdiCalculatorVariant,
    };
  },
});
</script>
