<template>
  <div>
    <!-- englische version -->
    <div v-if="user.language!=='Deutsch'">
      <h2 class="headermargintop">Forum</h2>
      <p class="textalignleft">ShmooFM is currently using 3rd party provider Xobor to run the forum. To visit the ShmooFM forum click here: <a href="http://shmoofm.xobor.de">http://shmoofm.xobor.de</a>.</p>
      <p class="textalignleft">To report a bug please write to dev@shmoofm.com.</p>
      <p class="textalignleft">If you have an idea for a new feature please discuss in the forum in the 'new features' section. We are actively monitoring the discussions there.</p>
      <p class="textalignleft">If you like to contact us concerning any other topic, please write to info@shmoofm.com.</p>
    </div>
    <!-- deutsche version -->
    <div v-if="user.language==='Deutsch'">
      <h2 class="headermargintop">Forum</h2>
      <p class="textalignleft">Das ShmooFM Forum wird im Moment noch vom 3rd party provider Xobor gehosted. Hier geht's zum ShmooFM Forum: <a href="http://shmoofm.xobor.de">http://shmoofm.xobor.de</a>.</p>
      <p class="textalignleft">Du hast einen Fehler in der App gefunden? Schreib uns bitte an dev@shmoofm.com.</p>
      <p class="textalignleft">Du hast eine Idee für ein neues Feature? Teile deine Idee im Forum unter 'new features'. Wir werden das Geschehen dort aktiv mitverfolgen.</p>
      <p class="textalignleft">Alle weiteren Fragen, bitte an info@shmoofm.com.</p>
    </div>
  </div>
</template>

<script>
import EventBus from './EventBus'

export default {
  name: 'Forum',
  data () {
    return {
      user: {
        language: ''
      }
    }
  },
  methods: {
    emitRequestData: function () {
      setTimeout(function () {
        EventBus.$emit('requestData')
        console.log('emitRequestData on forum component fired')
      }, 300)
    }
  },
  mounted () {
    var that = this
    console.log('forum mounted')
    this.emitRequestData()
    EventBus.$on('passUserData', (data) => {
      that.user = data
    })
    /*
    window.addEventListener('load', function () {
      that.emitLoadUserDataOnOtherComponents()
      that.emitRequestData()
      that.emitReloadPlayerOnAppVue()
    }) */
  }
}
</script>

<style>
  .textalignleft {
    text-align: left;
    margin-left: 5px;
  }
</style>
