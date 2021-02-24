<template>
  <div class="test-page" v-if="tests.isLoaded">
    <TestNavMenu :tests="tests" />
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
</style>