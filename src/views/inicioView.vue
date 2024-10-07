<template>
    <div class="portada">
        <Swiper :modules="modules" effect="coverflow" :coverflowEffect="{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        }" :autoplay="{ delay: 3000 }" :mousewheel="true" :keyboard="true" :loop="true" slidesPerView="auto"
            class="mySwiper">
            <SwiperSlide v-for="(lugar, index) in lugaresApi" :key="index">
                <div class="banner_img">
                    <img :src="lugar.imagen" alt="">
                    <div class="desc">
                        <h2>{{ lugar.titulo }}</h2>
                        <hr>
                        <p>{{ lugar.desc }}</p>
                        <router-link to="">Ver Más</router-link>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
    <section id="mas_vendidos">

        <article>
            <div class="title_section" data-aos="fade-down" data-aos-duration="1000">
                <h2>Los más vendidos</h2>
                <hr>
                <h5>Estos son nuestros viajes en tendencia!</h5>
            </div>
            <Swiper :slidesPerView="'auto'" :centeredSlides="true" :navigation="true" :spaceBetween="27" :pagination="{
                clickable: true,
            }" :modules="modules" :autoplay="{ delay: 3000 }" :mousewheel="true" :keyboard="true" class="mySwiper">
                <SwiperSlide v-for="(vendido, index) in vendidosApi" :key="index">
                    <div class="card">
                        <div class="content_img">
                            <img :src="vendido.imagen" alt="">
                        </div>
                        <h3>{{ vendido.nombre }}</h3>
                        <router-link :to="vendido.viaje">Ver más</router-link>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div class="title_section" data-aos="fade-down" data-aos-duration="1000">
                <h2>Novedades</h2>
                <hr>
                <h5>Estos son nuestros más recientes viajes!</h5>
            </div>
            <Swiper :slidesPerView="'auto'" :centeredSlides="true" :navigation="true" :spaceBetween="30" :pagination="{
                clickable: true,
            }" :modules="modules" :autoplay="{ delay: 3000 }" :mousewheel="true" :keyboard="true" class="mySwiper">
                <SwiperSlide v-for="(recent, index) in recentsApi" :key="index">
                    <div class="card">
                        <div class="content_img">
                            <img :src="recent.imagen" alt="">
                        </div>
                        <h3>{{ recent.nombre }}</h3>
                        <router-link :to="recent.viaje">Ver más</router-link>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div class="title_section" data-aos="fade" data-aos-duration="1000">
                <h2>Nuestra revista digital</h2>
                <div class="content_revista">
                    <div class="content_img">
                        <img :src="imgRevistaApi" alt="">
                    </div>
                    <div class="description">
                        <h5>En nuestra revista digital podrás encontrar los mejores viajes actualizados</h5>
                        <a :href="revistaApi" target="_blank">Descargar</a>
                    </div>
                </div>
            </div>
        </article>
    </section>
</template>

<script setup>
// Import Swiper Vue.js components
import { Pagination, Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';  // Importar el CSS base de Swiper
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';  // Importar los estilos de efecto coverflow
const modules = [Pagination, Autoplay, EffectCoverflow, Navigation];

import { onMounted, ref } from 'vue';

const lugaresApi = ref([]);
const vendidosApi = ref([])
const recentsApi = ref([])
const revistaApi = ref('')
const imgRevistaApi = ref('')
onMounted(async () => {
    try {
        const response = await fetch('https://www.api.salonnefertaritravel.com/api/getHome', {
            headers: {
                'x-api-key': '0d0e1d-cc8d04-ecd55e-a346e5-6e2ebc' // Reemplaza con tu clave de acceso
            }
        });

        if (!response.ok) {
            throw new Error('Acceso denegado o error en la solicitud');
        }

        const data = await response.json();
        lugaresApi.value = data.banner;
        vendidosApi.value = data.masvendidos;
        recentsApi.value = data.novedades;
        revistaApi.value = data.revista;
        imgRevistaApi.value = data.portada;
    } catch (error) {
        console.error('Error al cargar la información: ', error);
    }
});
</script>

<style scoped>
.portada {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.banner_img {
    width: 100%;
    display: flex;
}

.banner_img .desc {
    position: absolute;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
    padding: 10%;
    flex-direction: column;
    color: #fff;
    line-height: 1.5;
    border:solid 2px #f7f7f7;
    margin: 10%;
    box-shadow: 0px 0px 50px 5px rgba(0, 0, 0, 0.7);
    border-radius: 5px;
}

.desc h2 {
    font-size: 2em;
    font-weight: 800;
    margin-bottom: 2%;
}

.desc hr {
    width: 80%;
    border: none;
    height: 3px;
    background: #ffffff8f;
}

.desc p {
    margin: 4% 0;
    font-weight: 400;
}

.desc a {
    padding: 2% 5%;
    border: 2px solid #fff;
    border-radius: 5px;
    color: #fff;
}

#mas_vendidos {
    width: 100%;
    padding: 2% 10%;
    background: #ffffffd7;
    text-align: center;
}

#mas_vendidos h2 {
    text-transform: uppercase;
    margin: 2% 0;
    font-size: 2em;

}

#mas_vendidos h5 {
    margin: 2% 0;
    font-size: 1.5em;
    font-weight: 400;
}

section article {
    border: solid 2px #0000006b;
    padding: 2%;
    border-radius: 5px;
    background: #ffffff7e;
}

section .swiper-slide {
    width: 30% !important;
    background: none;
}

.card {
    margin: 10% 0;
    width: 100%;
    padding: 2%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    background: #fff;
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
@media screen and (max-width:900px) {
    .banner_img .desc{
        margin-top: 14%;
        padding: 5% !important;
    }
    .portada p{
        display: none;
    }
    .portada a {
        margin-top: 3%;
        font-size: 0.8em;
    }
}
@media screen and (max-width:700px) {
    .portada p {
        display: none;
    }

    .portada h2 {
        font-size: 1em;
    }
    .portada {
        height: 150%;
    }
    .banner_img .desc{
        margin-top: 18% !important;
        padding: 5%;
    }
    section .swiper-slide{
        width: 80% !important;
    }
    .content_revista{
        display: flex;
        flex-direction: column;
    }
    .content_revista .content_img{
        width: 100%;
    }
    .content_revista .description{
        width: 100%;
    }
}
</style>