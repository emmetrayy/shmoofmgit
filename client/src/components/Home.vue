<template>
    <div>
        <h2 class="homeheader">Home</h2>
        <p>Welcome to ShmooFM</p>
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
        margin-top: 20px;
    }
    .inline {
        display: inline
    }

@media (min-width: 500px) {
  .hideondesktop {
    display: none;
  }
}

</style>
