<template>
  <q-page class="recarga-details-page">
    <BgImageComponent />
    <div class="buttons-container text-center">
      <q-card-section>
  <span style="font-size: 24px;font-weight: bold;">Meio de </span> <!-- Adjust font-size as needed -->
  <span
    style="background-color: rgba(210, 128, 5, 0.3); padding: 5px 5px; border-radius: 10px; font-size: 24px;font-weight: bold;">
    Pagamento
  </span>
</q-card-section>
    <q-card>
      <q-card-section>
        <div class="text-h6">Recarga Details</div>
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
          @click="comprarNovamente"
          label="Comprar"
          color="primary"
          class="full-width q-my-md"
        />
        <q-btn
      @click="voltar"
      label="Voltar"
      color="accent"
      text-color="black"
      class="full-width"
      rounded
      size="xl"
      no-caps
      icon="mdi-keyboard-backspace"
    />
      </q-card-section>
    </q-card>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'RecargaDetails',
  data() {
    return {
      response: this.$route.params.response || {},
    };
  },
  methods: {
    comprarNovamente() {
      this.$router.push('/comprar-recarga');
    },
    voltar() {
      this.$router.push('/menu');
    },
  },
};
</script>

<style scoped>
.recarga-details-page {
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
