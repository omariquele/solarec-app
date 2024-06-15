<template>
  <q-page class="menu-page">
    <BgImageComponent />

    <div class="buttons-container text-center">
      <q-card-section>
  <span style="font-size: 24px;font-weight: bold;">Menu </span> <!-- Adjust font-size as needed -->
  <span
    style="background-color: rgba(210, 128, 5, 0.3); padding: 5px 5px; border-radius: 10px; font-size: 24px;font-weight: bold;">
    Principal
  </span>
</q-card-section>

        <q-btn
      @click="goToComprarRecarga"
      label="Comprar Energia"
      color="primary"
      class="full-width"
      rounded
      size="xl"
      no-caps
      icon="mdi-solar-power"
    />
    <q-btn
      @click="goToUltimaRecarga"
      label="Ultima Recarga"
      color="secondary"
      class="full-width"
      rounded
      size="xl"
      no-caps
      icon="mdi-home-lightning-bolt-outline"
    />
  </div>
  </q-page>
</template>

<script>
import BgImageComponentVue from 'src/components/BgImageComponent.vue';

export default {
  name: "MenuPage",
  methods: {
    goToComprarRecarga() {
      this.$router.push("/comprar-recarga");
    },
    goToUltimaRecarga() {
      this.$router.push("/ultima-recarga");
    },
  },
};
</script>

<style scoped>
.menu-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #f0f0f0;
}
.full-width {
  width: 100%;
  margin-bottom: 15px;
}

.buttons-container {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  gap: 16px; /* Space between buttons, similar to 'q-gutter-y-md' */
  max-width: 500px; /* Same as your previous max-width */
  width: 70%; /* Make it full width */
  margin: 0 auto; /* Centers horizontally in the content-container */
}

.content-container {
  position: relative;
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  text-align: center;
  min-height: 100vh; /* Takes the full height of the viewport */
}


</style>
