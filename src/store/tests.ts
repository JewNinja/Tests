import { ITest } from "@/models";
import { getTests, postTest, updateTest, deleteTest } from '@/api/tests'
import { StoreType, TestsStoreType } from "./types";
import { ActionContext } from "vuex";

type ActionContextType = ActionContext<TestsStoreType, StoreType>

export default {
  namespaced: true,
  state: () => ({
    data: [] as Array<ITest>,
    isLoaded: false,
  }),
  mutations: {
    setTests(state: TestsStoreType, tests: Array<ITest>) {
      state.data = tests
      state.isLoaded = true
    },
    addTests(state: TestsStoreType, tests: Array<ITest>) {
      state.data = state.data.concat(tests)
      state.isLoaded = true
    },
    changeTest(state: TestsStoreType, changedTest: ITest) {
      state.data = state.data.map((test: ITest) => test._id !== changedTest._id ? test : changedTest)
      state.isLoaded = true
    },
    removeTest(state: TestsStoreType, id: string) {
      state.data = state.data.filter((test: ITest) => test._id !== id)
      state.isLoaded = true
    },
  },
  actions: {
    getTests({ commit }: ActionContextType) {
      getTests().then(res => {
        commit('setTests', res.data.data)
      })
    },
    postTest: async function({ commit }: ActionContextType, data: ITest) {
      return await postTest(data).then(res => {
        commit('addTests', [res.data])
        return res
      })
    },
    updateTest: async function({ commit }: ActionContextType, {_id, ...data}: ITest) {
      return await updateTest(_id, data).then(res => {
        commit('changeTest', res.data)
        return res
      })
    },
    deleteTest: async function({ commit }: ActionContextType, id: string) {
      return await deleteTest(id).then(res => {
        if (res.status === 200) {
          commit('removeTest', id)
          return true
        } else {
          return false
        }
      })
    },
  },
}
