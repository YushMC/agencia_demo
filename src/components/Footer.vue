<template>
    <footer id ="contacto">
        <div class="content_footer">
            <div class="content_datos">
                <div>
                    <i class="fa-solid fa-location-dot"></i>
                    <div>
                        <h4>Ubicacion</h4>
                        <h6>{{ footerApi.direccion }} , {{ footerApi.ciudad }} , {{ footerApi.estado}}
                            <br>CP: {{ footerApi.cp }}
                        </h6>
                    </div>
                </div>
                <div>
                    <i class="fa-solid fa-phone"></i>
                    <div>
                        <h4>Teléfono</h4>
                        <h6>{{ footerApi.telefono}} </h6>
                    </div>
                </div>
                <div>
                    <i class="fa-solid fa-envelope"></i>
                    <div>
                        <h4>Correo Electrónico</h4>
                        <h6>{{ footerApi.correo }}</h6>
                    </div>
                </div>
            </div>
            <hr>
            <div class="content_datos">
                <div>
                    <h3><span style="font-weight: 300;">Agencia</span>Demo</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eaque expedita voluptatibus,
                        reiciendis sint provident iste. Ullam nesciunt ut id!</p>
                    <ul>
                        <li><i class="fa-brands fa-facebook"></i></li>
                        <li><i class="fa-brands fa-twitter"></i></li>
                        <li><i class="fa-brands fa-instagram"></i></li>
                        <li><i class="fa-brands fa-whatsapp"></i> {{ footerApi.whatsapp}}</li>
                    </ul>
                </div>
                <div>
                    <h4>Enlaces</h4>
                    <hr>
                    <ul>
                        <li>Internacionales</li>
                        <li>Nacionales</li>
                        <li>Más Destinos</li>
                        <li>¿Quienes Somos?</li>
                        <li>Contacto</li>
                    </ul>
                </div>
                <div>
                    <h4>Suscribirse</h4>
                    <hr>
                    <h6>Lorem ipsum dolor sit amet.</h6>
                    <div id="contact">
                        <input type="text">
                        <i class="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const footerApi = ref([])

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
        footerApi.value = data.contacto;
    } catch (error) {
        console.error('Error al cargar la información: ', error);
    }
});
</script>

<style scoped>
footer {
    width: 100%;
    display: flex;
    background: #211E1C;
}

.content_footer {
    width: 80%;
    margin: auto;
    padding: 3% 0;
    display: flex;
    flex-direction: column;
}

.content_datos {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    color: #fff;
    gap: 2%;
}

.content_datos>div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.content_datos>div>i {
    opacity: 0.8;
    font-size: 2em;
}
.content_datos > div > div{
    margin-left: 5%;
}
.content_datos > div > div >h6{
    margin: 2%;
    line-height: 1.5;
    font-weight: 400;
    font-size: 0.8em;
}

.content_datos:last-child {
    gap: 10%;
}

.content_datos:last-child div {
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: inherit !important;
    align-items: inherit !important;
}

.content_datos:last-child h3 {
    text-align: left;
    text-transform: uppercase;
}

.content_datos:last-child p {
    margin: 2%;
    line-height: 1.5;
    font-weight: 400;
}

.content_datos:last-child ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10% !important;
    list-style: none;
}

.content_datos:last-child ul li {
    padding: 2%;
    text-wrap: nowrap;
    cursor: pointer;
}

.content_datos:last-child div hr {
    margin: 2% 0;
    width: 50%;
}

hr {
    margin: 2% 0;
    border: none;
    height: 2px;
    background: rgba(255, 255, 255, 0.568);
}
#contact{
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 2%;
}
#contact input{
    width: 80%;
    padding: 1%;
    background: #c0c0c0;
    border: none;
    font-size: 1.5em;
    outline: none;
    font-weight: 200 !important;
}
#contact i{
    width: 20%;
    padding: 1%;
    background: #fff;
    color: #000;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
@media screen and (max-width:700px) {
    .content_datos{
        display: flex;
        flex-direction: column;
    }
    .content_datos > div{
        justify-content: inherit;
        margin: 3% 0;
    }
}
</style>