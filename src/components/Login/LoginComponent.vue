<template>
  <section
    class="flex flex-col items-center justify-center gap-4 h-[85dvh] min-w-[100dvw] p-5"
  >
    <div class="w-fit max-w-[300px] flex flex-col gap-6 items-center justify-between p-7 bg-white rounded-xl shadow-xl">
      <!-- <img class="w-[40dvw]" src="@/assets/img/logo_prefeitura_sp.png" alt="" /> -->
      <h1 class="exo font-bold text-2xl text-center">Bem-vindo(a)!</h1>
      <p class="text-center leading-tight">Insira suas credenciais para acessar a aplicação.</p>
      <div class="flex flex-col gap-1">
        <label class="font-semibold" for="">Login:</label>
        <InputText></InputText>
      </div>
      <div class="flex flex-col gap-1">
        <label class="font-semibold" for="">Senha:</label>
        <Password :feedback="false"></Password>
      </div>
      <Button label="Entrar" @click="$router.push('/admin')"></Button>
    </div>
  </section>
  <Toast position="bottom-right"/>

</template>

<script setup>
import { Button, InputText, Password, Toast } from 'primevue'
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter()

const show = () => {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
};

</script>

<style>
.p-panel-header {
  display: none !important;
}
</style>
