<template>
  <div>
    <!-- help info -->
    <!-- help info englisch -->
    <p v-if="user.language!=='Deutsch'" @mouseover="isHovering = true"
      @mouseout="isHovering = false"
      :class="{hovering: isHovering}" class="gethelp">
      {{ isHovering ? "All the songs you disliked so far are listed here. You dont have to hear any of them ever again. In case you changed your taste (or if your brother used your account and made a mess of it), you can bring them back in the game by removing from this list" : "Help" }}
    </p>
    <!-- help info deutsch -->
    <p v-if="user.language==='Deutsch'" @mouseover="isHovering = true"
      @mouseout="isHovering = false"
      :class="{hovering: isHovering}" class="gethelp">
      {{ isHovering ? "Hier werden alle Lieder aufgelistet, die du bisher aussortiert hast. Wenn eines dieser Lieder am ausgewählten Sender gespielt wird, schaltet die App automatisch weg. Falls du deine Meinung irgendwann änderst, kannst kannst du ein Lied aus dieser Liste löschen, indem du es anklickst." : "Hilfe" }}
    </p>
    <!-- No¶-List -->
    <div class="hideonmobile">
      <div class="shmooheader">
        <img class="nopeimageinshmoo" src="../assets/nope_button2_v3_png.png">
        <h2 style="display:inline;">-List</h2>
      </div>
      <ul class="shmooul">
        <!-- input feld englisch -->
        <input v-if="user.language!=='Deutsch'" id="searchshmoo" type="text" v-model="search" placeholder="search" >
        <!-- input feld deutsch -->
        <input v-if="user.language==='Deutsch'" id="searchshmoo" type="text" v-model="search" placeholder="suchen" >
        <br/>
        <li class="shmoolistitem" v-for="(x, index) in filteredShmoo" :key="x.id" v-on:click="selectShmooElement($event, x)">
          <img class="deleteicon" src="../assets/delete_icon_v1_png.png">
          <a>{{ index +1 }} - {{ x }}</a>
          <!-- <a id="deleteitem">delete</a> -->
        </li>
      </ul>
      <br>
    </div>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'
import EventBus from './EventBus'

export default {
  name: 'Shmoo',
  data () {
    return {
      user: {
        shmoo: []
      },
      selectedShmoo: '',
      search: '',
      isHovering: false
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
        console.log('emitRequestData on shmoo component fired')
      }, 300)
    },
    emitLoadUserDataOnOtherComponents: function () {
      EventBus.$emit('loadUserData')
    },
    emitReloadPlayerOnAppVue: function () {
      EventBus.$emit('loadPlayer')
      console.log('reload player emitted from shmoo')
    },
    selectShmooElement: function (event, x) {
      this.selectedShmoo = x
      this.removeShmoo()
    },
    removeShmoo: function () {
      let elementToBeRemovedFromShmoo = this.selectedShmoo
      let submitRemoveShmoo = () => {
        let data = {
          elementToBeRemovedFromShmoo: elementToBeRemovedFromShmoo
        }
        axios.post('/api/removeshmoo', data)
          .then((response) => {
            console.log('shmoo element removed')
          })
          .catch((errors) => {
            console.log('cannot remove shmoo element')
          })
      }
      submitRemoveShmoo()
      this.emitLoadUserDataOnOtherComponents()
      this.emitRequestData()
    }
  },
  computed: {
    filteredShmoo: function () {
      return this.user.shmoo.filter((x) => {
        return x.toLowerCase().match(this.search.toLowerCase())
      })
    }
  },
  mounted () {
    var that = this
    console.log('shmoo mounted')
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
    .shmooheader {
      display: inline;
        margin-top: 20px;
        margin-left: 4%;
    }
    .shmooul {
        margin-left: 10px;
        margin-top: 20px;
        margin-right: 10px
    }
    .shmoolistitem {
      width: fit-content;
        list-style: none;
        text-align: left;
        /*border-style: solid*/
    }
    .shmoolistitem:hover {
        cursor: pointer;
        color: red
    }
    #deleteitem {
        background-color: darkred;
        color: lightgrey;
        float: right;
        padding-left: 5px;
        padding-right: 5px;
    }
  .deleteicon{
    width: 40px;
    height: 40px;
  }
    #searchshmoo {
      border-radius: 5px;
      border-color: black;
        color: whitesmoke;
        background-color: cadetblue;
      margin-bottom: 30px;
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
  .nopeimageinshmoo{ /*muss ich so nennen, weil wenn ichs gleich nenn wie in der anderen komponente dann überschreiben sie sich gegenseitig*/
    width: 30px;
    height: 30px;
    margin-bottom: 13px;
  }
</style>
