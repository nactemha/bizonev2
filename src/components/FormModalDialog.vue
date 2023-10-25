<template>
  <q-dialog v-bind="$attrs">
    <q-card class="full-width">
      <q-card-section>
        <slot name="title">
          <div class="row q-gutter-md items-center">
            <q-avatar color="blue" text-color="white" :icon="props.icon" size="md" />
            <div class="text-h6">{{ props.title }}</div>
          </div>
        </slot>
      </q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md full-width">
        <q-separator />
        <q-card-section style="max-height: 70vh;" class="full-width scroll">

          <slot>EMPTY</slot>

        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <slot name="actions">
            <q-btn flat :label="props.negative" color="error" v-close-popup @click="$emit('negative')" />
            <q-btn flat :label="props.positive" color="warning" type="submit" />
          </slot>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
    default: ""
  },
  positive: {
    type: String,
    default: ""
  },
  negative: {
    type: String,
    default: ""
  }
})
let emit = defineEmits(['positive', 'negative']);

function onSubmit() {
  console.log("emit positive");

  emit("positive")

}
function onReset() {

}
</script>


