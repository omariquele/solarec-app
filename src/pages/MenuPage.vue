<template>
  <q-page class="menu-page">
    <BgImageComponent />

    <div class="buttons-container text-center">
      <q-card-section>
        <span style="font-size: 24px; font-weight: bold;">Menu </span>
        <span
          style="background-color: rgba(210, 128, 5, 0.3); padding: 5px 5px; border-radius: 10px; font-size: 24px; font-weight: bold;">
          Principal
        </span>
      </q-card-section>

      <q-btn
        @click="goToComprarRecarga"
        label="Comprar"
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
import BgImageComponent from 'src/components/BgImageComponent.vue';

export default {
  name: "MenuPage",
  components: {
    BgImageComponent
  },
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
  background-size: cover;
  background-position: center;
  position: relative;
}

.buttons-container {
  position: relative;
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  gap: 16px; /* Space between buttons, similar to 'q-gutter-y-md' */
  max-width: 500px; /* Same as your previous max-width */
  width: 80%; /* Make it full width */
  margin: 0 auto; /* Centers horizontally in the content-container */
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* Optional: Add a background color with some opacity to improve readability */
  border-radius: 10px; /* Optional: Add some border radius */
}

.full-width {
  width: 100%;
  margin-bottom: 15px;
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
