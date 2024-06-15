<template>
  <q-page class="no-internet-page">
    <q-card>
      <q-card-section>
        <div class="text-h6">Sem Conexão com a Internet</div>
        <div class="text-subtitle1 q-my-md">Por favor, verifique sua conexão com a internet e tente novamente.</div>
        <q-btn
          @click="retry"
          label="Tentar Novamente"
          color="primary"
          class="full-width q-my-md"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'NoInternet',
  methods: {
    retry() {
      if (navigator.onLine) {
        this.$router.push('/');
      } else {
        this.$q.notify({
          type: 'negative',
          message: 'Ainda sem conexão com a internet.',
        });
      }
    },
    goBackOnline() {
      this.$router.push('/menu');
    },
  },
  created() {
    window.addEventListener('online', this.goBackOnline);
  },
  unmounted() {
    window.removeEventListener('online', this.goBackOnline);
  },
};
</script>

<style scoped>
.no-internet-page {
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
</style>
