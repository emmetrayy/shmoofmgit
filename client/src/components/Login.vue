<template>
  <div>
    <h2>Login</h2>
    <form v-on:submit="login">
      <input class="inputfield" v-model="userName" type="text" name="username" placeholder="username" /><br>
      <input class="inputfield" v-model="passWord" type="text" name="password" placeholder="password" /><br>
      <input class="submitbutton" type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
import EventBus from './EventBus'

export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      passWord: ''
    }
  },
  methods: {
    // gibt den logged in status an die relevanten componenten weiter
    emitLoggedInMethod: function () {
      EventBus.$emit('logged-in', 'loggedin')
    },
    // nach dem login muss er die userdaten in App.vue reinladen
    emitLoadUserDataOnOtherComponents: function () {
      EventBus.$emit('loadUserData')
    },
    // logged den user im backend ein und aktiviert emitLoggedInMethod
    login (e) {
      e.preventDefault()
      let username = this.userName
      let password = this.passWord
      let login = () => {
        let data = {
          username: username,
          password: password
        }
        axios.post('/api/login', data)
          .then((response) => {
            this.emitLoggedInMethod()
            this.emitLoadUserDataOnOtherComponents()
            console.log('Logged in')
            router.push('/profile')
          })
          .catch((errors) => {
            console.log('Cannot log in')
            console.log(errors)
          })
      }
      login()
    }
  }
}
</script>
<style>
  .inputfield {
    border-color: black;
    border-radius: 5px;
  }
  .submitbutton{
    border-radius: 10px;
    background-color: cadetblue;
  }
  .submitbutton:hover {
    cursor: pointer;
    color: lightgrey;
    border-color: lightgrey;
    background-color: lightseagreen;
  }
</style>
