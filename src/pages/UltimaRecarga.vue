<template>
  <q-page class="ultima-recarga-page">

    <BgImageComponent />

    <div class="buttons-container text-center">
      <q-card-section>
  <span style="font-size: 24px;font-weight: bold;">Ultima </span> <!-- Adjust font-size as needed -->
  <span
    style="background-color: rgba(210, 128, 5, 0.3); padding: 5px 5px; border-radius: 10px; font-size: 24px;font-weight: bold;">
    Recarga
  </span>
</q-card-section>
<q-input
          v-model="contador"
          label="Insira o número de contador"
          filled
          class="q-my-md"
          input-style="font-size: 20pt"
          mask="#############"
        />
        <q-btn
          @click="procurarRecarga"
          label="Procurar"
          color="primary"
          class="full-width"
          rounded
          size="xl"
          no-caps
          icon="mdi-eye-refresh-outline"
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
      </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UltimaRecarga',
  data() {
    return {
      contador: '',
    };
  },
  methods: {
    async procurarRecarga() {
      const meterNumber = this.contador;
      const apiUrl = `http://testeprepago.funae.co.mz:3030/api/funaeprepaid/recharge/last?eId=SOLARECAPP&eKey=7d69898e-b9ff-4ef0-87a1-e03f8ed0b853&userId=solarec-api&meterNumber=${meterNumber}&token=71B40D4A-4A0D-44F5-B748-305F6C3AC96F`;

      try {
        const response = await axios.get(apiUrl);
        console.log('API response:', response.data);
        this.$router.push({ path: '/resultado-ultima-compra', params: { response: response.data } });
      } catch (error) {
        console.error('API error:', error);
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao visualizar a recarga. Tente novamente.',
        });
      }
    },
    voltar() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>


.ultima-recarga-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
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
