<template>
  <q-icon
    class="q-pa-sm"
    name="fa-brands fa-facebook-square"
    size="lg"
    color="primary"
  />
  <span class="q-mx-md text-h6 text-primary">Nghề nông việt</span>
  <q-list bordered class="rounded-borders text-primary">
<!--    menu-->
    <MenuItemLayout label="DashBoard" icon="fa-solid fa-house" link="/"/>
    <MenuItemsGroup label="DashBoard" icon="fa-solid fa-house">
      <MenuItemLayout label="DashBoard" icon="fa-solid fa-house" link="/"/>
    </MenuItemsGroup>
    <q-separator spaced />
<!--    settings-->
    <MenuItemLayout label="Settings" icon="settings" :onClick="onClickRight"/>
<!--    logout-->
    <q-separator spaced />
    <q-item clickable v-ripple active-class="my-menu-link" :onclick="logout">
      <q-item-section avatar>
        <q-icon name="fa-solid fa-arrow-right-from-bracket" />
      </q-item-section>
      <q-item-section>Logout</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
  import { ref } from 'vue'
  import MenuItemLayout from "components/MenuItems/MenuItemLayout";
  import MenuItemsGroup from "components/MenuItems/MenuItemsGroup";

  export default {
    props: {onClickRight: Function},
    components: {MenuItemLayout, MenuItemsGroup},
    setup () {
      const userRole = ref('admin')

      const logout = function () {
        localStorage.removeItem('token')
        location.href = '/#/login'
        location.reload()
      }

      return {
        link: ref('dashboard'),
        userRole,
        logout
      }
    }
  }
</script>
