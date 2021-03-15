<template>
  <div id="app">
    <Navbar class="navcontainer"></Navbar>
    <router-view />
    <br>
    <br>
    <hr class="hideonmobile">
    <!-- v-bind:messages="messages" v-on:sendMessage="this.sendMessage" ist neu wegen socket chatroom -->
    <Player v-if="auth=='loggedin'" v-bind:messages="messages" v-on:sendMessage="this.sendMessage"  />
    <Copyright />
  </div>
</template>

<script>
import router from './router'
import axios from 'axios'
import io from 'socket.io-client'
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
      socket: io('http://127.0.0.1:3000'), // neu
      messages: [] // neu, brauch ich bekomm ich ursprünglich aber nicht vom socket sondern über getComments
    }
  },
  methods: {
    // gibt den logged out status an die relevanten componenten weiter - wird gebraucht für den fall dass es beim userdata laden eines error gibt und alle relevanten componenten das leere auth objekt kriegen und somit nicht angezeigt werden und nur die login komponente angezeigt wird zu der gepusht wird
    emitLoggedOutMethod: function () {
      EventBus.$emit('logged-in', '')
    },
    emitPassUserData: function () {
      var data = this.user
      console.log(data)
      setTimeout(function () {
        console.log('emitPassUserData fired on App.vue')
        EventBus.$emit('passUserData', data)
      }, 300)
    },
    getUserData: function () {
      let self = this
      console.log(this.auth)
      axios.get('/api/user')
        .then((response) => {
          self.$set(this, 'user', response.data.user)
          console.log('API CALL FOR USER DATA')
          this.emitPassUserData()
          this.getComments() // neu weil ich beim laden des users die comments aus der datenbank ziehe, damit ich die bisherigen nachrichten krieg und nicht nur die ab wann ich einsteige
          var roomName = response.data.user.channel.radioname // neu
          this.socket.emit('join room', roomName) // neu
          this.listenForSocketEvents() // neu
        })
        .catch((errors) => {
          console.log(errors)
          self.auth = ''
          self.emitLoggedOutMethod()
          router.push('/login')
        })
    },
    // neu die gesamte funktion, weil ich ja wie oben beschrieben beim laden des users die bestehenden kommentare reinziehen will
    getComments: function () {
      let self = this
      console.log('inside getcomments in app.vue')
      axios.get('/api/getcomments')
        .then((response) => {
          self.$set(this, 'comments', response.data.comments)
          console.log(response.data.comments)
          this.messages = response.data.comments
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/login')
        })
    },
    // neu die gesamte funktion
    listenForSocketEvents: function () {
      console.log('listening for socket events')
      this.socket.on('new message', payload => {
        console.log('inside new message frontend')
        console.log(payload)
        this.messages.push(payload)
      })
    },
    // neu die gesamte funktion
    sendMessage: function (message) {
      var that = this
      console.log(this.user.username)
      var chatmessage = {
        person: that.user.username,
        message: message
      }
      this.socket.emit('send message', chatmessage)
    }
  },
  mounted () {
    console.log('App.vue mounted')
    var that = this
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
    EventBus.$on('loadUserData',
      function () {
        that.getUserData()
      })
    EventBus.$on('requestData',
      function () {
        that.emitPassUserData()
      })
    EventBus.$on('loadPlayer',
      function () {
        setTimeout(function () {
          console.log('load player emit received on App.vue')
          that.emitPassUserData()
        }, 2500)
        // console.log('load player emit received on App.vue')
        // that.reloadPage()
      })
    EventBus.$on('logged-out', status => {
      this.auth = status
      location.reload()
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
