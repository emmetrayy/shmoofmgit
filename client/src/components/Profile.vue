<template>
    <div>
        <!-- help info -->
        <!-- help info englisch -->
        <p v-if="user.language==='English'" @mouseover="isHovering = true"
            @mouseout="isHovering = false"
            :class="{hovering: isHovering}" class="gethelp">
            {{ isHovering ? "Skip the current song, by clicking the 'No¶' button (sad music smiley). The song will be added to your No¶-List and therefore skipped everytime it is played on the radio. If you open the app on a desktop device, you can also select the mode here -'alternativePlaylist Mode' will make the app switch to a random track from your playlist, whenever a No¶ title is detected, 'alternativeChannel Mode' will make it switch to another channel instead. -'MainChannel' defines the channel you will be listening to. -'AlternativeChannel' defines the channel that will be switched to (if you chose 'alternativeChannel Mode'), if a No¶ title is detected on your main channel." : "Help" }}
        </p>
        <!-- help info deutsch -->
        <p v-if="user.language==='Deutsch'" @mouseover="isHovering = true"
            @mouseout="isHovering = false"
            :class="{hovering: isHovering}" class="gethelp">
            {{ isHovering ? "Klicke auf den 'No¶' button (trauriger Musik Smiley), wenn du das laufende Lied nicht hören willst. Damit schaltest du auf die von dir ausgewählte Alternative und das Lied wird in die No¶-List aufgenommen und somit in Zukunft immer automatisch weggeschalten. Wenn du die App am Computer laufen hast, kannst du hier auch den Modus einstellen - wenn du 'alternativePlaylist Mode' auswählst, schaltet immer wenn der Sender ein Lied aus deiner No¶-List spielt, die App auf ein zufällig ausgewähltes Lied aus deiner Playlist; wenn du 'alternativeChannel Mode' auswählst, schaltet die App stattdessen auf den von dir ausgewählten alternativ Sender. -unter 'Mein Sender' kannst du den Sender auswählen, den du hören willst. -unter 'Alternativ Sender' kannst du einen zweiten Sender auswählen, auf den die App umschalten soll (wenn du 'alternativeChannel Mode' ausgewählt hast), falls auf deinem Sender ein Titel aus deiner No¶-List gespielt wird." : "Hilfe" }}
        </p>
        <div class="hideonmobile">
            <!-- überschrift englisch -->
            <h2 v-if="user.language==='English'" class="profileheader">Profile</h2>
            <!-- überschrift deutsch -->
            <h2 v-if="user.language==='Deutsch'" class="profileheader">Profil</h2>
            <div class="profilecontainer">
                <div style="margin:8px;">Username: <div style="display:inline;font-size:25px;font-weight:bold;">{{user.username}}</div></div>
                <!-- Email -->
                <!-- Email englisch -->
                <div v-if="user.language==='English'">
                  <div><img v-on:click="showeditemail = true" class="editicon" src="../assets/edit_icon_v1_png.png">Email: {{user.email}}
                  </div>
                    <div v-if="showeditemail">
                        <label>New Email</label>
                        <form v-on:submit="editEmail">
                            <input type="text" name="email" /><br>
                            <input type="submit" value="Change Email" />
                        </form>
                    </div>
                </div>
                <!-- Email deutsch -->
                <div v-if="user.language==='Deutsch'">
                  <div><img v-on:click="showeditemail = true" class="editicon" src="../assets/edit_icon_v1_png.png">Email: {{user.email}}
                  </div>
                    <div v-if="showeditemail">
                        <label>Neue Email Adresse</label>
                        <form v-on:submit="editEmail">
                            <input type="text" name="email" /><br>
                            <input type="submit" value="Email ändern" />
                        </form>
                    </div>
                </div>
                <!-- Language -->
                <!-- Language englisch -->
                <div v-if="user.language==='English'"><img v-on:click="showeditlanguage = true" class="editicon" src="../assets/edit_icon_v1_png.png">Language: {{user.language}}
                    <div v-if="showeditlanguage">
                        <label>Select Language</label>
                        <form class="profileform" v-on:submit="editLanguage">
                            <select v-model="user.language">
                                <option v-for="mylanguage in languages" :key="mylanguage.id">{{mylanguage}}</option>
                            </select>
                            <input type="submit" value="save" />
                        </form>
                    </div>
                </div>
                <!-- Language deutsch -->
                <div v-if="user.language==='Deutsch'"><img v-on:click="showeditlanguage = true" class="editicon" src="../assets/edit_icon_v1_png.png">Sprache: {{user.language}}
                    <div v-if="showeditlanguage">
                        <label>Sprache auswählen</label>
                        <form class="profileform" v-on:submit="editLanguage">
                            <select v-model="user.language">
                                <option v-for="mylanguage in languages" :key="mylanguage.id">{{mylanguage}}</option>
                            </select>
                            <input type="submit" value="speichern" />
                        </form>
                    </div>
                </div>
                <!-- Mode -->
                <!-- Mode englisch -->
                <div v-if="user.language==='English'"><img v-on:click="showeditmode = true" class="editicon" src="../assets/edit_icon_v1_png.png">Mode: {{user.mode}}
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
                <!-- Mode deutsch -->
                <div v-if="user.language==='Deutsch'"><img v-on:click="showeditmode = true" class="editicon" src="../assets/edit_icon_v1_png.png">Modus: {{user.mode}}
                    <div v-if="showeditmode">
                        <label>Modus auswählen</label>
                        <form class="profileform" v-on:submit="editMode">
                            <select v-model="user.mode">
                                <option v-for="vuemode in modes" :key="vuemode.id">{{vuemode}}</option>
                            </select>
                            <input type="submit" value="speichern" />
                        </form>
                    </div>
                </div>
                <!-- MainChannel -->
                <!-- MainChannel englisch -->
                <div v-if="user.language==='English'"><img v-on:click="showeditmainchannel = true" class="editicon" src="../assets/edit_icon_v1_png.png">MainChannel: {{user.channel.radioname}}
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
                <!-- MainChannel deutsch -->
                <div v-if="user.language==='Deutsch'"><img v-on:click="showeditmainchannel = true" class="editicon" src="../assets/edit_icon_v1_png.png">Mein Sender: {{user.channel.radioname}}
                    <div v-if="showeditmainchannel">
                        <label>nach Ländern filtern</label>
                        <form class="profileform" v-on:submit="filteredChannels">
                            <select v-model="selectedcountry">
                                <option v-for="country in countrylist" :key="country.id">{{country}}</option>
                            </select>
                            <input type="submit" value="filtern" />
                        </form>
                        <!--eslint-disable-next-line-->
                        <li class="radiochannelitem" v-for="(k) in filteredchannels" v-on:click="selectChannel($event, k)">
                            <a>{{ k }}</a>
                        </li>
                    </div>
                </div>
                <!-- AlternativeChannel -->
                <!-- AlternativeChannel englisch -->
                <div v-if="user.language==='English'"><img v-on:click="showeditalternativechannel = true" class="editicon" src="../assets/edit_icon_v1_png.png">AlternativeChannel: {{user.alternativechannel.radioname}}
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
                <!-- AlternativeChannel deutsch -->
                <div v-if="user.language==='Deutsch'"><img v-on:click="showeditalternativechannel = true" class="editicon" src="../assets/edit_icon_v1_png.png">Alternativ Sender: {{user.alternativechannel.radioname}}
                    <div v-show="showeditalternativechannel">
                        <label>nach Ländern filtern</label>
                        <form class="profileform" v-on:submit="filteredAlternativeChannels">
                            <select v-model="selectedcountryalternative">
                                <option v-for="country in countrylist" :key="country.id">{{country}}</option>
                            </select>
                            <input type="submit" value="filtern" />
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
        language: '',
        mode: '',
        // channel: '',
        channel: {radioname: 'please select',
          radiourl: 'blabla'},
        // alternativechannel: '',
        alternativechannel: {radioname: 'please select',
          radiourl: 'blabla'},
        shmoo: ['', '']
      },
      languages: [
        'English',
        'Deutsch'
      ],
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
      showeditlanguage: false,
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
    emitRequestData: function () {
      setTimeout(function () {
        EventBus.$emit('requestData')
        console.log('emitRequestData on profile component fired')
      }, 300)
    },
    emitLoadUserDataOnOtherComponents: function () {
      EventBus.$emit('loadUserData')
    },
    emitReloadPlayerOnAppVue: function () {
      EventBus.$emit('loadPlayer')
      console.log('reload player emitted from profile')
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
      }, 300)
    },
    editLanguage: function () {
      console.log(this.user.language)
      let selectedLanguage = this.user.language
      let selectLanguage = () => {
        let data = {
          selectedLanguage: selectedLanguage
        }
        axios.post('api/languageselection', data)
          .then((response) => {
            router.push('/profile')
          }
          )
          .catch((errors) => {
            console.log('Cannot save languageselection')
          })
      }
      selectLanguage()
      setTimeout(function () {
        location.reload()
      }, 300)
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
      setTimeout(function () {
        location.reload()
      }, 300)
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
    console.log('profile mounted')
    var that = this
    this.getRadioData()
    this.emitLoggedInMethod()
    this.emitRequestData()
    EventBus.$on('passUserData', (data) => {
      that.user = data
    })
    window.addEventListener('load', function () {
      that.emitLoadUserDataOnOtherComponents()
      that.emitRequestData()
      that.emitReloadPlayerOnAppVue()
    })
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
      background-color: gainsboro;
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
    .editicon{
      width: 40px;
      height: 40px;
    }
  .editicon:hover{
      cursor: pointer;
    }
  .showeditdiv{
      display: inline;
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
