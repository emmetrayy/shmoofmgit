<template>
  <div>
    <h2>Register</h2>
    <form v-on:submit="register">
      <input class="inputfield" type="text" name="username" placeholder="username" />
      <br>
      <input class="inputfield" type="text" name="email" placeholder="email" />
      <br>
      <input class="inputfield" type="text" name="password" placeholder="password" />
      <br>
      <input class="submitbutton" type="submit" value="Register" />
    </form>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'

export default {
  name: 'Register',
  methods: {
    register: (e) => {
      e.preventDefault()
      let username = e.target.elements.username.value
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value
      let register = () => {
        let data = {
          username: username,
          email: email,
          password: password
        }
        axios.post('/api/register', data)
          .then((response) => {
            console.log('Registered')
            router.push('/login')
          })
          .catch((errors) => {
            console.log('Cannot register')
          })
      }
      register()
    }
  }
}
</script>
<style>
</style>
