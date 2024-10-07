<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Header></Header>
  <main>
    <router-view>

    </router-view>
  </main>
  <Footer>
  </Footer>
</template>

<style scoped>
main{
  width: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
}
</style>
