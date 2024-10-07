<template>
    <header>
        <div id="container__header">
            <div class="name_site">
                <h1><router-link to="/">Demo</router-link></h1>
            </div>
            <i class="fa-solid fa-bars" @click="toggleMenu"></i>
            <transition>
                <nav v-if="showMenu">
                    <ul>
                        <li>
                            <details>
                                <summary><i class="fa-solid fa-earth-americas"></i> Internacionales</summary>
                                <transition>
                                    <div class="sub_menu">
                                        <router-link v-for="intRute in internacionalesApi"
                                            to="#">{{ intRute.titulo
                                            }}</router-link>
                                    </div>
                                </transition>
                            </details>
                        </li>
                        <li>
                            <router-link> <i class="fa-solid fa-flag"></i> Nacionales</router-link>
                        </li>
                        <li>
                            <details>
                                <summary><i class="fa-solid fa-square-plus"></i> Más destinos</summary>
                                <transition>
                                    <div class="sub_menu">
                                        <router-link v-for="otherRute in otrosDestinosApi"
                                            :to="{ name: 'Otros', query: { url: otherRute.ruta } }">{{ otherRute.titulo
                                            }}</router-link>
                                    </div>
                                </transition>
                            </details>
                        </li>
                        <li><a href="#contacto"><i class="fa-solid fa-address-book"></i> Contacto</a></li>
                    </ul>
                </nav>

            </transition>
            <a id="button_header"><i class="fa-solid fa-money-bill"></i> 19.28 MXN</a>
        </div>
    </header>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const internacionalesApi = ref([]);
const otrosDestinosApi = ref([]);

const showMenu = ref(true);

const toggleMenu = () =>{
    showMenu.value = !showMenu.value;
}

onMounted(async () => {
    try {
        const response = await fetch('https://www.api.salonnefertaritravel.com/api/getInfo', {
            headers: {
                'x-api-key': '0d0e1d-cc8d04-ecd55e-a346e5-6e2ebc' // Reemplaza con tu clave de acceso
            }
        });

        if (!response.ok) {
            throw new Error('Acceso denegado o error en la solicitud');
        }

        const data = await response.json();
        internacionalesApi.value = data.internacionales;
        otrosDestinosApi.value = data.otrosDestinos;
    } catch (error) {
        console.error('Error al cargar la información: ', error);
    }
});
</script>

<style scoped>
header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.719);
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.377);
    z-index: 100;
    user-select: none;
}

#container__header {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1% 0;
    line-height: 1.5;
}

ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 5%;
    list-style: none;
}

details {
    transition: all 0.3s linear;
}

summary {
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s linear;
    border-radius: 5px;
    overflow: hidden;
}

#route {
    border: 2px solid #000;
}

details[open]>summary {
    border: 2px solid #000;
}

.sub_menu {
    width: 20%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1%;
    background: rgba(255, 255, 255, 0.548);
    backdrop-filter: blur(20px);
    z-index: 100;
    box-shadow: 0px 0px 20px 5px rgba(255, 255, 255, 0.116);
    top: 100%;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

details>*:not(summary) {
    opacity: 0;
    transition: all 0.5s ease;
}

details[open]>*:not(summary) {
    /* Ajusta esto según el tamaño de tu contenido */
    opacity: 1;
    transition: all 0.5s ease;
}

li {
    border-radius: 5px;
    text-wrap: nowrap;
    line-height: 1.5;
}

a {
    color: #000;
}

.sub_menu a {
    width: 100%;
    margin-bottom: 2%;
    text-align: left;
    padding: 5%;
    text-wrap: wrap;
    color: #000 !important;
}

.sub_menu a:hover {
    background: #00000046;
    transform: scale(1.05);
    box-shadow: 0px 0px 5px 1px rgba(7, 7, 7, 0.308);
}

#button_header {
    width: 15%;
    padding: 1%;
    background: #211E1C;
    color: #fff;
    text-align: center;
    text-wrap: nowrap;
}

#container__header > i{
    display: none;
}

@media screen and (max-width:900px) {
    #container__header{
        margin: 0 10% !important;
    }
    #container__header > i{
        display: flex;
    }
    #container__header nav{
        width: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.815);
        backdrop-filter: blur(5px);
        top: 90%;
        left: 0;
        z-index: 90 !important;
    }
    #container__header nav ul{
        width: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: inherit;
    }
    nav ul li{
        width: 80%;
        margin: 2%;
    }
    .sub_menu{
        width: 100%;
        position: relative;
        border: 2px solid #000;
    }
    #button_header{
        width: 40%;
    }
}
</style>