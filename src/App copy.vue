<template>
  <div>
    <div>clicked: {{$store.state.count}} times, count is {{$store.getters.evenOrOdd}}</div>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
  
  export default {
    mounted() {
      console.log('mouted()', this.$store)
    },


    methods: {
      increment() {
        this.$store.dispatch('increment')
        
      },
      decrement() {
        this.$store.commit('DECREMENT')
      },
      incrementIfOdd() {
        this.$store.dispatch('incrementIfOdd')
      },
      incrementAsync() {
       this.$store.dispatch('incrementAsync')
      },
    }
  }

</script>

<style scoped>

</style>
