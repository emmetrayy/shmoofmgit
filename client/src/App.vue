<template>
  <div id="app">
    <Navbar class="navcontainer"></Navbar>
    <router-view />
    <br>
    <br>
    <hr class="hideonmobile">
    <!-- v-bind:messages="messages" v-on:sendMessage="this.sendMessage" ist neu wegen socket chatroom -->
    <Player v-if="auth=='loggedin'" v-bind:messages="messages" v-on:sendMessage="this.sendMessage"  />
    <!-- socket chat -->
    <div class="header">
			<h1>Chatroom</h1>
			<p class="username">Username: {{ chatusername }}</p>
			<p class="online">Online: {{ chatusers.length }}</p>
		</div>
    <!-- bis hier -->
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
      socket: io('http://127.0.0.1:3000'),
      chatusername: "", // kopiert aus socket chatroom git
      messages: [], // kopiert aus socket chatroom git
			chatusers: [] // kopiert aus socket chatroom git
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
        this.chatusername = this.user.username
        this.socket.emit('testa', this.chatusername);
        this.joinServer();
        })
        .catch((errors) => {
          console.log(errors)
          self.auth = ''
          self.emitLoggedOutMethod()
          router.push('/login')
        })
    },
    // die restlichen 3 methods sind kopiert aus socket chatroom git
    joinServer: function () {
      console.log('joinserver function')
			this.socket.on('loggedIn', data => {
				this.messages = data.messages;
				this.chatusers = data.chatusers;
				this.socket.emit('newuser', this.chatusername);
			});
			this.listen();
		},
		listen: function () {
			this.socket.on('userOnline', chatuser => {
				this.chatusers.push(chatuser);
			});
			this.socket.on('userLeft', chatuser => {
				this.chatusers.splice(this.chatusers.indexOf(chatuser), 1);
			});
			this.socket.on('msg', message => {
				this.messages.push(message);
			});
		},
		sendMessage: function (message) {
			this.socket.emit('msg', message);
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
    /*
    // kopiert aus socket chatroom git
    this.chatusername = prompt("What is your username?", "Anonymous");
		if (!this.chatusername) {
			this.chatusername = "Anonymous";
		}
    */
		//this.joinServer();
    // bis hierher
    
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
