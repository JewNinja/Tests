<template>
  <div class="blackbox-page" v-if="true">
    <BlackboxView />
  </div>
</template>


<script lang="ts">
  import { defineComponent } from "vue"
  import BlackboxView from "./BlackboxView/index.vue"

  export default defineComponent({
    components: {
      BlackboxView,
    }
  })
</script>

<style scoped>
  .blackbox-page {
    height: 100%;
  }
</style>