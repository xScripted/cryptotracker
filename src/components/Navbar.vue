<template>
  <div id="navbar">
    <v-app-bar class="primary">

        <router-link to="/"> <v-icon x-large class="mx-5" color="orange">mdi-bitcoin</v-icon>  </router-link>
        <h1 class="text-h5">Crypto Tracker</h1>
    
        <v-spacer></v-spacer>
        <div class="mx-2">
            <v-icon @click="toggleCurrency">{{ currency.icon }}</v-icon>
        </div>
        <div class="mx-2">
            <v-icon @click="mutateDarkmode">{{ darkmodeIcon }}</v-icon>
        </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['darkmode', 'darkmodeIcon', 'currency']),
    },
    methods: {
        ...mapMutations(['toggleDarkmode', 'toggleCurrency']),
        mutateDarkmode() {
            this.toggleDarkmode();
            this.$vuetify.theme.dark = this.darkmode;
        }
    }
}
</script>

<style lang="scss">

</style>
