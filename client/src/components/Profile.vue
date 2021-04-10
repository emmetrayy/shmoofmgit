<template>
<div>
  <!-- help info englisch -->
  <p class="gethelp" v-if="user.language!=='Deutsch'" @mouseover="helpHovered = true"
        @mouseout="helpHovered = false">Help</p>
  <div v-if="helpHovered===true" class="helptext">
    <br>
    <div>Skip the current song, by clicking the <img class="nopeintext" src="../assets/nope_button2_v3_png.png">-button (sad music smiley). The song will be added to your <img class="nopeintext" src="../assets/nope_button2_v3_png.png">-List and therefore skipped everytime it is played on the radio. If you open the app on a desktop device, you can also select the mode here -'alternativePlaylist Mode' will make the app switch to a random track from your playlist, whenever a <img class="nopeintext" src="../assets/nope_button2_v3_png.png"> title is detected, 'alternativeChannel Mode' will make it switch to another channel instead. -'MainChannel' defines the channel you will be listening to. -'AlternativeChannel' defines the channel that will be switched to (if you chose 'alternativeChannel Mode'), if a <img class="nopeintext" src="../assets/nope_button2_v3_png.png"> title is detected on your main channel.</div>
  </div>
  <!-- help info deutsch -->
  <p class="gethelp" v-if="user.language==='Deutsch'" @mouseover="hilfeHovered = true"
        @mouseout="hilfeHovered = false">Hilfe</p>
  <div v-if="hilfeHovered===true" class="helptext">
    <br>
    <div>Klicke auf den <img class="nopeintext" src="../assets/nope_button2_v3_png.png">-button, wenn du das laufende Lied nicht hören willst. Damit schaltest du auf die von dir ausgewählte Alternative und das Lied wird in die <img class="nopeintext" src="../assets/nope_button2_v3_png.png">-List aufgenommen und somit in Zukunft immer automatisch weggeschalten. Wenn du die App am Computer laufen hast, kannst du hier auch den Modus einstellen - wenn du 'alternativePlaylist Mode' auswählst, schaltet immer wenn der Sender ein Lied aus deiner <img class="nopeintext" src="../assets/nope_button2_v3_png.png">-List spielt, die App auf ein zufällig ausgewähltes Lied aus deiner Playlist; wenn du 'alternativeChannel Mode' auswählst, schaltet die App stattdessen auf den von dir ausgewählten alternativ Sender. -unter 'Mein Sender' kannst du den Sender auswählen, den du hören willst. -unter 'Alternativ Sender' kannst du einen zweiten Sender auswählen, auf den die App umschalten soll (wenn du 'alternativeChannel Mode' ausgewählt hast), falls auf deinem Sender ein Titel aus deiner <img class="nopeintext" src="../assets/nope_button2_v3_png.png">-List gespielt wird.</div>
  </div>
  <div class="hideonmobile">
    <!-- überschrift englisch -->
    <h2 v-if="user.language!=='Deutsch'" class="headermargintop">Profile</h2>
    <!-- überschrift deutsch -->
    <h2 v-if="user.language==='Deutsch'" class="headermargintop">Profil</h2>
    <div class="profilecontainer">
      <div style="margin:8px;">Username: <div style="display:inline;font-size:25px;font-weight:bold;">{{user.username}}</div></div>
      <!-- Email englisch -->
      <div v-if="user.language!=='Deutsch'">
        <div><img v-on:click="showeditemail = true" class="editicon" src="../assets/edit_icon_v1_png.png">Email: {{user.email}}
        </div>
        <div v-if="showeditemail">
          <label>New Email</label>
          <form v-on:submit="editEmail">
            <input class="inputfield" type="text" name="email" /><br>
            <input class="profileeditbutton" type="submit" value="change email" />
            <button class="profileeditbutton" v-on:click="showeditemail = false">undo</button>
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
              <input class="inputfield" type="text" name="email" /><br>
              <input class="profileeditbutton" type="submit" value="Email ändern" />
              <button class="profileeditbutton" v-on:click="showeditemail = false">zurück</button>
            </form>
          </div>
      </div>
      <!-- Language englisch -->
      <div v-if="user.language!=='Deutsch'"><img v-on:click="showeditlanguage = true" class="editicon" src="../assets/edit_icon_v1_png.png">Language: {{user.language}}
        <div v-if="showeditlanguage">
          <label>Select Language</label>
          <form class="displayinline" v-on:submit="editLanguage">
            <select class="profileeditother" v-model="user.language" v-on:change="editLanguage">
              <option v-for="mylanguage in languages" :key="mylanguage.id">{{mylanguage}}</option>
            </select>
            <button class="profileeditbutton" v-on:click="showeditlanguage = false">undo</button>
          </form>
        </div>
      </div>
      <!-- Language deutsch -->
      <div v-if="user.language==='Deutsch'"><img v-on:click="showeditlanguage = true" class="editicon" src="../assets/edit_icon_v1_png.png">Sprache: {{user.language}}
        <div v-if="showeditlanguage">
          <label>Sprache auswählen</label>
          <form class="displayinline">
            <select class="profileeditother" v-model="user.language" v-on:change="editLanguage">
              <option v-for="mylanguage in languages" :key="mylanguage.id">{{mylanguage}}</option>
            </select>
            <button class="profileeditbutton" v-on:click="showeditlanguage = false">zurück</button>
          </form>
        </div>
      </div>
      <!-- Mode englisch -->
      <div v-if="user.language!=='Deutsch'"><img v-on:click="showeditmode = true" class="editicon" src="../assets/edit_icon_v1_png.png">Mode: {{user.mode}}
        <div v-if="showeditmode">
          <label>Select Mode</label>
          <form class="displayinline">
            <select class="profileeditother" v-model="user.mode" v-on:change="editMode">
              <option v-for="vuemode in modes" :key="vuemode.id">{{vuemode}}</option>
            </select>
            <button class="profileeditbutton" v-on:click="showeditmode = false">undo</button>
          </form>
        </div>
      </div>
      <!-- Mode deutsch -->
      <div v-if="user.language==='Deutsch'"><img v-on:click="showeditmode = true" class="editicon" src="../assets/edit_icon_v1_png.png">Modus: {{user.mode}}
        <div v-if="showeditmode">
          <label>Modus auswählen</label>
          <form class="displayinline">
            <select class="profileeditother" v-model="user.mode" v-on:change="editMode">
              <option v-for="vuemode in modes" :key="vuemode.id">{{vuemode}}</option>
            </select>
            <button class="profileeditbutton" v-on:click="showeditmode = false">zurück</button>
          </form>
        </div>
      </div>
      <!-- MainChannel englisch -->
      <div v-if="user.language!=='Deutsch'"><img v-on:click="showeditmainchannel = true" class="editicon" src="../assets/edit_icon_v1_png.png">MainChannel: {{user.channel.radioname}}
        <div class="veryalerting" v-if="noChannelSelected===true">Select A Channel!</div>
        <div v-if="showeditmainchannel">
          <label>Search By Country</label>
          <form class="displayinline">
            <select class="profileeditother" v-model="selectedcountry" v-on:change="filteredChannels">
              <option value="" disabled selected>select</option>
              <option v-for="country in countrylist" :key="country.id">{{country}}</option>
            </select>
            <button class="profileeditbutton" v-on:click="showeditmainchannel = false">undo</button>
          </form>
          <!--eslint-disable-next-line-->
          <li class="radiochannelitem" v-for="(k) in filteredchannels" v-on:click="selectChannel($event, k)">
            <a>{{ k }}</a>
          </li>
        </div>
      </div>
      <!-- MainChannel deutsch -->
      <div v-if="user.language==='Deutsch'"><img v-on:click="showeditmainchannel = true" class="editicon" src="../assets/edit_icon_v1_png.png">Mein Sender: {{user.channel.radioname}}
        <div class="veryalerting" v-if="noChannelSelected===true">Wähle einen Sender aus!</div>
        <div v-if="showeditmainchannel">
          <label>nach Ländern filtern</label>
          <form class="displayinline">
            <select class="profileeditother" v-model="selectedcountry" v-on:change="filteredChannels">
              <option value="" disabled selected>auswählen</option>
              <option v-for="country in countrylist" :key="country.id">{{country}}</option>
            </select>
            <button class="profileeditbutton" v-on:click="showeditmainchannel = false">zurück</button>
          </form>
          <!--eslint-disable-next-line-->
          <li class="radiochannelitem" v-for="(k) in filteredchannels" v-on:click="selectChannel($event, k)">
            <a>{{ k }}</a>
          </li>
        </div>
      </div>
      <!-- AlternativeChannel englisch -->
      <div v-if="user.language!=='Deutsch'"><img v-on:click="showeditalternativechannel = true" class="editicon" src="../assets/edit_icon_v1_png.png">AlternativeChannel: {{user.alternativechannel.radioname}}
        <div class="veryalerting" v-if="noAlternativeChannelSelected===true">Select An AlternativeChannel!</div>
        <div class="veryalerting" v-if="bothChannelsEqual===true">MainChannel and AlternativeChannel cannot be the same!</div>
        <div v-show="showeditalternativechannel">
          <label>Search By Country</label>
          <form class="displayinline">
            <select class="profileeditother" v-model="selectedcountryalternative" v-on:change="filteredAlternativeChannels">
              <option value="" disabled selected>select</option>
              <option v-for="country in countrylist" :key="country.id">{{country}}</option>
            </select>
            <button class="profileeditbutton" v-on:click="showeditalternativechannel = false">undo</button>
          </form>
          <!--eslint-disable-next-line-->
          <li class="radiochannelitem" v-for="(m) in filteredalternativechannels" v-on:click="selectAlternativeChannel($event, m)">
            <a>{{ m }}</a>
          </li>
        </div>
      </div>
      <!-- AlternativeChannel deutsch -->
      <div v-if="user.language==='Deutsch'"><img v-on:click="showeditalternativechannel = true" class="editicon" src="../assets/edit_icon_v1_png.png">Alternativ Sender: {{user.alternativechannel.radioname}}
        <div class="veryalerting" v-if="noAlternativeChannelSelected===true">Wähle einen Alternativ Sender aus!</div>
        <div class="veryalerting" v-if="bothChannelsEqual===true">Mein Sender und Alternativ Sender müssen unterschiedlich sein!</div>
        <div v-show="showeditalternativechannel">
          <label>nach Ländern filtern</label>
          <form class="displayinline">
            <select class="profileeditother" v-model="selectedcountryalternative" v-on:change="filteredAlternativeChannels">
              <option value="" disabled selected>auswählen</option>
              <option v-for="country in countrylist" :key="country.id">{{country}}</option>
            </select>
            <button class="profileeditbutton" v-on:click="showeditalternativechannel = false">zurück</button>
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
      helpHovered: false,
      hilfeHovered: false,
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
      filteredalternativechannels: [],
      noChannelSelected: false,
      noAlternativeChannelSelected: false,
      bothChannelsEqual: false
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
    
    // neu
    alertCheck: function () {
      console.log('inside alertcheck')
      var that = this
      setTimeout(function () {
        that.selectChannelAlert()
        that.selectAlternativeChannelAlert()
        that.primaryEqualsAlternativeAlert()
      }, 5000)
    },
    // neu
    // alert wenn channel noch nicht ausgewählt ist
    selectChannelAlert: function () {
      console.log('inside selectChannelAlert')
      // eslint-disable-next-line
      if (this.user.channel.radioname == 'unselected') {
        this.noChannelSelected = true
      }
    },
    // neu
    // alert wenn alternativ channel noch nicht ausgewählt ist
    selectAlternativeChannelAlert: function () {
      // eslint-disable-next-line
      if (this.user.alternativechannel.radioname == 'unselected') {
        this.noAlternativeChannelSelected = true
      }
    },
    // neu
    // alert falls channel und alternative channel gleich sind
    primaryEqualsAlternativeAlert: function () {
      // eslint-disable-next-line
      if (this.user.channel.radioname == this.user.alternativechannel.radioname) {
        this.bothChannelsEqual = true
      }
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
    this.alertCheck() // neu
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
  label {
    color: lightslategrey;
    margin-bottom: 0px;
  }
  .profilecontainer {
    background-color: gainsboro;
    padding-left: 10px;
    padding-bottom: 20px;
    text-align: left;
  }
  .editicon{
    width: 40px;
    height: 40px;
  }
  .editicon:hover{
    cursor: pointer;
  }
  .profileeditbutton{
    border-radius: 5px;
    border-style: solid;
    border-color: black;
    background-color: cadetblue;
    color: whitesmoke;
  }
  .profileeditother{
    border-radius: 5px;
    border-style: solid;
    border-color: black;
    background-color: slategray;
    color: whitesmoke;
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
  .veryalerting{
    font-size: 48px;
    color: red;
    text-align: center;
  }

</style>
