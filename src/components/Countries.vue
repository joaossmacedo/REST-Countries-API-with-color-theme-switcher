<template>
  <div>
    <div class="filters">
      <div class="input-container non-selectable transition shadow">
        <div>
          <font-awesome-icon icon="search"/>
        </div>
        <input
          type="text"
          class="transition"
          @change="filterCountriesByName">
      </div>
      <v-select 
        name="style-chooser" 
        class="style-chooser non-selectable transition shadow" 
        placeholder="Filter by Region"
        @input="filterCountriesByRegion"
        :options="['Africa', 'Asia', 'Americas', 'Europe', 'Oceania']">
      </v-select>
    </div>

    <div v-if="filteredData && filteredData.length" id="countries-container">
      <div v-for="country in filteredData" :key="country.name" class="country transition shadow" v-on:click="goToDetails(country.alpha3Code)">
        <img v-bind:src="country.flag" alt="Flag">
        <div>
          <div class="header">{{ country.name }}</div>
          <div>
            <span style="font-weight: bold">Population:</span>
            {{ formatNumber(country.population) }}
          </div>
          <div>
            <span style="font-weight: bold">Region:</span>
            {{ country.region }}
          </div>
          <div>
            <span style="font-weight: bold">Capital:</span>
            {{ country.capital }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router/index.js';

export default {
  name: 'Countries',
  props: {
    data: Array
  },
  data() {
    return {
      filteredData: Array,
      regionFilter: String,
      nameFilter: String
    }
  },
  watch: { 
    'data': function(newVal, oldVal) {
      console.log(oldVal);
      this.data = newVal;
      this.filteredData = this.data;
      this.filter();
    }
  },
  created() {
    this.regionFilter = "";
    this.nameFilter = "";
    this.filteredData = this.data;
  },
  mounted() {
    this.filteredData = this.data;
    console.log(this.data);
    // const a = document.getElementById('a');
    // a.setAttribute
    const selectorInputs = document.querySelectorAll('.style-chooser input');
    for (const selectorInput of selectorInputs) {
      console.log(selectorInput);
      selectorInput.setAttribute("readonly", true);
    }
    
  },
  methods: {
    formatNumber: function (number) {
      return number.toLocaleString(
        undefined,
        { minimumFractionDigits: 0 }
      );
    },
    goToDetails(code) {
      router.push({ name: 'CountryDetails', params: { id: code }})
    },
    filterCountriesByName(event) {
      const name = event.target.value;
      this.nameFilter = name ? name.toLocaleLowerCase() : '';
      this.filter();
    },
    filterCountriesByRegion(region) {
      this.regionFilter = region ? region : '';
      this.filter();
    },
    filter() {
      if(!this.filteredData) {
        this.filteredData = [];
        return ;
      }

      const newData = []
      for (const country of this.data) {
        if (this.regionFilter !== '') {
          if (country.region !== this.regionFilter) {
            continue;
          }
        }
        if (this.nameFilter !== '') {
          if (!country.name.toLocaleLowerCase().includes(this.nameFilter)) {
            continue;
          }
        }

        newData.push(country);
      }

      this.filteredData = newData;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filters {
  height: 50px;

  padding: 30px 90px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .input-container {
    position: relative;

    padding-left: 30px;
    border-radius: 5px;

    background-color: var(--elements);
    color: var(--text);
    > div {
      position: absolute;
      top: 0;
      left: 0;

      height: 100%;
      width: 30px;
      padding: 0 5px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    > input {
      font-size: 20px;

      padding: 12px 6px 12px 12px;
      border: 0;
      border-radius: 5px;

      background-color: var(--elements);
      color: var(--text);
    }
  }
}
#countries-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  font-size: 14px;

  .country {
    display: flex;
    flex-direction: column;
    
    width: 300px;
    height: 450px;
    
    margin: 0 30px 20px;
    border-radius: 5px;

    cursor: pointer;

    background-color: var(--elements);
    > img {
      flex: 0 1 auto;

      border-top-left-radius: 5px;
      border-top-right-radius: 5px;

      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    > div {
      flex: 1 1 auto;

      padding: 20px;

      text-align: start;
      > div:first-child {
        font-weight: bold;
        font-size: 22px;
        
        margin-bottom: 10px;
      }
      > div {
        margin-bottom: 5px;
        line-height: 2em;
      }
    }
  }
}
</style>
