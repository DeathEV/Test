<template>
  <q-icon
    class="q-pa-md"
    name="fa-brands fa-facebook-square"
    size="lg"
    color="primary"
  />
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
    <q-item clickable v-ripple active-class="my-menu-link">
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
      const userRole = ref('admin');
      return {
        link: ref('dashboard'),
        userRole,
      }
    }
  }
</script>
