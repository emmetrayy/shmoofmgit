<template>
  <div>
    <h2 class="homeheader">Welcome to </h2>
    <img class="logo" src="../assets/shmoofm_logo_v6_png.png">
    <p class="hideondesktop">Please note, that the mobile version currently only supports basic functionalities and usage, i.e. login, listening and No¶. For registration and account setup use the desktop version.</p>
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
  .inline {
    display: inline
  }
  .logo {
    width: 50%;
    height: 50%;
  }

@media (min-width: 500px) {
  .hideondesktop {
    display: none;
  }
}

@media (max-width: 500px) {
  .homeheader {
    font-size: 12px;
  }
}

</style>
