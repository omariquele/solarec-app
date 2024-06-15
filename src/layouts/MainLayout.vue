<template>
  <div id="q-app">
    <router-view v-if="isOnline"></router-view>
    <no-internet v-else></no-internet>
  </div>
</template>

<script>
import NoInternet from 'pages/NoInternet.vue';

export default {
  name: 'App',
  components: {
    NoInternet,
  },
  data() {
    return {
      isOnline: navigator.onLine,
    };
  },
  created() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  unmounted() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  },
  methods: {
    updateOnlineStatus() {
      this.isOnline = navigator.onLine;
    },
  },
};
</script>

<style>
#q-app {
  height: 100vh;
}
</style>
