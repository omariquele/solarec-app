<template>
  <q-page class="flex flex-center bg-accent text-white">
    <div class="text-center">
      <img src="~assets/solarec-logo.png" alt="SOLAREC Logo" class="q-mb-md" />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/menu')
  }, 4000)
})
</script>

<style scoped>
/* Add your styles here */
</style>
