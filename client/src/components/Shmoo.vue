<template>
    <div>
        <!-- help info -->
        <p @mouseover="isHovering = true"
            @mouseout="isHovering = false"
            :class="{hovering: isHovering}" class="gethelp">
            {{ isHovering ? "All the songs you disliked so far are listed here. You dont have to hear any of them ever again. In case you changed your taste (or if your brother used your account and made a mess of it), you can bring them back in the game by removing from this list" : "Help" }}
        </p>
        <!-- No¶-List -->
        <div class="hideonmobile">
            <h2 class="shmooheader">No¶-List</h2>
            <ul class="shmooul">
                <input id="searchshmoo" type="text" v-model="search" placeholder="search" >
                <li class="shmoolistitem" v-for="(x, index) in filteredShmoo" :key="x.id" v-on:click="selectShmooElement($event, x)">
                    <a>{{ index }} - {{ x }}</a>
                    <a id="deleteitem">delete</a>
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
      selectedShmoo: '',
      search: '',
      isHovering: false
    }
  },
  props: ['userdataprop'],
  methods: {
    emitLoggedInMethod: function () {
      setTimeout(function () {
        EventBus.$emit('logged-in', 'loggedin')
      }, 1000)
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
      window.location.reload()
    }
  },
  computed: {
    filteredShmoo: function () {
      return this.userdataprop.shmoo.filter((x) => {
        return x.toLowerCase().match(this.search.toLowerCase())
      })
    }
  },
  mounted () {
    this.emitLoggedInMethod()
  }
}
</script>

<style>
    .shmooheader {
        margin-top: 20px;
        margin-left: 4%;
    }
    .shmooul {
        margin-left: 60px;
        margin-top: 20px;
        margin-right: 60px
    }
    .shmoolistitem {
        list-style: none;
        text-align: left;
        border-style: solid
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
    #searchshmoo {
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
