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
.filters {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 1rem 2rem;
  grid-gap: 30px;
}
.filter {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  padding: 0.5rem;
  grid-column-end: span 2;
  &.search-by {
    select {
      border: none;
      padding: .5rem;
      background-color: transparent;
    }
  }
  .clear > button {
    background-color: transparent;
    border: none;
    text-transform: uppercase;
    color: #030472;
    cursor: pointer;
    outline: none;
  }
}
input {
  &[type="search"] {
    padding: 1rem;
    background-color: #fff;
    border: none;
    outline: none;
    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }
  }
}
@import "@/assets/dataTable.scss";
</style>
