<template>
  <div id="app">
    <Navbar class="navcontainer"></Navbar>
    <router-view/>
    <br>
    <br>
    <hr class="hideonmobile">
    <Player v-if="auth=='loggedin'" />
    <Copyright />
    <div>test {{auth}} test</div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Player from '@/components/Player'
import Copyright from '@/components/Copyright'
import EventBus from './components/EventBus'

export default {
  name: 'App',
  components: {
    'Navbar': Navbar,
    Player,
    Copyright
  },
  data () {
    return {
      auth: ''
    }
  },
  methods: {
    getUserData: function () {
      let self = this
      axios.get('/api/user')
        .then((response) => {
          self.$set(this, 'user', response.data.user)
        })
        .catch((errors) => {
          console.log(errors)
          self.auth = ''
          router.push('/login')
        })
    }
  },
  mounted () {
    this.getUserData()
    EventBus.$on('logged-in', status => {
      this.auth = status
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
