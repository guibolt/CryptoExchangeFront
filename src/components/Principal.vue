<template>
  <v-container>
  <v-layout justify-center >
  <v-flex xs12 sm4 class="mt-8">
  <label>Trocar</label>
         <v-select
          :items="coinsLst"
          item-text="name"
          item-value="symbol"
          v-model="fistCoinSelected"
          label="Selecione a moeda"
           class="mt-2"
          solo
          
        ></v-select>
     <label>Por</label>
            <v-select
          :items="coinsLst"
          item-text="name"
          item-value="symbol"
          v-model="secondCoinSelected"
          label="Selecione a moeda"
          solo
      
        ></v-select>
          <v-layout justify-center >
          <div style="width:70%">
           <v-btn @click="exchangeSearch"
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

        <h3 v-if="exchangeLst.length > 0" class="mt-5">Exchange rate: {{exchangeobj.coinRate.toFixed(5)}}</h3>
         <h4 v-if="exchangeLst.length > 0">Data: {{exchangeobj.requestDate}}</h4>
      <v-layout justify-center class="mt-8">
        <br/>
        
      <h2 v-if="exchangeLst.length > 0">Exchanges:</h2>
    
    <v-row align-content="space-between" class="mt-10">
     <v-card
    class="mx-2 my-2"
    width="210"
    elevation="24"
   
    outlined
    v-for="exchange in exchangeLst"
    :key="exchange.asset"
    :style="{ borderColor:exchange.spotlight}"
   
  >
    <v-list-item three-line>
      <v-list-item-content>
       
        <v-list-item-title class="headline mb-1">
       {{ exchange.asset}}
        </v-list-item-title>
        <v-list-item-subtitle>Rate: {{exchange.rate.toFixed(3)}}</v-list-item-subtitle>
      </v-list-item-content>


    </v-list-item>

  </v-card>
    </v-row>
        </v-layout>
   

  </v-container>
</template>

<script>
import {mapState,mapActions} from 'vuex'
  export default {
    name: 'Principal',

    data: () => ({
      fistCoinSelected: '',
      secondCoinSelected: '',
      exchangeLst : []
    }),

    computed:{
      ...mapState('moduloPrincipal',['coinsLst','exchangeobj','loading'])
    },
    methods:{
      ...mapActions('moduloPrincipal',['getCoins','getExchangeRates']),
      async exchangeSearch(){
        let requestOptions = {
         firstCoin: this.fistCoinSelected,
         secondCoin : this.secondCoinSelected
        }

      await this.getExchangeRates(requestOptions)
      this.exchangeLst = this.exchangeobj.exchanges
  
      },
      getAssetTitle(symbol) {
        let coin = this.coinsLst.find(x => x.symbol == symbol)
        return coin.name 
      }
    },

    async created() {
        await this.getCoins()
     
    },
  }
  
</script>
