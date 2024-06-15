<template>
  <q-page class="resultado-ultima-compra-page">

    <BgImageComponent />
    <div class="buttons-container text-center">
      <q-card-section>
  <span style="font-size: 24px;font-weight: bold;">Ultima Recarga </span> <!-- Adjust font-size as needed -->
  <span
    style="background-color: rgba(210, 128, 5, 0.3); padding: 5px 5px; border-radius: 10px; font-size: 24px;font-weight: bold;">
    Comprada
  </span>
</q-card-section>
    <q-card>
      <q-card-section>
        <div class="text-h6">Resultado da Última Compra</div>
        <div>Recharge Code: {{ response.rechargeCode }}</div>
        <div>Meter Number: {{ response.meterNumber }}</div>
        <div>Transaction Date: {{ response.transactionDate }}</div>
        <div>Transaction ID: {{ response.transactionId }}</div>
        <div>Paid Amount: {{ response.paidAmount }}</div>
      </q-card-section>
      <q-card-section>
        <q-btn
          @click="goToMenu"
          label="Menu"
          color="primary"
          class="full-width q-my-md"
        />
      </q-card-section>
    </q-card>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'ResultadoUltimaCompra',
  data() {
    return {
      response: this.$route.params.response || {},
    };
  },
  methods: {
    goToMenu() {
      this.$router.push('/menu');
    },
  },
};
</script>

<style scoped>
.resultado-ultima-compra-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #f0f0f0;
}
.full-width {
  width: 100%;
}

.buttons-container {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  gap: 16px; /* Space between buttons, similar to 'q-gutter-y-md' */
  max-width: 500px; /* Same as your previous max-width */
  width: 70%; /* Make it full width */
  margin: 0 auto; /* Centers horizontally in the content-container */
}
</style>
