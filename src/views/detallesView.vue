<template>
    <section class="container_detalles">
        <div class="portada_detalles" :style="BackgroundStyle">
            <div class="title_section" data-aos="fade-down" data-aos-duration="1000">
                <h2>{{ DetallesApi.nombre }}</h2>
                <hr>
            </div>
        </div>
        <article>
            <div class="card" data-aos="fade-right" data-aos-duration="2000">
                <div class="content_img_card">
                    <img :src="DetallesApi.imagen" alt="">
                </div>
                <div class="detalles">
                    <h2>{{ DetallesApi.nombre }}</h2>
                    <h3 style="text-wrap: wrap;">Ciudades: {{ DetallesApi.ciudades }}</h3>
                    <h3><i class="fa-solid fa-sun"></i> Días: {{ DetallesApi.dias }} </h3>
                    <h3><i class="fa-solid fa-moon"></i> Noches: {{ DetallesApi.noches }} </h3>
                    <h4>A solo {{ DetallesApi.desde }} {{ DetallesApi.moneda }} !</h4>
                    <h6 v-for="(fechaLugar, index) in FechasDetallesApi" :key="index">Fecha: {{ fechaLugar.fecha }}</h6>
                </div>
            </div>
            <div class="card" data-aos="fade-left" data-aos-duration="2000">
                <div class="content_img_card">
                    <img :src="DetallesApi.imagen" alt="">
                </div>
                <div class="detalles">
                    <h2>{{ DetallesApi.nombre }}</h2>
                    <p style="text-wrap: wrap;"> {{ DetallesApi.descripcion }}</p>
                    <h3>Precio doble: {{ DetallesApi.precio_doble }}  {{ DetallesApi.moneda }}</h3>
                    <h3>Precio triple: {{ DetallesApi.precio_triple }}  {{ DetallesApi.moneda }}</h3>
                    <h3>Precio sencilla: {{ DetallesApi.precio_sencilla }}  {{ DetallesApi.moneda }}</h3>
                    <h3 v-if=" DetallesApi.precio_junior != 0">Precio Junior {{ DetallesApi.precio_junior }}  {{ DetallesApi.moneda }}</h3>
                </div>
            </div>
        </article>
    </section>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const url = ref(route.query.ciudad);

const props = defineProps({
    ciudad: {
        type: String,
        reqired: true,
        default: 'Puebla'
    }
});

const DetallesApi = ref([]);
const FechasDetallesApi = ref([]);
const imagenUrl = ref('')

const BackgroundStyle= computed(()=> ({
    backgroundImage: `url(${imagenUrl.value})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
}))

const fetchdataLugar = async () => {
    try {
        const response = await fetch(`https://www.api.salonnefertaritravel.com/api/getTripBySlug/${url.value}`, {
            headers: {
                'x-api-key': '0d0e1d-cc8d04-ecd55e-a346e5-6e2ebc' // Reemplaza con tu clave de acceso
            }
        });

        if (!response.ok) {
            throw new Error('Acceso denegado o error en la solicitud');
        }

        const data = await response.json()
        DetallesApi.value = data.viaje;
        FechasDetallesApi.value = data.viaje.fechas;
        imagenUrl.value = String(data.viaje.imagen)
    } catch (error) {
        console.error('Error al cargar la información: ', error);
    }
}


onMounted(() => {
    fetchdataLugar();
    // Elimina el query parameter de la barra de navegación
    /*
    const newUrl = window.location.pathname; // Obtén solo la ruta sin parámetros
    window.history.pushState({}, '', newUrl);
    */
}
);

// Observa los cambios en el query parameter `url`
watch(() => route.query.ciudad, (newUrl) => {
    url.value = newUrl || 'Puebla';
    fetchdataLugar(); // Actualiza los datos cada vez que `url` cambia
    /*
    // Elimina el query parameter de la barra de navegación
    const newUrl_2 = window.location.pathname; // Obtén solo la ruta sin parámetros
    window.history.pushState({}, '', newUrl_2);
    */
});
</script>

<style scoped>
.container_detalles {
    width: 100%;
    background: #ffffffd7;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.container_detalles h2 {
    text-transform: uppercase;
    margin: 2% 0;
    font-size: 2em;

}
.portada_detalles{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-attachment: fixed;
    background-size: cover;

}
.portada_detalles img{
    width: 100%;
    object-fit: cover;
}
.portada_detalles > .title_section{
    width: 100%;
    position: relative;
    padding: 20%;
    background: #00000071;
    backdrop-filter: blur(5px);
    color: #fff;
}

.container_detalles h5 {
    margin: 2% 0;
    font-size: 1.5em;
    font-weight: 400;
}

.container_detalles article {
    width: 100%;
    display: flex;
    padding: 0 10%;
    flex-direction: column;
    gap: 3%;
    margin: 2% 0;
}

.container_detalles article .card{   
    width: 90%;
    padding: 2%;
    border-radius: 5px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    transition: all 0.3s ease;
    background: #fff;
    margin-top: 2%;
}
.container_detalles article .card:nth-child(2n){
    margin-left: 10%;
}
.container_detalles article .card  p{
    margin: 2% 5%;
    font-weight: 300;
    text-align: left
}
.container_detalles article .card .detalles > h3{
    margin: 3%;
    padding: 2%;
    background: #202020;
    color: #fff;
    border-radius: 5px;
}
.container_detalles article .card .detalles > h4{
    width: 100%;
    padding: 3%;
    border: solid 2px #000;
    border-radius: 5px;
    margin: 2%;
    text-transform: uppercase;
}
.container_detalles article .card .detalles > h6{
    opacity: 0.8;
    margin: 2%;
    font-size: 1em;
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

@media screen and (max-width:700px) {
    .container_detalles article .card{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .container_detalles article .card:nth-child(2n){
        margin-left: 0;
    }

}
</style>