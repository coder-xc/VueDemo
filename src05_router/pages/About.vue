<template>
  <div>
    <h2>About</h2>
    <p>{{msg}}</p>
    <input type="text">
  </div>
</template>

<script>

  export default {
    props: {
      msg: String
    },
    mounted() {
      console.log('about')
    }
  }

</script>

<style scoped>
 
</style>