<template>
  <el-menu class="el-test-nav-menu" default-active="2" :collapse="isCollapsed" router>
    <el-menu-item class="toggle-menu-btn">
      <i v-bind:class="['toggle-menu-icon', isCollapsed ? 'el-icon-arrow-right' : 'el-icon-arrow-left']" @click="toggleMenu()"></i>
    </el-menu-item>
    <el-submenu index="/tests">
      <template #title>
        <i class="el-icon-tickets"></i>
        <span>Tests</span>
      </template>
      <el-menu-item-group title="All">
        <el-menu-item v-for="test in tests.data" :key="test._id" :index="/tests/ + test.name">{{test.title}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/tests/_create">
      <i class="el-icon-plus"></i>
      <span>Create new test</span>
    </el-menu-item>
    <el-menu-item index="/tests/_library">
      <i class="el-icon-document-copy"></i>
      <span>Test library</span>
    </el-menu-item>
  </el-menu>
</template>


<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    props: {
      tests: {
        type: Object, required: true
      }
    },
    data() {
      return {
        isCollapsed: true
      }
    },
    computed: {

    },
    methods: {
      toggleMenu() {
        this.isCollapsed = !this.isCollapsed
      }
    }
  })
</script>

<style scoped>
  .el-test-nav-menu {
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  .toggle-menu-btn {
    padding: 0 !important;
    display: flex;
  }
  .toggle-menu-icon {
    width: 100%;
    align-self: center;
    text-align: center;
    display: flex;
    height: 100%;
    justify-content: center;
  }
  .toggle-menu-icon::before {
    align-self: center;
  }
  @media all and (max-width: 400px) {
    .el-test-nav-menu:not(.el-menu--collapse) {
      width: 100vw;
      border: none;
      border-bottom: 1px solid#e9e8e8;
    }
  }
</style>