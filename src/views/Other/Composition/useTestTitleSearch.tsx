// обычно составные куски валяются в src/composables/ 

import { ITest } from '@/models'
import { ref, computed } from 'vue'

export default function useTests(tests: { value: Array<ITest>}) { // TODO: типизировать реф
  const searchQuery = ref('')
  const testsMatchingSearchQuery = computed(() => {
    return tests.value.filter((test: ITest) => {
      return test.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
  })

  return {
    searchQuery,
    testsMatchingSearchQuery
  }
}