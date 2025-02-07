<template>
  <div class="flex flex-col gap-5">
    <h2 class="text-lg font-bold text-center leading-0.8">Gerenciamento de usuários</h2>
    <p class="text-center leading-tight">Clique sobre um usuário para visualizar, editar ou excluir suas informações.</p>
    <div class="flex gap-4 justify-between">
      <InputText placeholder="Pesquisar usuários..." class="w-full"></InputText>
      <Button icon="pi pi-user-plus" @click="visibleRegister = true"></Button>
    </div>
    <DataTable :value="userList" :striped-rows="true" :scrollable="true" scroll-height="320px">
      <Column field="nome" header="Usuário">
        <template #body="slotProps">
          <div class="flex flex-col gap-1" @click="visibleEdit = true, editedUser = slotProps.data">
            <span class="block"> {{ slotProps.data.nome }}</span>
            <span class="text-sm flex items-center gap-1 text-gray-400"
              ><i class="pi pi-map-marker text-sm"></i>
              {{ getMarkerName(slotProps.data.marker) }}</span
            >
          </div>
        </template></Column
      >
      <!-- <Column field="marker" header="Ponto">
        <template #body="slotProps">
          {{ getMarkerName(slotProps.data.id) }}
        </template>
      </Column> -->
    </DataTable>
  </div>
  <Dialog v-model:visible="visibleRegister" header="Cadastrar usuário" modal class="w-[80dvw]">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label>Nome:</label>
        <InputText placeholder="Nome do usuário"></InputText>
      </div>
      <div class="flex flex-col gap-2">
        <label>Login:</label>
        <InputText placeholder="Login de acesso"></InputText>
      </div>
      <div class="flex flex-col gap-2">
        <label>Ponto de apoio:</label>
        <Select
          placeholder="Selecione o ponto de apoio"
          :options="markers"
          option-value="id"
          option-label="name"
        ></Select>
      </div>
      <Button label="Cadastrar"></Button>
    </div>
  </Dialog>
  <Dialog header="Editar usuário" v-model:visible="visibleEdit" modal>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label>Nome:</label>
        <InputText placeholder="Nome do usuário" v-model="editedUser.nome"></InputText>
      </div>
      <div class="flex flex-col gap-2">
        <label>Login:</label>
        <InputText placeholder="Login de acesso" v-model="editedUser.login"></InputText>
      </div>
      <div class="flex flex-col gap-2">
        <label>Ponto de apoio:</label>
        <Select
          v-model="editedUser.marker"
          placeholder="Selecione o ponto de apoio"
          :options="markers"
          option-value="id"
          option-label="name"
        ></Select>
      </div>
      <Divider></Divider>
      <Button label="Salvar" icon="pi pi-save"></Button>
      <Button label="Excluir usuário" severity="danger" icon="pi pi-trash"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { Button, Column, DataTable, Dialog, Divider, InputText, Select } from 'primevue'
import { ref } from 'vue'

const visibleRegister = ref(false)
const visibleEdit = ref(false)

const markers = ref([
  // Centro
  {
    id: 1,
    zone: 'Centro',
    img: 'https://tourb.com.br/img/lugares/sao-paulo/praca-da-se-1.jpg',
    name: 'Praça da Sé',
    lat: -23.55052,
    lng: -46.63331,
    description: 'Marco zero da cidade de São Paulo.',
  },
  {
    id: 2,
    zone: 'Centro',
    img: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/ROGERIOCASSIMIRO_MERCADOMUNICIPAL_SAOPAULO_SP_%2840066551745%29.jpg',
    name: 'Mercadão de São Paulo',
    lat: -23.54112,
    lng: -46.62734,
    description: 'Famoso mercado municipal com grande variedade de produtos.',
  },
  {
    id: 3,
    zone: 'Centro',
    img: 'https://tourb.com.br/img/lugares/sao-paulo/galeria-do-rock-2.jpg',
    name: 'Galeria do Rock',
    lat: -23.5457,
    lng: -46.6385,
    description: 'Centro comercial famoso por lojas de música e moda alternativa.',
  },
  {
    id: 4,
    zone: 'Centro',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Teatro_Municipal_de_S%C3%A3o_Paulo_8.jpg/1200px-Teatro_Municipal_de_S%C3%A3o_Paulo_8.jpg',
    name: 'Theatro Municipal',
    lat: -23.5452,
    lng: -46.6388,
    description: 'Importante espaço para apresentações de ópera e música clássica.',
  },
  {
    id: 5,
    zone: 'Centro',
    img: 'https://www.papoimobiliario.com/wp-content/uploads/2023/06/Edificio-Copan-O-gigante-de-Niemeyer.png',
    name: 'Edifício Copan',
    lat: -23.5489,
    lng: -46.6415,
    description: 'Ícone da arquitetura modernista, projetado por Oscar Niemeyer.',
  },

  // Zona Sul
  {
    id: 6,
    zone: 'Sul',
    img: 'https://parqueibirapuera.org/wp/wp-content/uploads/2016/03/RN-Ibirapuera-Aerea-20150121-5-1-foto-destacada-resized.jpg',
    name: 'Parque Ibirapuera',
    lat: -23.58741,
    lng: -46.65761,
    description: 'Um dos maiores parques urbanos de São Paulo.',
  },
  {
    id: 7,
    zone: 'Sul',
    img: 'https://visite.museus.gov.br/wp-content/uploads/tainacan-items/14/251042/Reforma-Museu-do-Ipiranga-HF-SP-5-webp._Olho10689.webp',
    name: 'Museu do Ipiranga',
    lat: -23.56137,
    lng: -46.62315,
    description: 'Museu histórico e um dos principais pontos turísticos da cidade.',
  },
  {
    id: 8,
    zone: 'Sul',
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/1d/07/c4/ponte-estaiada-octavio.jpg?w=1200&h=1200&s=1',
    name: 'Ponte Estaiada',
    lat: -23.6154,
    lng: -46.6972,
    description: 'Símbolo arquitetônico moderno da cidade sobre o Rio Pinheiros.',
  },
  {
    id: 9,
    zone: 'Sul',
    img: 'https://www.vivareal.com.br/blog/wp-content/uploads/2024/02/aquario-de-sp.jpeg.webp',
    name: 'Aquário de São Paulo',
    lat: -23.5895,
    lng: -46.6021,
    description: 'Maior aquário da América Latina com diversas espécies marinhas.',
  },
  {
    id: 10,
    zone: 'Sul',
    img: 'https://www.sescsp.org.br/wp-content/uploads/2021/12/Pompeia-Renato-Parada.jpg',
    name: 'SESC Pompeia',
    lat: -23.5271,
    lng: -46.6785,
    description: 'Centro cultural com exposições, teatro e lazer.',
  },

  // Zona Norte
  {
    id: 11,
    zone: 'Norte',
    img: 'https://www.spleituras.org.br/galeria/crop.php?arquivo=bsp-noticias-7932-parque-da-juventude-4.jpg&largura=1280&altura=720',
    name: 'Parque da Juventude',
    lat: -23.5115,
    lng: -46.6255,
    description: 'Parque construído onde era o presídio do Carandiru.',
  },
  {
    id: 12,
    zone: 'Norte',
    img: 'https://grupospimovel.s3.amazonaws.com/Imagens/Noticias/Sistema/mercado-imobiliario/Parque_Horto_Florestal.jpg',
    name: 'Horto Florestal',
    lat: -23.4825,
    lng: -46.6333,
    description: 'Parque com trilhas, lagos e vegetação nativa.',
  },
  {
    id: 13,
    zone: 'Norte',
    img: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/16684_3B5495DD2E40D8B9.jpg',
    name: 'Sambódromo do Anhembi',
    lat: -23.5288,
    lng: -46.6552,
    description: 'Palco principal do carnaval paulistano.',
  },
  {
    id: 14,
    zone: 'Norte',
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Mirante_de_Santana_2024.jpg',
    name: 'Mirante de Santana',
    lat: -23.4872,
    lng: -46.6297,
    description: 'Ponto de observação com vista panorâmica da cidade.',
  },
  {
    id: 15,
    zone: 'Norte',
    img: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Parque_Estadual_da_Cantareira_-_N%C3%BAcleo_da_Pedra_Grande.JPG',
    name: 'Parque Estadual da Cantareira',
    lat: -23.4563,
    lng: -46.6309,
    description: 'Reserva natural com trilhas e cachoeiras.',
  },

  // Zona Leste
  {
    id: 16,
    zone: 'Leste',
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/72/78/36/parque-do-carmo.jpg?w=1200&h=1200&s=1',
    name: 'Parque do Carmo',
    lat: -23.5736,
    lng: -46.4755,
    description: 'Grande parque conhecido pela Festa das Cerejeiras.',
  },
  {
    id: 17,
    zone: 'Leste',
    img: 'https://www.sescsp.org.br/wp-content/uploads/2021/12/teste-belenzinho-1-1.png',
    name: 'SESC Belenzinho',
    lat: -23.5409,
    lng: -46.5871,
    description: 'Centro cultural com diversas atividades esportivas e artísticas.',
  },
  {
    id: 18,
    zone: 'Leste',
    img: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWLN2JIJaPUXyWg_iBbkGUiI50cjz5q9eooNyE-uX_E1rNxQd3ePP2uys3bNZ5hJ8jlEW4sKKk_JDeeVpHYex70HqGwIMu2shmdCzPaDAxmsd_mRo_iv7JuX_0L3PyH1zO_AOIrq2s6HM/s1600/DSC03237.jpg',
    name: 'Parque Piqueri',
    lat: -23.5252,
    lng: -46.5658,
    description: 'Parque com áreas de lazer e vegetação preservada.',
  },
  {
    id: 19,
    zone: 'Leste',
    img: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/04/neo-quimica-arena-corinthians-e1712963406226.jpg?w=1080',
    name: 'Arena Corinthians',
    lat: -23.5453,
    lng: -46.4731,
    description: 'Estádio sede da Copa do Mundo de 2014.',
  },
  {
    id: 20,
    zone: 'Leste',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Igreja_da_Penha_by_Diego_Baravelli_III.jpg/1200px-Igreja_da_Penha_by_Diego_Baravelli_III.jpg',
    name: 'Catedral da Penha',
    lat: -23.5447,
    lng: -46.5404,
    description: 'Igreja histórica localizada no bairro da Penha.',
  },

  // Zona Oeste
  {
    id: 21,
    zone: 'Oeste',
    img: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/S%C3%A3o_Paulo_Skyline_Marginal_Pinheiros.JPG',
    name: 'Parque Villa-Lobos',
    lat: -23.5495,
    lng: -46.7301,
    description: 'Parque com ciclovias, áreas esportivas e culturais.',
  },
  {
    id: 22,
    zone: 'Oeste',
    img: 'https://images.adsttc.com/media/images/6112/33b9/f91c/81a4/ec00/00fe/large_jpg/MIS-Copacabana-photo_by_Paul_Clemence__(6).jpg?1628582806',
    name: 'MIS - Museu da Imagem e do Som',
    lat: -23.5611,
    lng: -46.6969,
    description: 'Museu com exposições interativas de arte e mídia.',
  },
  {
    id: 23,
    zone: 'Oeste',
    img: 'https://arquitetura.vivadecora.com.br/wp-content/uploads/2020/11/Instituto-Tomie-Ohtake-fachada-foto-danielf99.jpg',
    name: 'Instituto Tomie Ohtake',
    lat: -23.5672,
    lng: -46.6933,
    description: 'Centro de arte contemporânea e arquitetura.',
  },
  {
    id: 24,
    zone: 'Oeste',
    img: 'https://images.infrafm.com.br/arquivos/allianzparque_3RE0H5.jpg',
    name: 'Allianz Parque',
    lat: -23.5273,
    lng: -46.6788,
    description: 'Estádio do Palmeiras, palco de shows e eventos.',
  },
  {
    id: 25,
    zone: 'Oeste',
    img: 'https://www.melhoresdestinos.com.br/wp-content/uploads/2020/02/beco-do-batman-capa2019-01.jpg',
    name: 'Beco do Batman',
    lat: -23.5612,
    lng: -46.6801,
    description: 'Famosa galeria de arte urbana ao ar livre.',
  },
])

const userList = ref([
  {
    id: 1,
    nome: 'Gabriel Santos',
    login: 'x123456',
    marker: 5,
  },
  {
    id: 2,
    nome: 'Ana Oliveira',
    login: 'x654321',
    marker: 12,
  },
  {
    id: 3,
    nome: 'Bruno Lima',
    login: 'x789012',
    marker: 19,
  },
  {
    id: 4,
    nome: 'Paulo Souza',
    login: 'x345678',
    marker: 3,
  },
  {
    id: 5,
    nome: 'Gabi Ferreira',
    login: 'x901234',
    marker: 22,
  },
])

const editedUser:any = ref({})

const getMarkerName = (markerId: number) => {
  return markers.value.find((m) => m.id === markerId)?.name
}
</script>

<style scoped></style>
