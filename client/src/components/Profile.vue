<template>
    <div>
        <!-- help info -->
        <p @mouseover="isHovering = true"
            @mouseout="isHovering = false"
            :class="{hovering: isHovering}" class="gethelp">
            {{ isHovering ? "Skip the current song, by clicking the 'No¶' button. The song will be added to your No¶-List and therefore skipped everytime it is played on the radio. If you open the app on a desktop device, you can also select the mode here -'alternativePlaylist Mode' will make the app switch to a random track from your playlist, whenever a No¶ title is detected, 'alternativeChannel Mode' will make it switch to another channel instead. -'MainChannel' defines the channel you will be listening to. -'AlternativeChannel' defines the channel that will be switched to (if you chose 'alternativeChannel Mode'), if a No¶ title is detected on your main channel." : "Help" }}
        </p>
        <div class="hideonmobile">
            <h2 class="profileheader">Profile</h2>
            <div class="profilecontainer">
                <div>Username: {{user.username}} </div>
                <!-- Email -->
                <div>Email: {{user.email}} <button v-on:click="showeditemail = true" class="editbutton">Edit</button>
                    <div v-if="showeditemail">
                        <label>New Email</label>
                        <form v-on:submit="editEmail">
                            <input type="text" name="email" /><br>
                            <input type="submit" value="Change EMail" />
                        </form>
                    </div>
                </div>
                <!-- Mode -->
                <div>Mode: {{user.mode}} <button v-on:click="showeditmode = true" class="editbutton">Edit</button>
                    <div v-if="showeditmode">
                        <label>Select Mode</label>
                        <form class="profileform" v-on:submit="editMode">
                            <select v-model="user.mode">
                                <option v-for="vuemode in modes" :key="vuemode.id">{{vuemode}}</option>
                            </select>
                            <input type="submit" value="save" />
                        </form>
                    </div>
                </div>
                <!-- MainChannel -->
                <div>MainChannel: {{user.channel.radioname}} <button v-on:click="showeditmainchannel = true" class="editbutton">Edit</button>
                    <div v-if="showeditmainchannel">
                        <label>Search By Country</label>
                        <form class="profileform" v-on:submit="filteredChannels">
                            <select v-model="selectedcountry">
                                <option v-for="country in countrylist" :key="country.id">{{country}}</option>
                            </select>
                            <input type="submit" value="filter" />
                        </form>
                        <!--eslint-disable-next-line-->
                        <li class="radiochannelitem" v-for="(k) in filteredchannels" v-on:click="selectChannel($event, k)">
                            <a>{{ k }}</a>
                        </li>
                    </div>
                </div>
                <!-- AlternativeChannel -->
                <div>AlternativeChannel: {{user.alternativechannel.radioname}} <button v-on:click="showeditalternativechannel = true" class="editbutton">Edit</button>
                    <div v-show="showeditalternativechannel">
                        <label>Search By Country</label>
                        <form class="profileform" v-on:submit="filteredAlternativeChannels">
                            <select v-model="selectedcountryalternative">
                                <option v-for="country in countrylist" :key="country.id">{{country}}</option>
                            </select>
                            <input type="submit" value="filter" />
                        </form>
                        <!--eslint-disable-next-line-->
                        <li class="radiochannelitem" v-for="(m) in filteredalternativechannels" v-on:click="selectAlternativeChannel($event, m)">
                            <a>{{ m }}</a>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        id: '',
        username: '',
        email: '',
        password: '',
        mode: '',
        // channel: '',
        channel: {radioname: 'please select',
          radiourl: 'blabla'},
        // alternativechannel: '',
        alternativechannel: {radioname: 'please select',
          radiourl: 'blabla'},
        shmoo: ['', '']
      },
      modes: [
        'alternativeChannel',
        'alternativePlaylist'
      ],
      radiochannels: [
        {radioname: '',
          radiocountry: ''
        }
      ],
      countrylist: ['AUT', 'CZE', 'ITA', 'FRA', 'AUS'],
      isHovering: false,
      showeditemail: false,
      showeditmode: false,
      showeditmainchannel: false,
      showeditalternativechannel: false,
      selectedchannel: 'unselected',
      selectedalternativechannel: '',
      selectedcountry: '',
      selectedcountryalternative: '',
      filteredchannels: [],
      filteredalternativechannels: []
    }
  },
  methods: {
    emitLoggedInMethod: function () {
      setTimeout(function () {
        EventBus.$emit('logged-in', 'loggedin')
      }, 1000)
    },
    // greift beim laden der seite alle relevanten userdaten ab
    getUserData: function () {
      let self = this
      axios.get('/api/user')
        .then((response) => {
          self.$set(this, 'user', response.data.user)
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/login')
        })
    },
    // greift beim laden der seite die verfügbaren channels ab
    getRadioData: function () {
      // let self = this
      let that = this
      axios.get('/api/radiodata')
        .then((response) => {
          // self.$set(this, 'radiochannels', response.data.radiodata)
          that.radiochannels = response.data.radiodata
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/login')
        })
    },
    // edit Email funktion
    editEmail: (e) => {
      e.preventDefault()
      let newEmail = e.target.elements.email.value
      let changeEmail = () => {
        let data = {
          newEmail: newEmail
        }
        axios.post('/api/emailchange', data)
          .then((response) => {
            router.push('/profile')
          })
          .catch((errors) => {
            console.log('Cannot change email')
          })
      }
      changeEmail()
      setTimeout(function () {
        location.reload()
      }, 1000)
    },
    // auswahl ob channelswitch oder playlistswitch
    editMode: function () {
      console.log(this.user.mode)
      let selectedMode = this.user.mode
      let selectMode = () => {
        let data = {
          selectedMode: selectedMode
        }
        axios.post('api/modeselection', data)
          .then((response) => {
            router.push('/profile')
          }
          )
          .catch((errors) => {
            console.log('Cannot save modeselection')
          })
      }
      selectMode()
      var that = this
      setTimeout(function () {
        that.reloadPage()
      }, 1000)
    },
    filteredChannels: function () {
      this.filteredchannels = []
      var i
      for (i = 0; i < this.radiochannels.length; i++) {
        var thisradiochannel = this.radiochannels[i]
        // eslint-disable-next-line
        if (thisradiochannel.radiocountry == this.selectedcountry) {
          this.filteredchannels.push(thisradiochannel.radioname)
        }
      }
    },
    selectChannel: function (event, k) {
      this.selectedchannel = k
      this.user.channel = k
      this.changeChannel()
    },
    // user kann hier seinen kanal auswählen
    changeChannel: function () {
      let selectedChannel = this.user.channel
      let selectChannel = () => {
        let data = {
          selectedChannel: selectedChannel
        }
        axios.post('api/channelselection', data)
          .then((response) => {
            router.push('/profile')
          }
          )
          .catch((errors) => {
            console.log('Cannot save channelselection')
          })
      }
      selectChannel()
      var that = this
      setTimeout(function () {
        that.reloadPage()
      }, 1000)
    },
    filteredAlternativeChannels: function () {
      this.filteredalternativechannels = []
      var i
      for (i = 0; i < this.radiochannels.length; i++) {
        var thisalternativeradiochannel = this.radiochannels[i]
        // eslint-disable-next-line
        if (thisalternativeradiochannel.radiocountry == this.selectedcountryalternative) {
          this.filteredalternativechannels.push(thisalternativeradiochannel.radioname)
        }
      }
    },
    selectAlternativeChannel: function (event, m) {
      this.selectedalternativechannel = m
      this.user.alternativechannel = m
      this.changeAlternativeChannel()
    },
    // user kann hier seinen alternativ kanal auswählen
    changeAlternativeChannel: function () {
      let selectedAlternativeChannel = this.user.alternativechannel
      let selectChannel = () => {
        let data = {
          selectedAlternativeChannel: selectedAlternativeChannel
        }
        axios.post('api/alternativechannelselection', data)
          .then((response) => {
            router.push('/profile')
          }
          )
          .catch((errors) => {
            console.log('Cannot save channelselection')
          })
      }
      selectChannel()
      var that = this
      setTimeout(function () {
        that.reloadPage()
      }, 1000)
    },
    // wird aktiviert wenn der shmoo zuende ist und man wieder auf den ursprünglichen sender zurück will - einfach zurückschalten funktioniert nicht weil der player dort weiterspielt wo er stehengeblieben ist. nach reloadPage greifen die mounted funktionen und damit spielt auch der ursprüngliche sender wieder (von der aktuellen stelle weg)
    reloadPage: function () {
      location.reload()
    }
  },
  mounted () {
    this.getUserData()
    this.getRadioData()
    this.emitLoggedInMethod()
  }
}
</script>
<style>
    a {
        color: blue;
        text-decoration: underline
    }
    label {
        color: lightslategrey;
        margin-bottom: 0px;
    }
    .profileheader {
        margin-top: 20px;
    }
    .profilecontainer {
        padding-left: 10px;
        padding-bottom: 20px;
        text-align: left;
    }
    .profileform {
        display: inline
    }
    .gethelp {
        float: right;
        margin: 2%;
        padding: 0px;
        color: orangered;
    }
    .hovering{
      color: black
    }
    .editbutton{
      background-color: cadetblue
    }
    .radiochannelitem {
        list-style: none;
        text-align: left;
        margin-left: 3%;
        margin-right: 60%;
    }
    .radiochannelitem:hover {
        color: cadetblue;
        cursor: pointer;
    }

@media (max-width: 500px) {
  .hideonmobile {
    display: none;
  }
}

@media (min-width: 500px) {
  .hideondesktop {
    display: none;
  }
}

</style>
