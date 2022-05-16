<template>
  <nav>
    <q-header class="bg-grey-2 text-dark">
      <q-toolbar>
        <q-btn dense round flat class="q-mx-md" icon="menu" @click="onClickLeft"/>
        <q-separator vertical/>
        <q-input borderless label="Tìm kiếm" input-class="text-left" class="q-ml-md">
          <template v-slot:prepend>
            <q-icon name="search"/>
          </template>
        </q-input>
        <q-space></q-space>
        <q-separator vertical/>
        <q-btn dense round flat class="q-mx-lg" icon="far fa-bell">
          <q-badge color="green">4</q-badge>
        </q-btn>
        <q-separator vertical/>
        <q-btn dense round flat class="q-mx-md" icon="qr_code_scanner">
        </q-btn>
      </q-toolbar>
    </q-header>
  </nav>

</template>

<script>
  import {defineComponent, ref} from "vue";

  export default defineComponent({
    props: {
      onClickLeft: String,
    },
  })
</script>
