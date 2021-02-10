<template>
  <div>
    <hr>
    <div>
      Номер страницы:
      <input v-model="searchQuery"/>
    </div>
    <hr>
    <p v-for="(test, tIndex) in tests" :key="tIndex">{{test.title}}</p>
    <hr>
  </div>
</template>

<script>
import { defineComponent, toRefs } from "vue"
import useTests from './useTests'
import useTestTitleSearch from './useTestTitleSearch'

  export default defineComponent({
    setup(props) {
      const propss = { page: 1 } // TODO: переделать на что нибудь
      const { page } = toRefs(propss)

      const { tests, getTests } = useTests(page)
      const { searchQuery, testsMatchingSearchQuery } = useTestTitleSearch(tests)

      return { 
        tests: testsMatchingSearchQuery,
        getTests,
        searchQuery,
      }
    }
  })
</script>

<style scoped>

</style>