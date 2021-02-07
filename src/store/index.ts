import { createStore } from 'vuex'
import { getTests, postTest, updateTest, deleteTest } from '@/config/api'
import { INewTest, ITest } from '@/models'

export default createStore({
  state: {
    tests: {
      data: [] as Array<ITest>,
      isLoaded: false,
    }
  },
  mutations: {
    setTests(state, tests) {
      state.tests.data = tests.data
      state.tests.isLoaded = true
    },
    addTests(state, tests) {
      state.tests.data = state.tests.data.concat(tests)
      state.tests.isLoaded = true
    },
    changeTest(state, changedTest) {
      state.tests.data = state.tests.data.map(test => test._id !== changedTest._id ? test : changedTest)
      state.tests.isLoaded = true
    },
    removeTest(state, id) {
      state.tests.data = state.tests.data.filter(test => test._id !== id)
      state.tests.isLoaded = true
    },
  },
  actions: {
    getTests({ commit }) {
      getTests().then(res => {
        commit('setTests', res.data)
      })
    },
    postTest: async function({ commit }, data: ITest) {
      return await postTest(data).then(res => {
        commit('addTests', [res.data])
        return res
      })
    },
    updateTest: async function({ commit }, {_id, ...data}: ITest) {
      return await updateTest(_id, data).then(res => {
        commit('changeTest', res.data)
        return res
      })
    },
    deleteTest: async function({ commit }, id: string) {
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
  modules: {
  }
})
