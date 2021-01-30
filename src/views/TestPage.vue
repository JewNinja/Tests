<template>
  <div id="nav" v-if="tests.isLoaded">
    <template v-for="test in tests.data" :key="test._id"> 
      <router-link :to="{ name: 'TestPage', params: { name: test.name } }">
        {{test.header}} 
      </router-link>{{tests.data.length - 1 - key  ? ' | ': ''}}
    </template>
  </div>
  <Test />
</template>


<script lang="ts">
  import store from "@/store"
  import { defineComponent } from "vue"
  import Test from "./Test.vue"

  export default defineComponent({
    computed: {
      tests() {
        return store.state.tests
      },
    },
    beforeCreate() { // TODO: правильно ли так рано запрашивать? Где вообще надо запрашивать? И как раньше запросить?
      store.dispatch('getTests', 1);
    },
    components: {
      Test,
    }
  })
</script>

<style scoped>

</style>