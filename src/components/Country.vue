<template>
    <div>
        fudeu
        <div v-if="country">
            {{ country.name }}
        </div>
    </div>
</template>

<script>
import router from '@/router/index.js';

export default {
  name: 'Country',
  props: {
    country: Object
  },
  created() {
    console.log($route.params)
  },
  methods: {
    formatNumber: function (number) {
      return number.toLocaleString(
        undefined, // leave undefined to use the browser's locale,
                  // or use a string like 'en-US' to override it.
        { minimumFractionDigits: 0 }
      );
    },
    goToDetails(name) {
      console.log(name)
      router.push({ name: 'about'})// , params: { userId: 123 }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
