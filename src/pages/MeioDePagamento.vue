<template>
  <q-page class="meio-de-pagamento-page">
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
        <div class="text-h6">Meio de Pagamento</div>
        <div>Customer Name: {{ response.customerName }}</div>
        <div>Meter Number: {{ response.meterNumber }}</div>
        <div>Province: {{ response.customerProvince }}</div>
        <div>District: {{ response.customerDistrict }}</div>
        <div class="text-h6 q-mt-md">Valor a pagar</div>
        <div>Paid Amount: {{ response.paidAmount }}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6 q-mt-md">Selecione o Método de Pagamento</div>
        <div class="payment-methods">
          <q-btn @click="openMpesaDialog" flat>
            <img src="~assets/mpesa-logo.png" alt="Mpesa" class="payment-logo">
          </q-btn>
          <q-btn @click="openEmolaDialog" flat>
            <img src="~assets/emola-logo.png" alt="Emola" class="payment-logo">
          </q-btn>
        </div>
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

    <!-- Mpesa Dialog -->
    <q-dialog v-model="mpesaDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Mpesa Payment</div>
          <div>Valor a Pagar: {{ response.paidAmount }}</div>
          <q-input
            v-model="mpesaPhoneNumber"
            label="Insira o número de telefone"
            filled
            type="tel"
            :rules="[val => val.length === 9 || 'Número de telefone deve ter 9 dígitos']"
            class="q-my-md"
          />
        </q-card-section>
        <q-card-section>
          <q-btn @click="confirmMpesaPayment" label="Confirmar" color="primary" class="full-width q-my-md" />
          <q-btn @click="mpesaDialog = false" label="Cancelar" color="secondary" class="full-width q-my-md" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Emola Dialog -->
    <q-dialog v-model="emolaDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Emola Payment</div>
          <div>Valor a Pagar: {{ response.paidAmount }}</div>
          <q-input
            v-model="emolaPhoneNumber"
            label="Insira o número de telefone"
            filled
            type="tel"
            :rules="[val => val.length === 9 || 'Número de telefone deve ter 9 dígitos']"
            class="q-my-md"
          />
        </q-card-section>
        <q-card-section>
          <q-btn @click="confirmEmolaPayment" label="Confirmar" color="primary" class="full-width q-my-md" />
          <q-btn @click="emolaDialog = false" label="Cancelar" color="secondary" class="full-width q-my-md" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Progress Dialog -->
    <q-dialog v-model="progressDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ progressMessage }}</div>
          <q-linear-progress
            :value="progressValue"
            color="primary"
            size="24px"
            class="q-my-md"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MeioDePagamento',
  data() {
    return {
      response: this.$route.params.response || {},
      mpesaDialog: false,
      emolaDialog: false,
      progressDialog: false,
      mpesaPhoneNumber: '',
      emolaPhoneNumber: '',
      progressValue: 0,
      progressMessage: '',
    };
  },
  methods: {
    openMpesaDialog() {
      this.mpesaDialog = true;
    },
    openEmolaDialog() {
      this.emolaDialog = true;
    },
    async confirmMpesaPayment() {
      if (this.mpesaPhoneNumber.length !== 9) {
        this.$q.notify({
          type: 'negative',
          message: 'Número de telefone deve ter 9 dígitos',
        });
        return;
      }

      const transactionReference = 'T12344C'; // You might want to generate a unique reference
      const customerMSISDN = `258${this.mpesaPhoneNumber}`;
      const amount = this.response.paidAmount;
      const thirdPartyReference = `Funae${this.response.meterNumber}${this.generateRandomString(2)}`;
      const serviceProviderCode = '171717';

      const apiUrl = 'https://api.sandbox.vm.co.mz:18352/ipg/v1x/c2bPayment/singleStage/';
      const payload = {
        input_TransactionReference: transactionReference,
        input_CustomerMSISDN: customerMSISDN,
        input_Amount: amount,
        input_ThirdPartyReference: thirdPartyReference,
        input_ServiceProviderCode: serviceProviderCode,
      };

      const headers = {
        'Authorization': 'Bearer lhKMgouotjd122pWTIvoR6gBNcTUb25fvTAl/iucOVfro5F3HXDl91f4cZNe6gt6RPsoNkIZVa/Hv6M/cgfF52QWb4d6Dc2ysJTlpVuvZCkxgfzo2Ll3YZx0WSuJKLFBnZhklYhFE9vwkIc1EKLSexT5y5dFXjdKjL26OV0pktvvLTCBMm6voikrjC29V/7UnQeJDuNHhemeNFbcmplfHKxahMfP5wGDcJH5X4IbthDP3W1ykd/IVdktHFdiXWGasjVFcohB2NEIOX8TXe/zuPGqBpI1PBmyiGbrZDjLk7/OKLCMCK6i61n5p1kpDasiIdYGfgF3pumw8xmTtKk5t/d/UurMgqsvSCVNu/ElpjXnd2r4Eh4UkLm7E6BdlcI5PiMDoiPzujD8zbuYq1NsBM/da07HNfrv8H8+J1OpGtX6VUcDpVXiR6cTcX8ln4lfGXRWLhNWa3wtXLNTfldw6jHFee4z4/ir8ldde8ffMDT6C4kutrB2DD2btNQ6c/f4A/0BoPmYj8hFTt96kxHUF0zqJzwsoIaTMYbI0MrD4lO/BAKBlScH14kqovWdQkMezu0kppAQBsNTJ/FrteAI3vrA4ncU+/GGdpDEUFPvzelleyRwSKh1dt5UFSIyUyahbpDOaEPPTL3VT4G/f6hcPaBdyUasIOrMsJTD1FDbkLI=',
        'developer': 'developer.mpesa.vm.co.mz',
      };

      this.progressDialog = true;
      this.progressMessage = `Por favor, valide o PIN do Mpesa no celular ${this.mpesaPhoneNumber}`;
      this.updateProgress();

      try {
        const response = await axios.post(apiUrl, payload, { headers });
        console.log('Mpesa API response:', response.data);
        this.$q.notify({
          type: 'positive',
          message: 'Pagamento Mpesa realizado com sucesso!',
        });
        this.mpesaDialog = false;
        this.progressDialog = false;
        await this.generateRecharge();
      } catch (error) {
        console.error('Mpesa API error:', error);
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao realizar o pagamento Mpesa. Tente novamente.',
        });
        this.progressDialog = false;
      }
    },
    async confirmEmolaPayment() {
      if (this.emolaPhoneNumber.length !== 9) {
        this.$q.notify({
          type: 'negative',
          message: 'Número de telefone deve ter 9 dígitos',
        });
        return;
      }

      const clientId = '98047349-93c7-44fe-a5d2-20d9dd666381';
      const phone = this.emolaPhoneNumber;
      const amount = this.response.paidAmount;
      const reference = `Funae${this.response.meterNumber}${this.generateRandomString(2)}`;

      const apiUrl = 'https://e2payments.explicador.co.mz/v1/c2b/emola-payment/591175';
      const payload = new FormData();
      payload.append('client_id', clientId);
      payload.append('phone', phone);
      payload.append('amount', amount);
      payload.append('reference', reference);

      const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ODA0NzM0OS05M2M3LTQ0ZmUtYTVkMi0yMGQ5ZGQ2NjYzODEiLCJqdGkiOiIyY2E1OWE5ODBkZWFhZTQ1ZGVmYjU2NzAyMTA3YWFjODBiN2I3OWMzYTRkODM4Y2U4OWM3MDg4NDFiNmY5YTM4OWUyY2JjNTVhOGIyZjg2NyIsImlhdCI6MTcxODQ0MzMwMS42MDM4NTIsIm5iZiI6MTcxODQ0MzMwMS42MDM4NTYsImV4cCI6MTc0OTk3OTMwMS41OTQ5MjIsInN1YiI6IiIsInNjb3BlcyI6W119.e5r9em34nkTIsfB5VKFCquoVxSvgGWgt0TJ_EaT9nj8BwS0MEDARhQ_-IaSas3nJZe1NhI6aXPHrKOtc3UdVqoukqtHL_f0uLuWIlR3TvvxIdVdfhifDeVr5E0NV-i7VRnIoqcX-OmT7V8ohhsMZDwc99JXUjMSFDf2MAA5bE3RRcZGzpDXfb3cAs66LgooKse1WhASiItP70De5Jj6itvJDwj87O8mzmwbQAAOqaDR7jq4c8MUcak57QSKfMigNRYsZskDdwVmxpZ_S13tsVgbTgaxCMxjdzykzTXRL7j6Guot61tFxfK8LANdzKgnzjZsSnCIJVnSHLkN16PWw4M9V2yMtHABFZgtBcx5N2KEPlQFpjtkt2ORD64Y-W0TnvtHVdqpimlYH8fsavfbMPSyuxElFzKFvZdpvvTM5ikNUsYNvbCM6C5SUYiJ2j5PCeEzQgTQeKA3mOs6zXUYEa_0WwhZc0xsjW82Px_KUQZ_FNN1jVAUtsFv9MzdEsHWlO85IDyLqNuNeIL6YHprsPHeaLWrDZF5m5-Lzq9HGScuEC7-9ptbmr9DT0fA535vj75H3yg10Iv7ms_NM36-p2oyGpNEEyt-LJ2qiRN6lhE67LI4ZA79s91Z3v72tvCqjNNc_-h8D0N61G0PAoPbg4QGwSNdV5tvf7hYP8lZbk0g',
      };

      this.progressDialog = true;
      this.progressMessage = `Por favor, valide o PIN do Emola no celular ${this.emolaPhoneNumber}`;
      this.updateProgress();

      try {
        const response = await axios.post(apiUrl, payload, { headers });
        console.log('Emola API response:', response.data);
        this.$q.notify({
          type: 'positive',
          message: 'Pagamento Emola realizado com sucesso!',
        });
        this.emolaDialog = false;
        this.progressDialog = false;
        await this.generateRecharge();
      } catch (error) {
        console.error('Emola API error:', error);
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao realizar o pagamento Emola. Tente novamente.',
        });
        this.progressDialog = false;
      }
    },
    async generateRecharge() {
      const apiUrl = 'http://testeprepago.funae.co.mz:3030/api/funaeprepaid/recharge/generate';
      const payload = {
        simulationId: this.response.simulationId,
        eId: 'SOLARECAPP',
        eKey: '5786837b-e0e4-4e9f-95fe-c851b155f5c8',
        userId: 'solarec-api',
        token: '71B40D4A-4A0D-44F5-B748-305F6C3AC96F',
      };

      try {
        const response = await axios.post(apiUrl, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Recharge API response:', response.data);
        this.$router.push({ path: '/compra-com-sucesso', params: { response: response.data } });
      } catch (error) {
        console.error('Recharge API error:', error);
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao gerar a recarga. Tente novamente.',
        });
      }
    },
    updateProgress() {
      this.progressValue = 0;
      const interval = setInterval(() => {
        if (this.progressValue < 1) {
          this.progressValue += 0.01;
        } else {
          clearInterval(interval);
        }
      }, 100);
    },
    generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    },
    voltar() {
      this.$router.push('/comprar-recarga');
    },
  },
};
</script>

<style scoped>


.meio-de-pagamento-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}
.full-width {
  width: 100%;
}
.payment-methods {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.payment-logo {
  height: 50px;
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
