<template>
  <v-app>
    <v-app-bar
      app
      color="purple"
      dark
    >
      <h1 class="mr-8" @click="$router.push('/')">Crypto Exchange</h1>
      <v-btn text @click="$router.push('graficos')">
      Ver Graficos de Variância
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>


<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;


  .chart-container {
    position: relative;
    margin: 0 auto;
    padding: 0 1rem;
    padding-bottom: 1rem;
    height: auto;
    width: 1400px;
    max-height: 400px;
  }
}
</style>
