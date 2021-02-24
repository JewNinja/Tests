// обычно составные куски валяются в src/composables/ 

import { ref, onMounted, watch, Ref } from 'vue'
import { getTests as getTestsFromApi } from '@/config/api'

export default function useTests(page: Ref<number>) {
  const tests = ref([] as Array<number>)
  const getTests = async () => {
    tests.value = await getTestsFromApi({}, {}, page.value, 1).then(res => {
      return res.data.data
    })
  }

  onMounted(getTests)
  watch(page, getTests)

  return {
    tests,
    getTests
  }
}