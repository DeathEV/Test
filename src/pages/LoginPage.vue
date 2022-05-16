<template>
  <img src="~assets/wave.png" class="wave" alt="login-wave">
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 flex justify-center content-center">
      <img src="~assets/login.svg" class="responsive" alt="login-image">
    </div>
    <div v-bind:class="{'justify-center': $q.screen.md || $q.screen.sm ||$q.screen.xs}"
         class="col-12 col-md-6 flex content-center">
      <q-card v-bind:style="$q.screen.lt.sm ? {'width': '90%'} : {'width': '60%'}">
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="~assets/avatar.svg" alt="avatar">
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">Đăng nhập</h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md" @submit.prevent="login">
            <q-input label="Email" v-model="email"></q-input>
            <q-input label="Mật khẩu" v-model="password" type="password"></q-input>
            <div>
              <q-btn class="full-width" color="primary" label="Đăng nhập" type="submit" rounded/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
  import {ref} from "vue"
  import {useRouter} from "vue-router"
  import userApi from "src/Api/userApi"
  import { useQuasar } from 'quasar'

  export default {
    setup(){
      const $q = useQuasar()
      const email = ref('')
      const password = ref('')

      const router = useRouter()

      function validatePassword(password) {
        const re =
          /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$#%]).*$/i;
        return re.test(String(password));
      }
      function validateEmail(courierEmail) {
        const re = /^([a-zA-Z0-9!#$%&',*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&',*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/;
        return re.test(String(courierEmail).toLowerCase());
      }

      const validate = function () {
        let isValid = true
        if (!email.value || !email.value.toString().trim() || !validateEmail(email.value)) {
          isValid = false;
          $q.notify({icon:'warning', message: 'Email không hợp lệ.', color: 'red', position: 'top-right',})
        }
        // if (!validatePassword(password.value)) {
        //   isValid = false
        //   $q.notify({icon:'warning', message: 'Mật khẩu không hợp lệ (VD:Abcd@123).', color: 'red', position: 'top-right',})
        // }
        return isValid
      }

      const login = async function(){
        if (!validate()) {
          return;
        }
        try {
          const query = {
            'email': email.value,
            'password': password.value
          }
          const userData = await userApi.userLogin(query)
          localStorage.setItem('token', userData.user.token)
          router.push({ path: '/' })
        } catch (e) {
          $q.notify({icon:'warning', message: 'Đăng nhập thất bại.', color: 'red', position: 'top-right',})
        }
      }

      return {
        email,
        password,
        login
      }
    }
  }
</script>
<style scoped>
  .wave {
    position: fixed;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
</style>
