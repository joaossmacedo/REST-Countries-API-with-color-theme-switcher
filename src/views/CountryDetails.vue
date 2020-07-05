<template>
  <div class="details-container">
    <button class="back-btn non-selectable shadow" v-on:click="goBack()">
      <font-awesome-icon icon="arrow-left"/>
      <div>Back</div>
    </button>
    <div class="country" v-if="country">
      <img v-bind:src="country.flag" alt="Flag" class="shadow">
      <div>
        <div class="name">{{ country.name }}</div>
        <div class='data-container'>
          <div class="half">
            <div>
              <span>Native Name: </span> {{ country.nativeName }}
            </div>
            <div>
              <span>Population: </span> {{ formatNumber(country.population) }}
            </div>
            <div>
              <span>Region: </span> {{ country.region }}
            </div>
            <div>
              <span>Sub Region: </span> {{ country.subregion }}
            </div>
            <div>
              <span>Capital: </span> {{ country.capital }}
            </div>
          </div>
          <div class="half">
            <div>
              <span>Top Level Domain: </span> {{ getList(country.topLevelDomain, true) }}
            </div>
            <div>
              <span>Currencies: </span> {{ getList(country.currencies) }}
            </div>
            <div>
              <span>Languages: </span> {{ getList(country.languages) }}
            </div>
          </div>
        </div>
        <div class="country-borders">
          <span style="font-weight: 600;">Border Countries: </span>
          <div class="shadow" v-for="borderCountry in country.borders" :key="borderCountry" v-on:click="goToDetails(borderCountry)">
            {{ borderCountry }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router/index.js';
import axios from 'axios';

export default {
  name: 'CountryDetails',
  data() {
    return {
      id: '',
      country: [],
      errors: []
    }
  },
  updated() {
    this.id = this.$route.params.id
    axios.get(`https://restcountries.eu/rest/v2/alpha/` + this.id).then(response => {
      this.country = response.data
    }).catch(e => { console.log(e) })
  },
  created() {
    this.id = this.$route.params.id
    axios.get(`https://restcountries.eu/rest/v2/alpha/` + this.id).then(response => {
      this.country = response.data
    }).catch(e => { console.log(e) })
  },
  methods: {
    formatNumber: function (number) {
      if (!number) {
        return '';
      }
      return number.toLocaleString(
        undefined, // leave undefined to use the browser's locale,
                  // or use a string like 'en-US' to override it.
        { minimumFractionDigits: 0 }
      );
    },
    list2string: function(lst) {
      if (lst.length === 0) {
        return '';
      }
      if (lst.length === 1) {
        return lst[0];
      }

      let str = lst.slice(0, -1).join(', ') + ' and ' + lst[lst.length - 1]

      return str;
    },
    getList: function (fullList, flat=false) {
      if (!(fullList instanceof Array)) {
        return fullList;
      }

      let lst = [];

      if (!flat){
        for (const data of fullList) {
          lst.push(data.name);
        }
      } else {
        lst = fullList;
      }

      return this.list2string(lst);
    },
    goBack() {
      // router.
      router.push({ name: 'Home' });
    },
    goToDetails(code) {
      // this.id = code;
      // axios.get(`https://restcountries.eu/rest/v2/alpha/` + code).then(response => {
      //   this.country = response.data
      // }).catch(e => { console.log(e) })
      router.push({ name: 'CountryDetails', params: { id: code }})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.back-btn {
  display: flex;
  justify-content: space-evenly;
  align-items: center;  

  width: 100px;
  padding: 8px 0;
  margin-top: 40px;
  border: 0;
  border-radius: 5px;
  font-size: 16px;

  background-color: var(--elements);
  color: var(--text);

  cursor: pointer;
  img {
    height: 20px;
    margin-right: 10px;
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.details-container {
  margin-left: 40px;
}
.country {
  display: flex;

  margin-top: 40px;

  > img {
    flex: 0 0 auto;

    width: 500px;
  }
  > div {
    flex: 1 1 auto;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    margin: 25px 50px 25px 100px;

    .name {
      flex: 0 1 auto;
      font-size: 30px;
      font-weight: 800;
    }

    .data-container {
      flex: 0 1 auto;
      display: flex;

      margin: 15px 0px;

      width: 100%;

      text-align: start;
      line-height: 2em;

      .half {
        width: 50%;
        span {
          font-weight: 600;
        }
      }
    }

    .country-borders {
      flex: 1 1 auto;

      display: flex;
      flex-flow: row wrap;
      align-content: flex-end;
      > * {
        height: 25px;
      }
      > div {
        width: 100px;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0px 0px;
        margin: 2px 10px;
        border-radius: 3px;

        background-color: var(--elements);
        color: var(--text);

        cursor: pointer;
      }
    }
  }
}

@media only screen
       and (max-width: 667px){
  .country {
    flex-wrap: wrap;

    > div {
      margin-right: 0;
      margin-left: 0;
      .data-container {
        margin-right: 0;
        margin-left: 0;

        width: 100%;

        flex-direction: column;

        > :first-child {
          margin-bottom: 15px;
        }
        .half {
          width: 100%;
        }
      }

      .country-borders {
        span {
          width: 100%;
        }
      }
    }

    img {
      width: calc(100vw - 40px);
    }
  }
  .details-container {
    margin-right: 20px;
    margin-left: 20px;
    width: calc(100vw - 40px);
  }
}
</style>