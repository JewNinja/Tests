<template>
  <div class="other-nav">
    <router-link class="other-nav-link" to="/other/composition">Composition</router-link>
    <router-link class="other-nav-link" to="/other/customdirectives">CustomDirectives</router-link>
    <router-link class="other-nav-link" to="/other/staff">Staff</router-link>
  </div>
  <router-view/>
</template>

<script>
import { defineComponent } from "vue"

  export default defineComponent({
  
  })
</script>

<style scoped>
  .other-nav {
    display: flex;
    margin-bottom: 20px;
  }
  .other-nav-link {
    margin: 0 10px;
    color: #701212;
  }
  .other-nav-link:active {
    color: #cc240e;
  }
</style>