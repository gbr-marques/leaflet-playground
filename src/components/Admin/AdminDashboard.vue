<template>
  <div class="flex flex-col gap-5 w-full">
    <Button
      class="w-full"
      label="Cadastrar dados"
      icon="pi pi-plus-circle"
      @click="$router.push('/admin/form')"
    ></Button>
    <Button class="w-full" label="Gerenciar usuários" icon="pi pi-users" @click="$router.push('/admin/users')"></Button>
    <!-- <Button class="w-full" label="Gerenciar pontos" icon="pi pi-map-marker" @click="$router.push('/admin/form')"></Button> -->
  </div>
</template>

<script setup lang="ts">
import { Button } from 'primevue';

</script>

<style scoped></style>
