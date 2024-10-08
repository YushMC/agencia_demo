<template>
    <section class="container_nacionales">
        <div class="title_section" data-aos="fade-down" data-aos-duration="1000">
            <h2>{{ eliminarGuiones(url) }}</h2>
            <hr>
        </div>
        <article>
            <div class="card" v-for="(lugar, index) in otrosLugaresApi" :key="index">
                <div class="content_img_card">
                    <img :src="lugar.imagen" alt="">
                </div>
                <div class="detalles">
                    <h3 style="font-weight: 800;">{{ lugar.nombre }}</h3>
                    <h3>Días: {{ lugar.dias }} </h3>
                    <h3>Noches: {{ lugar.noches }} </h3>
                    <h4>Precio: {{ lugar.desde }} </h4>
                    <router-link :to="{ 
                        name: 'Detalles',
                        query: {ciudad : lugar.enlace}
                    }">Detalles</router-link>
                </div>
            </div>
        </article>
    </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const url = ref(route.query.url || 'Puebla');

const props = defineProps({
    url: {
        type: String,
        reqired: true,
        default: 'Puebla'
    }
});
function eliminarGuiones(texto) {
  return texto.replace(/-/g, ' ');
}

const otrosLugaresApi = ref([]);


const fetchdataOthers = async () => {
    try {
        const response = await fetch(`https://www.api.salonnefertaritravel.com/api/getTripsBySlug/${url.value}`, {
            headers: {
                'x-api-key': '0d0e1d-cc8d04-ecd55e-a346e5-6e2ebc' // Reemplaza con tu clave de acceso
            }
        });

        if (!response.ok) {
            throw new Error('Acceso denegado o error en la solicitud');
        }

        const data = await response.json()
        otrosLugaresApi.value = data.viajes;
        
    } catch (error) {
        console.error('Error al cargar la información: ', error);
    }
}


onMounted(() => {
    fetchdataOthers();
    // Elimina el query parameter de la barra de navegación
    /*
    const newUrl = window.location.pathname; // Obtén solo la ruta sin parámetros
    window.history.pushState({}, '', newUrl);
    */
}
);

// Observa los cambios en el query parameter `url`
watch(() => route.query.url, (newUrl) => {
    url.value = newUrl || 'Puebla';
    fetchdataOthers(); // Actualiza los datos cada vez que `url` cambia
    /*
    // Elimina el query parameter de la barra de navegación
    const newUrl_2 = window.location.pathname; // Obtén solo la ruta sin parámetros
    window.history.pushState({}, '', newUrl_2);
    */
});
</script>

<style scoped>
.container_nacionales {
    width: 100%;
    padding: 10%;
    background: #ffffffd7;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.container_nacionales h2 {
    text-transform: uppercase;
    margin: 2% 0;
    font-size: 2em;

}

.container_nacionales h5 {
    margin: 2% 0;
    font-size: 1.5em;
    font-weight: 400;
}

.container_nacionales article {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3%;
    margin-top: 5%;
}

.card {
    width: 100%;
    padding: 2%;
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    transition: all 0.3s ease;
    background: #fff;
}

.card .content_img_card {
    width: 100%;

}

.content_img_card img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 1/1;
}

.card h3 {
    overflow: hidden;
    width: 100%;
    font-weight: 400;
    text-wrap: nowrap;
    padding: 5%;
    text-overflow: ellipsis;
}

.card a {
    width: 100%;
    margin: 5%;
    padding: 2%;
    border: 2px solid #000;
    color: #000;
    text-align: center;
    text-transform: uppercase
}

.card:hover {
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.7);
    transform: scale(1.04);
}
.card .detalles{
    width: 95%;
    display: flex;
    flex-direction: column;
}

.content_revista {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 5%;
    flex-wrap: wrap;
    background: #fff;
    border-radius: 10px;
}

.content_revista .content_img {
    width: 40%;
    padding: 2%;
}

.content_revista .content_img img {
    width: 100%;
    transition: all 0.3s ease;

}

.content_revista .content_img img:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 90px 4px rgba(0, 0, 0, 0.7);
}

.content_revista .description {
    width: 48%;
    text-align: left;
    display: flex;
    flex-direction: column;
}

.content_revista a {
    padding: 5%;
    color: #000;
    margin-top: 5%;
    text-transform: uppercase;
    border: solid 2px #000;
    transition: all 0.3s linear;
}

.content_revista a:hover {
    background: #211E1C;
    color: #fff;
    transform: scale(1.05)
}

@media screen and (max-width:800px) {
    .container_nacionales{
        margin-top: 5%;
    }
    .card{
        display: flex;
        flex-direction: column;
    }
}
</style>