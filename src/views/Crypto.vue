<template>
  <v-container id="crypto-page" class="mt-8">
    <v-progress-circular :class="{ loaded }"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>

    <div v-if="loaded">
      <v-row>
        <v-col class="crypto-title" xs="12" sm="4">
          <img :src="crypto.image.small" class="m-5">
          <div class="text-h3 font-weight-bold mx-6"> {{ crypto.name }} </div> 
          <v-chip class="crypto-tag"> {{ crypto.symbol.toUpperCase() }}</v-chip>
        </v-col>
        <v-col xs="12" sm="7">
          <v-row>
            <v-col class="mx-6" md="4">
              Precio de {{ crypto.name }} ({{ crypto.symbol.toUpperCase() }})
              <div class="current-price text-h5"> 
                {{ prettyPrice(crypto.market_data.current_price[currency.id], currency.symbol) }}
              </div>
            </v-col>
            <v-col class="mx-6" md="5">
              <div> Capitalización de mercado </div>
              <div class="current-price text-h5">
                {{ prettyPrice(crypto.market_data.market_cap[currency.id],  currency.symbol) }}
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <div class="mt-8" style="overflow: hidden">
          <VueTradingView
            :options="{
              symbol: tradingViewSymbol.toUpperCase(),
              theme: 'dark',
              interval: 'W',
            }"
          />
        </div>
      </v-row>
      <v-row>
        <p class="font-weight-regular mt-10" v-html="crypto.description.es"></p>
      </v-row>
    </div>

  </v-container>
</template>

<script>
import VueTradingView from 'vue-trading-view';
import { mapGetters } from 'vuex';

export default {
  components: {
    VueTradingView
  },
  data() {
    return {
      tradingViewSymbol: '',
      loaded: false,
      crypto: {
        image: {},
        description: {},
        symbol: '',
        market_data: {}
      }
    }
  },
  computed: {
    ...mapGetters(['currency']),
  },
  methods: {
    prettyPrice(price) {
      return price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + this.currency.symbol;
    },
    async getAPIDataCoin() {
      let data = await fetch('https://api.coingecko.com/api/v3/coins/' + this.$route.params.id + '?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true');
      data = await data.json();
      this.crypto = data;
      this.loaded = true;
    },
  },
  created() {
    this.tradingViewSymbol = this.$route.params.symbol + this.currency.id;
    this.getAPIDataCoin();
  },
}
</script>

<style scoped lang="scss">

  .theme--dark * {
    color: rgb(243, 243, 243);
  }
  
  .crypto-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  #vue-trading-view {
    div {
      width: 100% !important;
    }
  }

  .loaded {
    display: none;
  }

</style>
