<template>
  <template v-if="isInit">
    <LoginPage v-if="!isLogin"/>
    <template v-else>
      <el-header class="header">
        <el-menu :default-active="activeIndex" class="app_el-nav-topbar" mode="horizontal" router>
          <el-menu-item index="/tests">Тесты</el-menu-item>
          <el-menu-item index="/other">Ещё что то</el-menu-item>
        </el-menu>
        <el-link class="logout-btn" type="warning" href="#" @click="onLogout">Logout</el-link>
      </el-header>
      <el-container>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </template>
  </template>
</template>

<script>
import { defineComponent } from "vue";
import LoginPage from "./views/LoginPage";

  export default defineComponent({
    data() {
      return {
        activeIndex: window.location.pathname.match(/\/\w*/)[0],
        // activeIndex: this.$router.currentRoute.value.matched[0]?.path, // через эту штуку путь с /:name
      };
    },
    computed: {
      isInit() {
        return this.$store.state.app.isInit;
      },
      isLogin() {
        return this.$store.state.app.isLogin;
      },
    },
    watch: {
      
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout');
      }
    },
    beforeCreate() {
      this.$store.dispatch('initApp', 1);
    },
    components: {
      LoginPage,
    }
  })
</script>

<style lang="scss">
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
.header {
  position: relative;

  .logout-btn {
    position: absolute;
    top: 0;
    right: 10px;
  }
}
.el-card__body {
  padding: 20px 5vw !important;
}
</style>
