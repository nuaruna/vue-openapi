<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    MainPage: () => import(/* webpackChunkName: "ag-table-component" */ '@/views/MainPage.vue'),
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
#app {
  height: 100%;
}
</style>
