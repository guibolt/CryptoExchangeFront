import httpClient from '@/plugins/axios'

export default {
    namespaced: true,
    state: {
        coinsLst: [],
        exchangeobj:{},
        chartData: {},
        loading: false
    },
    mutations:{
        setLoading:(state,payload)=> state.loading = payload,
        setCoinsLst: (state,payload) => state.coinsLst = payload,
        setExchangeObj: (state,payload) => state.exchangeobj = payload,
        setChart(state,payload){
            if(payload.length > 0){
                let mainColor = '#9c27b0'
                let secondColor = '#338d64'
    
                let fistchartObj = {
                    backgroundColor: "rgba(0, 0, 0, 0.0)",
                    borderColor: mainColor,
                    data: payload[0].map(x => x.coinValue),
                    label: payload[0][0].coinSearched,
                    lineTension: 0,
                    pointBackgroundColor: mainColor,
                    pointBorderColor: mainColor,
                }
    
    
                let secondChartObj = {
                    backgroundColor: "rgba(0, 0, 0, 0.0)",
                    borderColor: secondColor,
                    data: payload[1].map(x => x.coinValue),
                    label: payload[1][1].coinSearched,
                    lineTension: 0,
                    pointBackgroundColor: secondColor,
                    pointBorderColor: secondColor,
                }
    
                let data = {
                    datasets:[
                        fistchartObj,
                        secondChartObj
                    ],
                    labels: payload[0].map(x => x.date),
                    title: 'Historico'
                }
    
                state.chartData = data
            }
           
        }
      
    },
    actions: {
        async getCoins({commit}){
            await httpClient.get().then((resp)=>{
                if(resp.status == 200){
                    commit('setCoinsLst',resp.data.data)
                }
              
            }).catch(err => {
            
            })
        },
        async getExchangeRates({commit},options){
            commit('setLoading', true)
            await httpClient.get(`Rates?firstCoin=${options.firstCoin}&secondCoin=${options.secondCoin}`).then((resp)=>{
                if(resp.status == 200){
                    commit('setExchangeObj',resp.data.data)
                }
              
            }).catch(err => {
            
            })
            commit('setLoading', false)
      },
      async getCoinHistory({commit},options){
          let dataSets = []
          commit('setLoading', true)

          if(options.firstCoin) {
            await httpClient.get(`Rates/historical?coinSymbol=${options.firstCoin}&initialDate=${options.date}`).then((resp)=>{
                if(resp.status == 200){
                    dataSets.push(resp.data.data)
                }       
            }).catch(err => {
            
            })
          }

            if(options.secondCoin){
                await httpClient.get(`Rates/historical?coinSymbol=${options.secondCoin}&initialDate=${options.date}`).then((resp)=>{
                    if(resp.status == 200){
                        dataSets.push(resp.data.data)
                    }       
                }).catch(err => {
                
                })
            }
        
        commit('setLoading', false)
        commit('setChart',dataSets)
        
   }
  }
}