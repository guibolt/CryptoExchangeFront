import axios from 'axios'
const httpClient = axios.create({
   // baseURL: "https://localhost:44390/api/v1/Coins",
   baseURL: "https://cryptoexchanges.azurewebsites.net/api/v1/Coins",
    headers: {
      "Content-Type": "application/json",
    },
})

export default httpClient