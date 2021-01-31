<template>
  <div class="test-page" v-if="tests.isLoaded">
    <TestNavMenu :tests="tests" />
    <!-- <div class="nav" v-if="tests.isLoaded">
      <template v-for="test in tests.data" :key="test._id"> 
        <router-link :to="{ name: 'TestPage', params: { name: test.name } }">
          {{test.title}} 
        </router-link>{{tests.data.length - 1 - key  ? ' | ': ''}}
      </template>
    </div> -->
    <router-view/>
  </div>
</template>


<script lang="ts">
  import store from "@/store"
  import { defineComponent } from "vue"
  import TestNavMenu from "./TestNavMenu.vue"

  export default defineComponent({
    data() {
      return {

      }
    },
    computed: {
      tests() {
        return store.state.tests
      },
    },
    beforeCreate() { // TODO: правильно ли так рано запрашивать? Где вообще надо запрашивать? И как раньше запросить?
      store.dispatch('getTests', 1);
    },
    components: {
      TestNavMenu,
    }
  })
</script>

<style scoped>
.test-page {
  display: flex;
  flex-wrap: wrap;
}
.nav {
  display: inline-block;
  text-align: center; 
}
.nav a {
  font-weight: bold;
  color: #2c3e50;
}
.nav a.router-link-exact-active {
  color: #42b983;
}
</style>