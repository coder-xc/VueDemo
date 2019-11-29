<template>
  <div>
    <div>clicked: {{count}} times, count is {{evenOrOdd2}}</div>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["count"]),
    ...mapGetters({
      evenOrOdd2: "evenOrOdd"
    })
  },

  // methods: {
  //   increment() {
  //     this.$store.commit('INCREMENT')
  //   },
  //   decrement() {
  //     this.$store.commit('DECREMENT')
  //   },
  //   incrementIfOdd() {
  //     this.$store.dispatch('incrementIfOdd')
  //   },
  //   incrementAsync() {
  //    this.$store.dispatch('incrementAsync')
  //   },
  // },
  methods: {
    ...mapMutations({
      increment: 'INCREMENT',
      decrement: 'DECREMENT',
    }),
    ...mapActions(['incrementIfOdd', 'incrementAsync'])
  }
};
</script>

<style scoped>
</style>
