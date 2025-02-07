<template>
  <section
    class="flex flex-col items-center justify-between gap-5 h-[85dvh] min-w-[100dvw] p-5"
  >
    <h1 class="exo font-bold text-white text-2xl">Pontos de apoio Carnaval 2025</h1>
    <Button @click="$router.push('/login')" label="Área administrativa"></Button>
    <div id="map" class="w-[85%] h-[100%] rounded-2xl relative shadow-xl">
      <div class="z-500 flex gap-3 absolute right-[20px] bottom-[20px]">
        <Button rounded icon="pi pi-sliders-h" @click="visibleFilter = true"></Button>
        <ButtonGroup vertical>
          <Button icon="pi pi-minus" @click="map.zoomOut()"></Button>
          <Button icon="pi pi-plus" @click="map.zoomIn()"></Button>
        </ButtonGroup>
      </div>
    </div>

  </section>
  <!-- <Button label="Teste"></Button> -->
  <Dialog v-model:visible="visibleInfo" close-icon="false" :show-header="false" modal>
    <div class="pt-5 w-[70dvw] flex flex-col justify-between items-center text-center gap-3">
      <img :src="selectedMarker.img" :alt="selectedMarker.name" class="rounded" />
      <h5 class="exo text-2xl font-bold">{{ selectedMarker.name }}</h5>
      <span>{{ selectedMarker.description }}</span>
      <Divider></Divider>
      <div class="flex justify-between w-full">
        <div class="flex flex-col gap-2">
          <h5>Atendimentos</h5>
          <span class="exo text-4xl font-semibold">96</span>
        </div>
        <div class="flex flex-col gap-2">
          <h5>Médicos</h5>
          <span class="exo text-4xl font-semibold">3</span>
        </div>
        <div class="flex flex-col gap-2">
          <h5>Enfermeiros</h5>
          <span class="exo text-4xl font-semibold">6</span>
        </div>
      </div>
      <Button label="Fechar" class="w-fit" @click="visibleInfo = false"></Button>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="visibleFilter"
    header="Filtre quais pontos você gostaria de visualizar"
    modal
    class="w-[]"
  >
    <div class="flex flex-col gap-3">
      <div v-for="zone in zones" :key="zone" class="flex gap-3">
        <Checkbox v-model:model-value="filteredZones" :value="zone" name="filteredZones"></Checkbox>
        {{ zone }}
      </div>
      <Button style="" label="Filtrar" @click="filterZones(filteredZones)"></Button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import { Button, ButtonGroup, Checkbox, Dialog, Divider } from 'primevue'
import { useRouter } from 'vue-router'

const router = useRouter()

const visibleInfo = ref(false)
const visibleFilter = ref(false)

const map = ref(null)

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
const markerGroup = ref(null)
const selectedMarker = ref(null)

const zones = ['Norte', 'Sul', 'Leste', 'Oeste', 'Centro']
const filteredZones = ref([])

onMounted(() => {
  map.value = L.map('map').setView([-23.627974, -46.624194], 10.5)

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {}).addTo(map.value)

  markerGroup.value = L.layerGroup().addTo(map.value)

  createMarkers(markers.value)

})

const createMarkers = (markersList) => {
  markersList.forEach((marker) => {
    const leafletMarker = L.marker([marker.lat, marker.lng])
      .addTo(markerGroup.value)  // Adicionando ao grupo de marcadores
      .bindPopup(`
      <div class="popup">
        <img src="${marker.img}" alt="Marker Image" class="popup-img">
        <h5 class="exo">${marker.name}</h5>
        <p>${marker.description}</p>
        <button class=" p-button open-dialog " data-id="${marker.id}">Abrir</button>
      </div>
    `)

    // console.log("Marcador criado");
    // Evento de clique no marcador
    // document.getElementsByClassName('dialog-button').on('click', (e) => {
    //   visibleInfo.value = true          // Abre o modal
    // })
  })

  // markerGroup.value.clearLayers()

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('open-dialog')) {
      const markerId = event.target.getAttribute('data-id')
      selectedMarker.value = markers.value.find((m) => m.id == markerId)
      visibleInfo.value = true
      // console.log(selectedMarker.value)
    }
  })
}

// Função para limpar os marcadores
const clearMarkers = () => {
  // console.log('clearMarkers chamado')
  markerGroup.value.clearLayers() // Limpa as camadas dentro do FeatureGroup
  if (markerGroup.value) {
    markerGroup.value.clearLayers() // Limpa as camadas dentro do FeatureGroup
  } else {
    console.error('markerGroup não foi definido')
  }
}

const filterZones = (filteredZones) => {

  // console.log('filterZones chamado')

  if (filteredZones.length > 0) {
    console.log('Possui zonas')
    const marcadoresFiltrados = markers.value.filter((marker) => {
      if (filteredZones.includes(marker.zone)) {
        return marker
      }
    })
    // console.log(marcadoresFiltrados)

    // Limpa os filtros existentes
    clearMarkers()
    // Adiciona os marcadores filtrados
   createMarkers(marcadoresFiltrados)
  } else {
    // Limpa os filtros existentes
    clearMarkers()
    // Re-renderiza todos os marcadores existentes
    createMarkers(markers.value)
  }
  // Oculta o modal de filtro
  visibleFilter.value = false

  markers.value.forEach(marker => map.value.removeLayer(marker))

}
</script>

<style>
#map {
  width: 90dvw;
  max-width: 1550px;
}

section {
  background-size: cover;
}

.leaflet-popup-content {
  width: 100%;
  margin: 0.5rem;
}

.leaflet-pane .leaflet-map-pane {
  z-index: 100;
}

.leaflet-popup-content-wrapper {
  border-radius: 1rem;
}

.popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.7rem;
  padding: 0.5rem !important;
  img {
    object-fit: cover;
    width: 100%;
    max-width: 300px;
    height: 280px;
    border-radius: 0.5rem;
  }
  h5 {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1;
  }
  p {
    font-size: 1rem;
    margin: 0;
  }
  b {
    font-size: 1rem;
  }
}

.leaflet-control {
  display: none;
}

.leaflet-popup-close-button {
  top: 20px !important;
  right: 20px !important;
  color: black !important;
  span {
    font-size: 1rem !important;
  }
}

.p-divider {
  margin: 0 !important;
  padding: 0 !important;
}

/* .p-buttongroup {
  rotate: 90deg;
} */
</style>
