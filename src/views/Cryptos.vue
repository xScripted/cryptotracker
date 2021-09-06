<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscador"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="cryptos"
        :items-per-page="30"
        :search="search"
        class="elevation-1"
        loading
        loading-text="Cargando... Porfavor espera !"
      >

        <template v-slot:item.name="{ item }">
          <router-link :to="{ name: 'Currencies', params: { id: item.id, symbol: item.symbol, } }">
            <div class="crypto-name">
              <img class="logo" :src="item.image"> 
              <div class="name">{{ item.name + ' ' + item.symbol }}</div>
            </div>
          </router-link>
        </template>
        <template v-slot:item.h24="{ item }">
          <div class="red--text" :class="{ 'green--text': item.h24 >= 0 ? true : false }"> {{ item.h24 }} %</div>
        </template>
        <template v-slot:item.d7="{ item }">
          <div class="red--text" :class="{ 'green--text': item.d7 >= 0 ? true : false }"> {{ item.d7 }} %</div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'Cryptos',
    data: () => ({
      search: '',
      cryptos: [],
      headers: [
          {
            text: 'Nombre',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Precio', value: 'price' },
          { text: '24h %', value: 'h24' },
          { text: '7d %', value: 'd7' },
          { text: 'Market Cap', value: 'marketcap' },
      ],
    }),
    computed: {
      ...mapGetters(['currency'])
    },
    methods: {
      prettyPrice(price) {
        return price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + this.currency.symbol;
      },
      prettyPercent(number) {
        return Math.round(number * 100) / 100;
      },
      async getAPIData() {
        let data = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + this.currency.id + '&order=market_cap_desc&per_page=200&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C1y');
        data = await data.json();

        this.cryptos = [];
        console.log(this.currency);
        for(const crypto of data) {
          this.cryptos.push({
            symbol: crypto.symbol.toUpperCase(),
            id: crypto.id,
            name: crypto.name,
            image: crypto.image,
            price: this.prettyPrice(crypto.current_price),
            h24: this.prettyPercent(crypto.price_change_percentage_24h),
            d7: this.prettyPercent(crypto.price_change_percentage_7d_in_currency),
            marketcap: this.prettyPrice(crypto.market_cap),
          })
        }

        document.querySelector('.v-data-table__progress').style.display = 'none';
      },
    },
    watch: {
      currency: {
        handler() {
          this.getAPIData();
          console.log('cambia');
        },
        deep: true
      },
    },
    async mounted() {
      await this.getAPIData();
    }
  }
</script>

<style lang="scss">

  .crypto-name {
    display: flex;
    align-items: center;
    .logo {
      width: 20px;
      margin: 10px;
    }
  }

  a {
    text-decoration: none;
    color: black !important;
  }

  .theme--dark {
    a {
      text-decoration: none;
      color: white !important;
    }
  }

</style>
