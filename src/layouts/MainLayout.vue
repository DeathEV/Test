<template>
  <q-layout view="lHr lpR fFf" v-if="isCheck">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <TopHeaderLayout :on-click-left="toggleLeftDrawer"/>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <LeftLayout/>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import LeftLayout from "layouts/LeftLayout";
  import {useRouter} from "vue-router"
  import TopHeaderLayout from "layouts/TopHeaderLayout";

  export default {
    components: {TopHeaderLayout, LeftLayout},
    setup () {
      const leftDrawerOpen = ref(false)
      const rightDrawerOpen = ref(false)
      const isCheck = ref(false)
      const tokenLogin = localStorage.getItem('token')

      const router = useRouter();

      const checkToken = async function(token){
        isCheck.value = true
      }

      const goLogin = function(){
        router.push({ path: '/login' })
      }

      onMounted(() => {
          if(tokenLogin){
            checkToken()
          } else {
            goLogin()
          }
      })

      return {
        isCheck,

        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        },

        rightDrawerOpen,
        toggleRightDrawer () {
          rightDrawerOpen.value = !rightDrawerOpen.value
        }
      }
    }
  }
</script>
