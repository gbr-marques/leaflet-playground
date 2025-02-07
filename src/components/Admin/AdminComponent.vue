<template>
  <section class="flex flex-col items-center justify-center gap-5 h-[85dvh] min-w-[100dvw] p-5">
    <div
      class="w-[90dvw] flex flex-col gap-5 items-center justify-between p-5 bg-white rounded-xl shadow-xl"
    >
      <h1 class="exo font-bold text-3xl text-center">Área adminstrativa</h1>
      <div class="flex justify-between items-center text-sm text-gray-500 gap-3 bg-gray-200 rounded-xl py-2 px-3">
        <div class="flex flex-col gap-1">
          <span class="flex items-center gap-3"><i class="pi pi-user"></i>João da Silva </span>
          <span class="flex items-center gap-3"><i class="pi pi-map-marker"></i>Parque Ibirapuera</span>
        </div>
        <Divider layout="vertical"></Divider>
        <Button severity="secondary" icon="pi pi-home" @click="router.push('/admin')"></Button>
        <Button severity="secondary" icon="pi pi-sign-out" @click="visibleLogout = true"></Button>
      </div>

      <RouterView></RouterView>
    </div>
  </section>
  <Dialog header="Deseja mesmo sair?" v-model:visible="visibleLogout" class="w-[80dvw]" modal>
    <div class="flex flex-col gap-4">
      <Button
        label="Sair"
        icon="pi pi-sign-out"
        severity="danger"
        class="w-full"
        @click="$router.push('/login')"
      ></Button>
      <Button
        label="Voltar"
        icon="pi pi-replay"
        severity="secondary"
        class="w-full"
        @click="visibleLogout = false"
      ></Button>
    </div>
  </Dialog>
  <!-- <Popover ref="op" position="right" style="">
    <div class="flex flex-col gap-4 w-[fit]">
      <Button label="Sair" severity="danger" icon="pi pi-sign-out"></Button>
    </div>
  </Popover> -->
  <Toast position="bottom-right" />
</template>

<script setup>
import { Button, Dialog, Divider, InputText, Popover, Toast } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

const visibleLogout = ref(false)

const show = () => {
  toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 })
}

const op = ref()

const toggle = (event) => {
  op.value.toggle(event)
}
</script>

<style>

.p-divider {
  --p-divider-border-color: rgb(194, 194, 194) !important;
}

</style>
