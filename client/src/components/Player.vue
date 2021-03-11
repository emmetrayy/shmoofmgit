<template>
    <div class="playercomponentcontainer">
        <!-- Playerbuttons -->
        <button class="playbutton" v-on:click="playFunction">Play ></button>
        <button class="mutebutton" v-on:click="muteFunction">Mute</button>
        <button class="unmutebutton" v-on:click="unmuteFunction">Unmute</button>
        <br class="hideonmobile">
        <br>
        <!-- No¶ Button -->
        <button class="lolbutton" v-on:click="lolFunction" id="LolButton">No¶</button>
        <!-- currentsong info output und etliche linebreaks -->
        <div>
            <br>
            <br class="hideondesktop">
            <br class="hideondesktop">
            <br class="hideondesktop">
            <br class="hideondesktop">
            <br class="hideondesktop">
            <div class="nowplayingdiv">Now playing on Main Channel:</div>
            <br>
            <div class="nowplayingtitle">{{ currentsong }}</div>
            <br>
            <br>
            <div class="nowplayingdiv">{{ user.channel.radioname }}</div>
            <br>
            <br>
        </div>
        <!-- comments section und ein paar linebreaks -->
        <div>
            <button v-if="showcommentsection === false" v-on:click="showcommentsection = true" class="editbutton">Show Comments</button>
            <button v-if="showcommentsection" v-on:click="showcommentsection = false" class="editbutton">Hide Comments</button>
            <div v-if="showcommentsection">
                <br>
              <!--
                <form v-on:submit="postComment">
                    <input class="commentfield" id="newcomment" type="text" v-model="yourcomment" placeholder="write a comment" >
                    <br>
                    <input type="submit" value="Send Comment" />
                </form>
                <ul class="commentsoutputbox">
                    <li class="commentitem" v-for="comment in comments" :key="comment.id">
                        <a>{ { comment } }</a>
                    </li>
                </ul>
-->
              <!-- socket chat -->
              <div>
                <div class="chatwindow">
                  <div class="message" v-for="message in messages" v-bind:key="message._id">
                    <div class="chat">
                      <div class="chatuser">{{message.person}}:</div> 
                      <div class="chatmessage"> {{message.message}}</div>
                    </div>
                  </div>
                </div>
                <form class="input-container" v-on:submit="sendMessage">
                  <input type="text" v-model="msg">
                  <button v-on:click="sendMessage" v-bind:disabled="!msg">Send</button>
                </form>
              </div>
              <!-- bis hier -->
            </div>
            <br>
            <br>
            <br>
            <br>
        </div>
        <!-- Primary Radio Player -->
        <div class="hide"><p>Primary Radio Stream ( {{ user.channel.radioname }} )</p>
            <audio width="300" height="48" controls="controls" id="primaryradiostream">type="audio/mpeg"/>Your browser does not support HTML5 audio. Please update your browser to view this media content.</audio>
        </div>
        <!-- Alternative Radio Player -->
        <div class="hide"><p>Alternative Radio Stream ( {{ user.alternativechannel.radioname }} )</p>
            <audio width="300" height="48" controls="controls" id="alternativeradiostream">type="audio/mpeg"/>Your browser does not support HTML5 audio. Please update your browser to view this media content.</audio>
        </div>
        <!-- Playlist Player -->
        <div class="hide"><p>Playlist Player</p>
            <audio id="playliststream" tabindex="0" controls="" type="audio/mpeg">
            </audio>
        </div>
        <br>
        <br>
    </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
import EventBus from './EventBus'

export default {
  name: 'Player',
  props: ['messages'], // kopiert aus socket chatroom git
  data () {
    return {
      user: {
        id: '',
        username: '',
        email: '',
        password: '',
        mode: '',
        // channel: 'unselected',
        channel: {radioname: 'unselected', radiourl: ''},
        // alternativechannel: 'unselected',
        alternativechannel: {radioname: 'unselected', radiourl: ''},
        shmoo: ['', ''],
        // playlist: [],
        privateplaylist: []
      },
      currentsong: 'not found',
      currentupdate: 0,
      lastupdate: 0,
      securecontent: [],
      showcommentsection: false,
      comments: ['blabla', 'bam oida'],
      //yourcomment: '',
      checked: false,
      msg: "" // kopiert aus socket chatroom git
    }
  },
  methods: {
    emitRequestData: function () {
      setTimeout(function () {
        EventBus.$emit('requestData')
        console.log('emitRequestData on shmoo component fired')
      }, 300)
    },
    // wenn ein lied geshmooed wird, aktiviert diese funktion die userdata funktion in der shmoo component damit dort der shmoo gleich aktualisiert wird
    emitLoadUserDataOnOtherComponents: function () {
      EventBus.$emit('loadUserData')
    },
    // wird von update() aktiviert und greift alle x sekunden die meta daten für now playing von shoutcast ab
    getNowPlayingMetaDataDirectlyFromFrontend: async function () {
      var userchannelname = this.user.channel.radioname
      var userchannelurl = this.user.channel.nowplayingurl
      try {
        const response = await axios.get(userchannelurl)
        // eslint-disable-next-line
        if (userchannelname == '88.6') {
          this.currentsong = response.data.data[3].title + ' - ' + response.data.data[3].name
        // eslint-disable-next-line
        } else if (userchannelname == 'Rockovyradio (CZE)') {
          this.currentsong = response.data.current.song + ' - ' + response.data.current.interpret
        // eslint-disable-next-line
        } else if (userchannelname == 'Triple J (AUS)') {
          this.currentsong = response.data.now.recording.title + ' - ' + response.data.now.recording.artists[0].name
        // eslint-disable-next-line
        } else if (userchannelname == 'TSF Jazz (FRA)') {
          this.currentsong = response.data.title + ' - ' + response.data.artist
        // eslint-disable-next-line
        } else if (userchannelname == 'Radio2.0 Bergamo (ITA)') {
          this.currentsong = response.data
        // eslint-disable-next-line
        } else if (userchannelname == 'Ö3') {
          this.currentsong = response.data[0].items[20].title + ' - ' + response.data[0].items[20].interpreter
        // eslint-disable-next-line
        } else if (userchannelname == 'Radio Wien') {
          this.currentsong = response.data[0].items[12].title + ' - ' + response.data[0].items[12].interpreter
        } else {
          this.currentsong = 'nixe dada'
        }
      } catch (error) {
        console.log(error)
      }
    },
    getSecureContent: function () {
      let self = this
      axios.get('/api/securecontent')
        .then((response) => {
          self.$set(this, 'securecontent', response.data.secureContent)
          this.securecontent = response.data.secureContent
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/login')
        })
    },
    getComments: function () {
      let self = this
      axios.get('/api/getcomments')
        .then((response) => {
          self.$set(this, 'comments', response.data.comments)
          this.comments = response.data.comments
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/login')
        })
    },
    /*
    postComment: function () {
      let channelToComment = this.user.channel.radioname
      let userWhoComments = this.user.username
      let newComment = this.yourcomment
      let sendComment = () => {
        let data = {channelToComment: channelToComment, userWhoComments: userWhoComments, newComment: newComment}
        axios.post('api/postcomment', data)
          .then((response) => {
            console.log('comment posted')
          }
          )
          .catch((errors) => {
            console.log('Cannot post comment')
          })
      }
      sendComment()
      this.yourcomment = ''
    },
    */
    // setzt beim mount gleich die source für den primary channel, damit mans nicht später alle 7 sekunden hat, was eine jeweils kurze unterbrechung des streams bedeuten würde
    setPrimaryChannelSRC: function () {
      var that = this
      setTimeout(function () {
        var primaryChannel = document.getElementById('primaryradiostream')
        primaryChannel.src = that.user.channel.radiourl
      }, 2000)
    },
    // setzt beim mount gleich die source für den alternative channel, damit mans nicht später alle 7 sekunden hat, was eine jeweils kurze unterbrechung des streams bedeuten würde
    setAlternativeChannelSRC: function () {
      var that = this
      setTimeout(function () {
        var alternativeChannel = document.getElementById('alternativeradiostream')
        alternativeChannel.src = that.user.alternativechannel.radiourl
      }, 2000)
    },
    // startet den player beim öffnen der seite
    playFunction: function () {
      var primaryStream = document.getElementById('primaryradiostream')
      let startPlay = () => {
        primaryStream.play()
      }
      startPlay()
    },
    muteFunction: function () {
      var primaryStream = document.getElementById('primaryradiostream')
      var alternativeStream = document.getElementById('alternativeradiostream')
      var playlistStream = document.getElementById('playliststream')
      let muteAll = () => {
        primaryStream.volume = 0
        alternativeStream.volume = 0
        playlistStream.volume = 0
      }
      muteAll()
    },
    unmuteFunction: function () {
      var primaryStream = document.getElementById('primaryradiostream')
      var alternativeStream = document.getElementById('alternativeradiostream')
      var playlistStream = document.getElementById('playliststream')
      let unmuteAll = () => {
        primaryStream.volume = 1
        alternativeStream.volume = 1
        playlistStream.volume = 1
      }
      unmuteAll()
    },
    // wird von update() aktiviert und checkt alle x sekunden ob im alten update ein shmoo ist der im aktuellen update nicht mehr ist. würde bedeuten dass der shmoo vorbei ist und man wieder zurückschalten kann. deshalb refresh und man startet wieder mit 'seinem' kanal.
    updateCheck: function () {
      var that = this
      if (this.currentupdate < this.lastupdate) {
        // eslint-disable-next-line
        if (that.user.mode == 'alternativeChannel') {
          this.reloadPage()
        } else {
          console.log('alternativePlaylistMode: no switch now')
        }
      }
    },
    playerEndedCheck: function () {
      var that = this
      var playlistStream = document.getElementById('playliststream')
      // eslint-disable-next-line
      if (playlistStream.ended == true) {
        that.reloadPage()
      }
    },
    // wird von update() aktiviert und erneuert einfach nur alle x sekunden den wert von lastupdate auf den wert von currentupdate
    setCurrentUpdateEqualToLastUpdate: function () {
      this.lastupdate = this.currentupdate
    },
    lolFunction: function () {
      var that = this
      // eslint-disable-next-line
      if (this.currentsong == 'not found') {
        alert("Shmoo can't be saved. You've been too fast. Try again in 3,2,1. Go!")
      } else {
        var foundsecurecontent = 0
        var i
        for (i = 0; i < that.securecontent.length; i++) {
          // eslint-disable-next-line
          if (that.securecontent[i] == that.currentsong) {
            foundsecurecontent++
          }
        }
        if (foundsecurecontent > 0) {
          console.log('you cant NO¶ secured content!')
          alert('you cant NO¶ secured content!')
        } else {
          let lol = () => {
            let currentSong = this.currentsong
            let data = {
              currentSong: currentSong
            }
            axios.post('/api/addshmoo', data)
              .then((response) => {
                console.log('NO¶ submitted')
              })
              .catch((errors) => {
                console.log('cannot submit NO¶')
              })
          }
          lol()
          // eslint-disable-next-line
          if (that.user.mode == 'alternativeChannel') {
            this.switchToAlternativeChannel()
          } else {
            this.switchToAlternativePlaylist()
          };
          setTimeout(function () {
            that.emitLoadUserDataOnOtherComponents()
            that.getUserData()
          }, 1000)
        }
      }
    },
    // wird von update() aktiviert und checked alle x sekunden, ob das aktuelle lied in der shmoo datenbank ist
    shmooAlarm: function () {
      let shmooAlarm = () => {
        var i
        var foundShmoo = 0
        for (i = 0; i < this.user.shmoo.length; i++) {
          // eslint-disable-next-line
          if (this.currentsong == this.user.shmoo[i]) {
            foundShmoo++
            this.currentupdate = foundShmoo
          } else {
            // eslint-disable-next-line
            var unsinn = 7
            // console.log('all fine')
          };
          if (foundShmoo !== 0) {
            this.currentupdate = foundShmoo
            this.delaySwitch()
          } else {
            this.currentupdate = 0
          }
        }
      }
      shmooAlarm()
    },
    // wird von shmooAlarm() aktiviert. delaySwitch() macht nix außer einen küstlichen delay zu erzeugen bevor der switch ausgelöst wird
    delaySwitch: function () {
      var that = this
      setTimeout(function () {
        // eslint-disable-next-line
        if (that.user.mode == 'alternativePlaylist') {
          that.switchToAlternativePlaylist()
        } else {
          that.switchToAlternativeChannel()
        };
      }, 6000)
    },
    switchToAlternativePlaylist: function () {
      var that = this
      // teil1 stoppt den laufenden player
      let stopPrimaryChannel = () => {
        var primaryChannel = document.getElementById('primaryradiostream')
        primaryChannel.pause()
      }
      stopPrimaryChannel()
      // teil2 shuffled die lieder und wählt eins aus
      function shuffle (array) {
        // eslint-disable-next-line
        var currentIndex = array.length, temporaryValue, randomIndex ;
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex -= 1
          // And swap it with the current element.
          temporaryValue = array[currentIndex]
          array[currentIndex] = array[randomIndex]
          array[randomIndex] = temporaryValue
        }
        return array
      }
      // Used like so
      var arr = that.user.privatefilenames
      // teil3 spielt das ausgewählte lied ab (setzt die src des players der url des lieds gleich)
      var playlistStream = document.getElementById('playliststream')
      // eslint-disable-next-line
      if (playlistStream.paused == true) {
        arr = shuffle(arr)
        // var track = 'http://46.101.174.202/' + arr[0]
        // "http://www.archive.org/download/CanonInD_261/CanoninD.mp3"
        var track = '../../static/uploads/' + arr[0]
        playlistStream.src = track
        playlistStream.play()
      }
    },
    // wird von shmooAlarm() über delaySwitch() oder von lolFunction() direkt aktiviert, als reaktion auf einen shmoo - wechselt weg auf einen anderen sender.
    switchToAlternativeChannel: function () {
      let switchChannel = () => {
        var primaryChannel = document.getElementById('primaryradiostream')
        var alternativeChannel = document.getElementById('alternativeradiostream')
        primaryChannel.pause()
        alternativeChannel.play()
      }
      switchChannel()
    },
    // wird aktiviert wenn der shmoo zuende ist und man wieder auf den ursprünglichen sender zurück will - einfach zurückschalten funktioniert nicht weil der player dort weiterspielt wo er stehengeblieben ist. nach reloadPage greifen die mounted funktionen und damit spielt auch der ursprüngliche sender wieder (von der aktuellen stelle weg)
    reloadPage: function () {
      location.reload()
    },
    alertCheck: function () {
      var that = this
      setTimeout(function () {
        that.selectChannelAlert()
        that.selectAlternativeChannelAlert()
        that.primaryEqualsAlternativeAlert()
      }, 5000)
    },
    // alert wenn channel noch nicht ausgewählt ist
    selectChannelAlert: function () {
      // eslint-disable-next-line
      if (this.user.channel.radioname == 'unselected') {
        alert('New Here? Select a MainChannel first of all!')
      }
    },
    // alert wenn alternativ channel noch nicht ausgewählt ist
    selectAlternativeChannelAlert: function () {
      // eslint-disable-next-line
      if (this.user.alternativechannel.radioname == 'unselected' && this.user.mode == 'alternativeChannel' && this.user.channel.radioname !== 'unselected') {
        alert('... aaand an AlternativeChannel or change to alternativePlaylist Mode and add your playlist! - better choose an AlternativeChannel anyway.')
        var primaryChannel = document.getElementById('primaryradiostream')
        primaryChannel.pause()
      }
    },
    // alert falls channel und alternative channel gleich sind und channel switch mode läuft
    primaryEqualsAlternativeAlert: function () {
      // eslint-disable-next-line
      if (this.user.channel.radioname == this.user.alternativechannel.radioname && this.user.mode == 'alternativeChannel' && this.user.channel.radioname !== 'unselected') {
        alert('MainChannel and AlternativeChannel should not be the same in alternativeChannel Mode! Please change one of them!')
        var primaryChannel = document.getElementById('primaryradiostream')
        primaryChannel.pause()
      }
    },
    // wird beim laden der seite aufgerufen und aktiviert alle x sekunden die notwendigen funktionen
    update: function () {
      var that = this
      setTimeout(function () {
        that.playFunction()
      }, 3000)
      setInterval(function () {
        that.getNowPlayingMetaDataDirectlyFromFrontend()
        that.updateCheck() // wichtig dass es vor setCurrentUpdateEqualToLastUpdate kommt, weil sonst current und last update immer gleich sind
        that.setCurrentUpdateEqualToLastUpdate()
        that.shmooAlarm()
        that.playerEndedCheck()
        that.getComments()
      }, 2000)
    },
    // sendMessage kopiert aus socket chatroom git
    sendMessage: function () {
			if (!this.msg) {
				alert("Please enter a message");
				return;
			}
			this.$emit('sendMessage', this.msg);
			this.msg = "";
		}
  },
  mounted () {
    var that = this
    console.log('player mounted')
    this.getSecureContent()
    this.setPrimaryChannelSRC()
    this.setAlternativeChannelSRC()
    this.update()
    this.alertCheck()
    EventBus.$on('passUserData', (data) => {
      that.user = data
    })
    window.addEventListener('load', function () {
      that.emitLoadUserDataOnOtherComponents()
      that.emitRequestData()
    })
  }
}
</script>
<style>
    .playercomponentcontainer {
        background-color: gainsboro;
    }
    .hide {
        display: none
    }
    .playbutton {
        background-color: cadetblue;
        margin-left: 10px;
        position: relative;
        float: left;
    }
    .mutebutton {
        background-color: chocolate;
        float: left;
    }
    .unmutebutton {
        background-color: cornsilk;
        float: left;
    }
    .lolbutton {
        float: left;
        font-size: 80px;
        color: darkgreen;
        background-color: orange;
        margin: 10px
    }
    .editbutton{
        background-color: cadetblue;
    }
    .nowplayingdiv {
        float: left;
        font-size: 14px;
        margin-left: 10px;
    }
    .nowplayingtitle {
        float: left;
        font-size: 18px;
        margin-left: 10px;
    }
    .hideondesktop {
        display: none;
    }
    .commentsoutputbox {
        background-color: cadetblue;
        margin-left: 60px;
        margin-top: 20px;
        margin-right: 60px;
        padding: 7px;
        border-style: solid;
        border-width: 2px;
    }
    .commentitem {
        list-style: none;
        text-align: left;
        border-style: ridge;
        border-width: 2px;
        background-color: whitesmoke;
        margin-top: 5px;
    }
    .commentfield {
        width: 80%;
        background-color: whitesmoke;
    }
  .chatwindow{
    border-style: solid;
    border-color: black;
    margin-left: 10%;
    margin-right: 10%;
    background-color: cadetblue
  }
  .chat {
    text-align: left;
    margin-left: 10px;
    background-color: whitesmoke;
    margin: 5px;
    border-style: ridge;
    border-width: 2px;
  }
  .chatuser{
    margin-left: 3px;
    color: darkblue;
    display: inline;
  }
  .chatmessage{
    display: inline;
    margin-left: 5px;
  }

@media (max-width: 500px) {
    .playbutton {
        font-size: 12px;
    }
    .mutebutton {
        font-size: 12px;
    }
    .unmutebutton {
        font-size: 12px;
    }
    .lolbutton {
        font-size: 60px;
    }
    .hideonmobile {
        display: none;
    }
    .hideondesktop {
        display: block;
    }
}
</style>
