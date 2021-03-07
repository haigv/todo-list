<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from '@/views/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>
<style lang="scss">
#app {
  background-color: #f1f1f1;
  height: 100%;
  min-height: 100vh;
}
body {
  margin: 0;
  min-height: 100vh;
}
</style>
