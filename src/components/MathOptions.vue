<script lang="ts">
import { defineComponent, ref } from 'vue';

import { Operand } from '../contracts/math';

const operations = [
  {
    value: Operand.MULTIPLY,
    label: 'Multiplicação',
  },
  {
    value: Operand.SUM,
    label: 'Soma',
  },
];

export default defineComponent({
  name: 'MathOptions',
  props: {
    modelValue: Boolean,
  },
  emits: ['save'],
  setup(props, ctx) {
    const operation = ref(Operand.SUM);

    const save = () => {
      ctx.emit('save', { operation: operation.value });
    };

    return {
      operations,
      operation,
      save,
    };
  },
});
</script>

<template>
  <q-dialog :model-value="modelValue" v-bind="$attrs" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <div>
          <h2 class="text-h5">Operações matemáticas</h2>
          <q-separator inset />
          <q-option-group
            :options="operations"
            type="radio"
            v-model="operation"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn
          flat
          label="Salvar"
          @click="save"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
