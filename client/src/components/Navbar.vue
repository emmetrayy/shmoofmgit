<template>
  <div>
    <ul class="navul">
      <li v-if="auth=='loggedin'" v-on:click="logout" class="navlogout">
        <router-link class="navlogoutitem" to="/login">Logout</router-link>
      </li>
      <li v-if="auth==''" class="displayinline">
        <router-link class="navitem hideonmobile" to="/register">Register</router-link>
      </li>
      <li v-if="auth==''" class="displayinline">
        <router-link class="navitem" to="/login">Login</router-link>
      </li>
      <li v-if="auth=='loggedin'" class="displayinline">
        <router-link class="navitem hideonmobile" to="/profile">Profile</router-link>
      </li>
      <li v-if="auth=='loggedin'" class="displayinline">
        <router-link class="navitem hideonmobile" to="/shmoo"><img class="nopeimageinnavbar" src="../assets/nope_button2_v3_png.png">-List</router-link>
      </li>
      <li v-if="auth=='loggedin'" class="displayinline">
        <router-link class="navitem hideonmobile" to="/playlist">Playlist</router-link>
      </li>
      <li class="displayinline">
        <router-link class="navforum" to="/forum">Forum</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
import EventBus from './EventBus'

export default {
  data () {
    return {
      auth: ''
    }
  },
  methods: {
    // logged den user im backend aus und aktiviert emitLoggedOutMethod
    logout: function () {
      axios.get('/api/logout')
      this.emitLoggedOutMethod()
      this.auth = ''
      router.push('/login')
      console.log('logged out')
    },
    // gibt den logged out status an die relevanten componenten weiter
    emitLoggedOutMethod: function () {
      EventBus.$emit('logged-out', '')
    }
  },
  mounted () {
    // hört auf den logged in event bus
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  }
}

</script>

<style>
  .navul {
    list-style: none;
    border-bottom-style: solid;
    border-bottom-color: dimgrey;
  }
  .navitem {
    color: darkblue;
    text-decoration: none;
    margin-right: 12px;
  }
  .navitem:hover {
    color: aqua;
    text-decoration: none;
  }
  .navlogout {
    color: darkred;
    float: left;
  }
  .navlogoutitem {
    color: darkred;
    text-decoration: none;
  }
  .navlogoutitem:hover {
    color: red;
    text-decoration: none;
  }
  .navforum {
    color: black;
    text-decoration: none;
    margin-left: 10px;
  }
  .navforum:hover {
    color: whitesmoke;
    text-decoration: none;
  }
  .nopeimageinnavbar{
    margin-bottom: 5px;
    width: 20px;
    height: 20px;
  }

</style>
