<template>
  <div class="home">
    <Countries v-bind:data="countries"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Countries from '@/components/Countries.vue'
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Countries
  },
  data() {
    return {
      countries: [],
      errors: []
    }
  },
  mounted() {
    axios.get(`https://restcountries.eu/rest/v2/all`).then(response => {
      this.countries = response.data
    }).catch(e => {
      this.errors.push(e);
    })
  }
}
</script>
