<template>
  <el-header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/tests">Тесты</el-menu-item>
      <el-menu-item index="/other" disabled>Ещё что то</el-menu-item>
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
      // let a = window.location.pathname.match(/\/\w*/)[0]
      // debugger
      return {
        activeIndex: window.location.pathname.match(/\/\w*/)[0], // TODO: сделать как то получше 
      };
    },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
