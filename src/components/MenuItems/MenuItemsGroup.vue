<template>
  <q-expansion-item dense-toggle :label="label" :icon="icon" default-opened :content-inset-level="1">
    <q-card>
      <slot />
    </q-card>
  </q-expansion-item>
</template>

<script>
  import {defineComponent} from "vue";
  export default defineComponent({
    props: {
      label: {type: String, required: true},
      icon: String,
    },
  })
</script>
