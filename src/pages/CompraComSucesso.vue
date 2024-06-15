<template>
  <q-page class="compra-com-sucesso-page">
    <BgImageComponent />
    <div class="buttons-container text-center">
      <q-card-section>
  <span style="font-size: 24px;font-weight: bold;">Compra com </span> <!-- Adjust font-size as needed -->
  <span
    style="background-color: rgba(210, 128, 5, 0.3); padding: 5px 5px; border-radius: 10px; font-size: 24px;font-weight: bold;">
    Sucesso
  </span>
</q-card-section>
    <q-card>
      <q-card-section>
        <div class="text-h6">Compra com Sucesso</div>
        <div>Recharge Code: {{ response.rechargeCode }}</div>
        <div>Customer Name: {{ response.customerName }}</div>
        <div>Meter Number: {{ response.meterNumber }}</div>
        <div>Province: {{ response.customerProvince }}</div>
        <div>District: {{ response.customerDistrict }}</div>
        <div class="text-h6 q-mt-md">DETALHES DA COMPRA</div>
        <div>Category: {{ response.category }}</div>
        <div>Paid Amount: {{ response.paidAmount }}</div>
        <div>kWh Quantity: {{ response.kwhQuantity }}</div>
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
  name: 'CompraComSucesso',
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
.compra-com-sucesso-page {
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
