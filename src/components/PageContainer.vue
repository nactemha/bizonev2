<template>
  <div class="card-margin">
    <q-layout view="lHh lpr lFf" container style="height: 780px; margin-top: 10px;" class=" rounded-borders">
      <q-header bordered class="bg-grey-3 text-primary">
        <q-toolbar>
          <q-toolbar-title class="text-center">

            <q-avatar>
              <slot name="icon"> </slot>
            </q-avatar>

            {{ $props.title }}
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="card-margin">
          <slot></slot>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({

  title: {
    type: String,
    default: ""
  }
})
</script>
