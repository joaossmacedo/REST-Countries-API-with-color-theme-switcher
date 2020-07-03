<template>
  <div id="app" class="transition" v-bind:class="{ 'dark-mode': darkModeOn, 'light-mode': !darkModeOn }">
    <div id="navbar">
      <div class="title">
        Where in the world?
      </div>
      <div class="mode" v-on:click="switchMode()">
        {{ darkModeOn ? 'Dark' : 'Light' }} Mode
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      darkModeOn: true,
    }
  },
  methods: {
    switchMode() {
      this.darkModeOn = !this.darkModeOn;
    }
  }

 
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');
@import "vue-select/src/scss/vue-select.scss";
body {
  margin: 0;
}
*:focus {
  outline: none;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;

  color: var(--text);
  background-color: var(--background);

  min-height: 100vh;
}
.transition {
  transition: 0.25s ease-out;
}

:root {
  --dark-mode-elements: hsl(209, 23%, 22%);
  --dark-mode-background: hsl(207, 26%, 17%);
  --dark-mode-text: hsl(0, 0%, 100%);

  --light-mode-elements: hsl(0, 0%, 100%);
  --light-mode-background: hsl(0, 0%, 98%);
  --light-mode-text: hsl(200, 15%, 8%);
  --light-mode-input: hsl(0, 0%, 52%);
}
.light-mode {
  --elements: var(--light-mode-elements);
  --background: var(--light-mode-background);
  --text: var(--light-mode-text);
}
.dark-mode {
  --elements: var(--dark-mode-elements);
  --background: var(--dark-mode-background);
  --text: var(--dark-mode-text);
}

#navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 50px;
  padding: 0 50px;

  box-shadow: 0px 1px 2px 1px rgba(0,0,0,0.25);

  .title {
    font-weight: 800;
    font-size: 20px;
  }
  .mode {

  }
}

.style-chooser {
  width: 200px;
}
.style-chooser .vs__selected,
.style-chooser .vs__searching .vs__selected,
.style-chooser .vs__open .vs__selected,
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-option--disabled,
.style-chooser .vs__dropdown-option--highlight,
.style-chooser .vs__dropdown-option,
.style-chooser .vs__dropdown-menu {
  color: var(--text);
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: var(--elements);
  border: none;
  color: var(--text);
  text-transform: lowercase;
  font-variant: small-caps;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: var(--text);
}
</style>
