import { createStore } from 'vuex'
import { getTests } from '@/config/api'
import { ITest } from '@/models'

export default createStore({
  state: {
    tests: {
      data: [] as Array<ITest>,
      isLoaded: false,
    }
    // [
    //   {
    //     header: 'Какая ты черепашка?',
    //     questions: [
    //       { 
    //         query: 'какой твой любимый цвет?',
    //         answers: [
    //           { text: 'Синий', key: 'L'},
    //           { text: 'Красный', key: 'R'},
    //           { text: 'Фиолетовый', key: 'D'},
    //           { text: 'Жёлтый', key: 'M'},
    //         ]
    //       },
    //       { 
    //         query: 'какой вы?',
    //         answers: [
    //           { text: 'Агресивный', key: 'R'},
    //           { text: 'Тщеславный', key: 'L'},
    //           { text: 'Заумный', key: 'D'},
    //           { text: 'Легкомысленный', key: 'M'},
    //         ]
    //       },
    //       { 
    //         query: 'Любите ли вы пиццу?',
    //         answers: [
    //           { text: 'Да', key: 'L'},
    //           { text: 'Очень', key: 'R'},
    //           { text: 'Конечно', key: 'D'},
    //           { text: 'Безумно. Больше всего на свете!', key: 'M'},
    //         ]
    //       }
    //     ],
    //     results: {
    //       L: 'Вы зазнайка Лео', 
    //       R: 'Гордитесь, вы Раф!',
    //       D: 'Неплохо. Ты Донни',
    //       M: 'Мик-кИ!!',
    //     },
    //     keys: ['L', 'R', 'D', 'M'],
    //     name: 'turtle'
    //   },
    //   {
    //     header: 'Какой ты телепузик?',
    //     questions: [
    //       { 
    //         query: 'Какая фигура тебе нравится больше?',
    //         answers: [
    //           { text: 'Треугольник', key: 'T'},
    //           { text: 'Кружок', key: 'P'},
    //           { text: 'Прямая', key: 'D'},
    //           { text: 'Кривая', key: 'L'},
    //         ],
    //       },
    //       { 
    //         query: 'Какой цвет тебе нравится больше?',
    //         answers: [
    //           { text: 'Красный', key: 'P'},
    //           { text: 'Жёлтый', key: 'L'},
    //           { text: 'Зелёный', key: 'D'},
    //           { text: 'Фиолетовый', key: 'T'},
    //         ],
    //       },
    //       { 
    //         query: 'Что бы вы выбрали?',
    //         answers: [
    //           { text: 'Пушистый цилинд', key: 'D'},
    //           { text: 'Красную сумку', key: 'T'},
    //           { text: 'Большой мячик', key: 'L'},
    //           { text: 'Самокат', key: 'P'},
    //         ],
    //       },
    //       { 
    //         query: 'Какой вы?',
    //         answers: [
    //           { text: 'Вы самый старший в семье', key: 'T'},
    //           { text: 'Вы самый упрямый', key: 'D'},
    //           { text: 'Вы любите петь и танцевать', key: 'L'},
    //           { text: 'Вы самый младший в семье', key: 'P'},
    //         ],
    //       },
    //     ],
    //     results: {
    //       T: 'Тинки-Винки', 
    //       D: 'Дипси',
    //       L: 'Ля-Ля/Ла-Ла',
    //       P: 'По',
    //     },
    //     keys: ['T', 'D', 'L', 'P'],
    //     name: 'teletubbie'
    //   },
    //   {
    //     header: 'Кто самая красивая и чудесная?',
    //     questions: [
    //       { 
    //         query: 'Кто самая красивая и чудесная?',
    //         answers: [
    //           { text: 'Евушка', key: 'E'},
    //         ],
    //       },
    //     ],
    //     results: {
    //       E: '❤ Вы угадали! Евушка сама пркрасная! ❤', 
    //     },
    //     keys: ['E'],
    //     name: 'eva'
    //   },
    //   {
    //     header: 'Кто самый крутой?',
    //     questions: [
    //       { 
    //         query: 'Кто самый крутой?',
    //         answers: [
    //           { text: 'Я', key: 'I'},
    //           { text: 'Юра', key: 'Y'},
    //         ],
    //       },
    //     ],
    //     results: {
    //       E: 'Конечно Юра!', 
    //       I: 'Конечно Юра!', 
    //     },
    //     keys: ['Y', 'I'],
    //     name: 'yura'
    //   },
    // ],
  },
  mutations: {
    setTests(state, tests) {
      debugger
      state.tests.data = tests.data
      state.tests.isLoaded = true
    }
  },
  actions: {
    getTests({ commit }) {
      debugger
      getTests().then(res => {
        commit('setTests', res.data)
      })
    }
  },
  modules: {
  }
})
