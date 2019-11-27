<template>
  <mt-button type="primary" style="width: 100%" @click="hint">测试mintUi</mt-button>
</template>

<script type="text/ecmascript-6">

  import { Toast } from 'mint-ui';
  
  export default {
    methods: {
      hint() {
        Toast({
          message: '提示',
          position: 'top',
          duration: 2000
        });
      }
    }
  }
</script>

<style scoped>

</style>
