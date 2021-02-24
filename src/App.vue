<template>
  <el-header>
    <el-menu :default-active="activeIndex" class="app_el-nav-topbar" mode="horizontal" router>
      <el-menu-item index="/tests">Тесты</el-menu-item>
      <el-menu-item index="/other">Ещё что то</el-menu-item>
    </el-menu>
  </el-header>
  <el-container>
    <el-container>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: window.location.pathname.match(/\/\w*/)[0],
        // activeIndex: this.$router.currentRoute.value.matched[0]?.path, // через эту штуку путь с /:name
      };
    },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.app_el-nav-topbar {
  display: flex;
  justify-content: center;
}
.el-main {
  padding: 20px 0 !important;
}
</style>
