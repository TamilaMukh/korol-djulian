<template>
  <div id="app">
    <div class="container mx-auto">
      <setHeader />
      <router-view />
    </div>
  </div>
</template>

<script>
import setHeader from './components/SetHeader.vue'
export default {
  name: "App",
  components: {
    setHeader
  }
};
</script>