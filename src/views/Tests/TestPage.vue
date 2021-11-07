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
      tests() { // @ts-ignore
        return store.state.tests
      },
    },
    beforeCreate() {
      store.dispatch('tests/getTests', 1);
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