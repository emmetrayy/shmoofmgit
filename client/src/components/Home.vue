<template>
  <div>
    <h2 class="homeheader">Welcome to </h2>
    <img class="logo" src="../assets/shmoofm_logo_v6_png.png">
    <p class="hideondesktop">Please note, that the mobile version currently only supports basic functionalities and usage, i.e. login, listening and <img class="nopeintext" src="../assets/nope_button2_v3_png.png">. For registration and account setup use the desktop version.</p>
    <br>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>
  .homeheader {
    margin-right: 55%;
    margin-top: 20px;
  }
  .logo {
    width: 50%;
    height: 50%;
  }

@media (max-width: 800px) {
  .homeheader {
    font-size: 12px;
  }
}

</style>
