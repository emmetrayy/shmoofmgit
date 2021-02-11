<template>
  <div id="app">
    <Navbar class="navcontainer"></Navbar>
    <router-view :userdataprop="user"/>
    <br>
    <br>
    <hr class="hideonmobile">
    <Player v-if="auth=='loggedin'" />
    <Copyright />
    <div>test {{auth}} test</div> <!--nur zum testen, kann man löschen ohne was anderes dadurch zu gefährden-->
  </div>
</template>

<script>
import router from './router'
import axios from 'axios'
import EventBus from './components/EventBus'
import Navbar from '@/components/Navbar'
import Player from '@/components/Player'
import Copyright from '@/components/Copyright'

export default {
  name: 'App',
  components: {
    'Navbar': Navbar,
    Player,
    Copyright
  },
  data () {
    return {
      auth: '',
      user: {},
      userdataprop: ''
    }
  },
  methods: {
    // gibt den logged out status an die relevanten componenten weiter - wird gebraucht für den fall dass es beim userdata laden eines error gibt und alle relevanten componenten das leere auth objekt kriegen und somit nicht angezeigt werden und nur die login komponente angezeigt wird zu der gepusht wird
    emitLoggedOutMethod: function () {
      EventBus.$emit('logged-in', '')
    },
    getUserData: function () {
      let self = this
      console.log(this.auth)
      axios.get('/api/user')
        .then((response) => {
          self.$set(this, 'user', response.data.user)
        })
        .catch((errors) => {
          console.log(errors)
          self.auth = ''
          self.emitLoggedOutMethod()
          router.push('/login')
        })
    }
  },
  mounted () {
    var that = this
    this.getUserData()
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
    EventBus.$on('loadUserData',
      function () {
        that.getUserData()
      })
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  min-height: 100%;
  background-color: gainsboro;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin: 0px;
}
.navcontainer {
    background-color: cadetblue;
    font-size: 20px;
    text-align: right;
    padding-right: 10px;
}
hr {
    margin: 10px;
    border-color: black;
}

@media (max-width: 500px) {
    .hideonmobile {
        display: none;
    }
}
</style>
