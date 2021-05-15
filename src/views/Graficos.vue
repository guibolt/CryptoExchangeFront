<template>
  <v-container>
  <v-layout justify-center >
  <v-flex xs12 sm4 class="mt-8">

         <v-select
          :items="coinsLst"
          item-text="name"
          item-value="symbol"
          v-model="fistCoinSelected"
          label="Selecione a primeira moeda"
           class="mt-2"
          solo
          
        ></v-select>
        
            <v-select
          :items="coinsLst"
          item-text="name"
          item-value="symbol"
          v-model="secondCoinSelected"
          label="Selecione a segunda moeda"
          solo
      
        ></v-select>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Selecione a data inicial"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

          <v-layout justify-center >
          <div style="width:70%">
           <v-btn @click="graficSearch"
          block
          color="purple"
          :loading="loading"
          >
          <span style="color:white">
          Buscar
          </span>
          </v-btn>
          </div>
     
     </v-layout>

      </v-flex>
   
  </v-layout>
  <v-row justify="center" class="mt-5" >
    <Chart v-if="chartData.datasets" :chartData="chartData" />
    </v-row>
 
  </v-container>
</template>

<script>
import Chart from '../components/Chart.vue'
import {mapState,mapActions,mapMutations} from 'vuex'

  export default {
      name: 'Principal',
  components: { Chart },

    data: () => ({
      fistCoinSelected: '',
      secondCoinSelected: '',
      date : '',
      menu : false
    }),

    computed:{
      ...mapState('moduloPrincipal',['chartData','coinsLst','loading'])
    },
    methods:{
      ...mapActions('moduloPrincipal',['getCoinHistory','getCoins']),
      async graficSearch(){
        
         var options = {
             firstCoin : this.fistCoinSelected,
             secondCoin : this.secondCoinSelected,
             date : this.date
         }

        await this.getCoinHistory(options)
      },
   
    },

    async created() {
        await this.getCoins()
     
    },
  }
  
</script>

<style >
  .chart-container {
    position: relative;
    margin: 0 auto;
    padding: 0 1rem;
    padding-bottom: 1rem;
    height: 400px;
    width: 80%;
    min-height: 400px;
  }
</style>