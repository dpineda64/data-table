<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html,body {
  margin: 0;
}
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.home {
  padding: 2rem 0;
}
.content {
  width: 80%;
  margin: 0 auto;
}
a {
  color: #2c3e50;
}
</style>
