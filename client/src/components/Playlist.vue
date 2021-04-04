<template>
  <div>
    <!-- help info englisch -->
    <p class="gethelp" v-if="user.language!=='Deutsch'" @mouseover="helpHovered = true"
          @mouseout="helpHovered = false">Help</p>
    <div v-if="helpHovered===true" class="helptext">
      <br>
      <div>If you run the app in 'alternativePlaylist' mode it will switch to a random song from your playlist, whenever your channel is playing a song from your <img class="nopeintext" src="../assets/nope_button2_v3_png.png">-List. It will play the song to the end and then automatically switch back to your main channel.</div>
    </div>
    <!-- help info deutsch -->
    <p class="gethelp" v-if="user.language==='Deutsch'" @mouseover="hilfeHovered = true"
          @mouseout="hilfeHovered = false">Hilfe</p>
    <div v-if="hilfeHovered===true" class="helptext">
      <br>
      <div>Wenn du 'alternativePlaylist' Modus ausgewählt hast, wechselt die App immer, wenn auf deinem Sender ein Lied aus deiner <img class="nopeintext" src="../assets/nope_button2_v3_png.png">-List läuft, automatisch auf ein zufällig ausgewähltes Lied aus deiner Playlist und danach wieder zurück auf den ausgewählten Sender.</div>
    </div>
    <div>
      <h2 style="margin-top: 20px;">Playlist</h2>
      <!-- upload info englisch -->
      <p style="text-align: center;" v-if="user.language!=='Deutsch'">You can upload up to 10 songs to your playlist.</p>
      <!-- upload info deutsch -->
      <p style="text-align: center;" v-if="user.language==='Deutsch'">Du kannst bis zu 10 Lieder in deine Playlist hochladen.</p>
      <!-- File Upload -->
      <form @submit.prevent="sendFile" enctype="multipart/form-data">
        <div>
          <label for="file">Upload File</label>
          <input class="selectfile" type="file" ref="file" @change="selectFile"/>
        </div>
        <div>
          <button class="sendfilebutton" v-if="this.user.privateplaylist.length < 10 && this.fileselected == true">Upload</button>
        </div>
        <div class="messageclass" v-if="message">{{message}}</div>
      </form>
    </div>
    <br>
    <!-- Private Playlist -->
    <div>
      <ul class="playlistul">
        <li class="playlistitem" v-for="(privateplaylistitem, index) in user.privateplaylist" :key="privateplaylistitem.id" v-on:click="playlistItemClicked($event, privateplaylistitem)">
          <img class="deleteicon" src="../assets/delete_icon_v1_png.png">
          <a>{{ index +1 }} - {{ privateplaylistitem }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
import EventBus from './EventBus'

export default {
  name: 'Playlist',
  data () {
    return {
      user: {
        id: '',
        username: '',
        mode: '',
        privateplaylist: []
      },
      selectedplaylistitem: '',
      search: '',
      helpHovered: false,
      hilfeHovered: false,
      file: '',
      message: '',
      error: false,
      fileselected: false
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
        console.log('emitRequestData on playlist component fired')
      }, 300)
    },
    emitLoadUserDataOnOtherComponents: function () {
      EventBus.$emit('loadUserData')
    },
    emitReloadPlayerOnAppVue: function () {
      EventBus.$emit('loadPlayer')
      console.log('reload player emitted from playlist')
    },
    selectFile () {
      const file = this.$refs.file.files[0]
      const allowedTypes = ['audio/mpeg', 'audio/mp3']
      const MAX_SIZE = 20000000
      const tooLarge = file.size > MAX_SIZE
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = file
        this.error = false
        this.message = ''
        this.fileselected = true
      } else {
        this.file = file
        this.error = true
        this.message = tooLarge ? 'File is too big. Max size: 20MB' : 'Only Mp3 allowed'
      }
    },
    async sendFile () {
      var that = this
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        await axios.post('/api/fileupload', formData)
        this.message = 'File has been uploaded'
        this.file = ''
        this.error = false
        that.reload()
      } catch (err) {
        this.message = err.response.data.error
        this.error = true
      }
    },
    playlistItemClicked: function (event, privateplaylistitem) {
      this.selectedplaylistitem = privateplaylistitem
      this.deleteprivateplaylistitem()
    },
    deleteprivateplaylistitem: function () {
      let privatePlaylistItem = this.selectedplaylistitem
      let submitDeletePrivatePlaylistItem = () => {
        let data = {
          privatePlaylistItem: privatePlaylistItem
        }
        axios.post('/api/deleteprivateplaylistitem', data)
          .then((response) => {
            console.log('privateplaylistitem deleted')
          })
          .catch((errors) => {
            console.log('cannot delete privateplaylistitem')
          })
      }
      submitDeletePrivatePlaylistItem()
      this.reload()
    },
    reload: function () {
      setTimeout(function () {
        window.location.reload()
      }, 1000)
    }
  },
  mounted () {
    var that = this
    console.log('playlist mounted')
    this.emitRequestData()
    this.emitLoggedInMethod()
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
  .gethelp {
    float: right;
    margin: 2%;
    padding: 0px;
    color: orangered;
  }
  .helptext{
    margin-left: 5px;
    margin-right: 5px;
  }
  .nopeintext{
    width: 20px;
    height: 20px;
    margin-bottom: 3px;
  }
  .selectfile {
    border-radius: 5px;
    background-color: lightslategrey;
  }
  .sendfilebutton {
    border-radius: 10px;
    background-color: cadetblue;
  }
  .messageclass {
    color: blue;
  }
  .playlistul {
    margin-left: 10px;
    margin-top: 20px;
    margin-right: 10px
  }
  .playlistitem {
    width: fit-content;
    list-style: none;
    text-align: left;
    /*border-style: solid;*/
    /*margin-left: 15%;*/
    /*margin-right: 15%;*/
  }
  .playlistitem:hover {
    cursor: pointer;
    color: red
  }
  .deleteicon{
    width: 40px;
    height: 40px;
  }
</style>
