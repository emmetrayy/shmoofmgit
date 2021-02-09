<template>
    <div>
        <!-- help info -->
        <p @mouseover="isHovering = true"
            @mouseout="isHovering = false"
            :class="{hovering: isHovering}" class="gethelp">
            {{ isHovering ? "If you run the app in 'alternativePlaylist Mode' it will switch to a random track from your playlist, whenever shmoo is detected." : "Help" }}
        </p>
        <div>
            <h2 class="privateplaylistheader">Playlist</h2>
            <p>You can upload up to 10 tracks to your playlist.</p>
            <!-- File Upload -->
            <form @submit.prevent="sendFile" enctype="multipart/form-data">
                <div>
                    <label for="file">Upload File</label>
                    <input class="selectfile"
                        type="file"
                        ref="file"
                        @change="selectFile"
                    />
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
                <li class="playlistitem" v-for="privateplaylistitem in user.privateplaylist" :key="privateplaylistitem.id" v-on:click="playlistItemClicked($event, privateplaylistitem)">
                    <a>{{ privateplaylistitem }}</a>
                    <a id="deleteitem">delete</a>
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
      isHovering: false,
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
    this.getUserData()
    this.emitLoggedInMethod()
  }
}
</script>

<style>
    .playlistheader {
        margin-top: 20px;
    }
    .playlistul {
        margin-left: 60px;
        margin-top: 20px;
        margin-right: 60px
    }
    .playlistitem {
        list-style: none;
        text-align: left;
        border-style: solid;
        margin-left: 15%;
        margin-right: 15%;
    }
    .fullplaylistitem {
        list-style: none;
        color: cadetblue;
    }
    .playlistitem:hover {
        cursor: pointer;
        color: red
    }
    .selectfile {
        background-color: lightslategrey;
    }
    .sendfilebutton {
        background-color: cadetblue;
    }
    .messageclass {
        color: blue;
    }
    #deleteitem {
        background-color: darkred;
        color: lightgrey;
        float: right;
        padding-left: 5px;
        padding-right: 5px;
    }
    #searchplaylist {
        color: lightgray;
        background-color: cadetblue;
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
</style>
