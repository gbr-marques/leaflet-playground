<template>
  <div class="flex flex-col gap-6 w-full">
    <h2 class="text-lg font-bold text-center leading-0.8">Registro de atendimentos</h2>
    <p class="text-center m-0 leading-tight">
      Preencha os campos abaixo com os dados dos atendimentos realizados a cada hora.
    </p>
    <div class="flex flex-col gap-1 w-full">
      <label>Atendimentos:</label>
      <InputNumber :use-grouping="false"></InputNumber>
    </div>
    <div class="flex flex-col gap-1 w-full">
      <label>Atendimentos:</label>
      <InputNumber :use-grouping="false"></InputNumber>
    </div>
    <div class="flex flex-col gap-1 w-full">
      <label>Atendimentos:</label>
      <InputNumber :use-grouping="false"></InputNumber>
    </div>
    <Button label="Salvar" icon="pi pi-save"></Button>
  </div>
</template>

<script setup lang="ts">
import { Button, InputNumber } from 'primevue'
</script>

<style scoped></style>
