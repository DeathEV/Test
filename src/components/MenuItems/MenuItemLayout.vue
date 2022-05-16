<template>
  <q-item clickable v-ripple active-class="my-menu-link" :to="link">
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>{{label}}</q-item-section>
  </q-item>
</template>

<script>
  import {defineComponent} from "vue";
  export default defineComponent({
    props: {
      label: {type: String, required: true},
      link: {type: String, required: true},
      icon: String,
    },
  })
</script>

