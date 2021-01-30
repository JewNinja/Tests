<template>
  <div class="container" v-if="isLoaded && currentTest">
    <h3>{{currentTest.header}}</h3>
    <template v-if="currentTest.questions.length - step">
      <p>Вопрос номер: {{step+1}}</p>
      <p class="query">{{currentTest.questions[step].query}}</p>
      <template v-for="answer in currentTest.questions[step].answers" :key="answer.key">
        <div>
          <input type="radio" v-bind:value="answer.key" v-model="currentAnswer">
          <label>{{answer.text}}</label>
        </div>
      </template>
      <button :disabled="!step" @click="onback">Назад</button>
      <button :disabled="!currentAnswer" @click="onchoice">{{currentTest.questions.length - 1 - step ? 'Далее' : 'Результат'}}</button>
    </template>
    <template v-else>
      <h1>{{calcResult()}}</h1>
      <button :disabled="!step" @click="onback">Назад</button>
      <button @click="restart">Начать сначала!?</button>
    </template>
  </div>
</template>


<script lang="ts">
import router from "@/router"
import store from "@/store"
import { defineComponent } from "vue"

  export default defineComponent({
    data() {
      return {
        step: 0,
        currentAnswer: '',
        answers: [] as string[],
      }
    },
    computed: {
      currentTest() {
        return store.state.tests.data.find(test => '/tests/' + test.name === router.currentRoute.value.path) // || store.state.tests.data[0] // TODO: '/tests'
      },
      isLoaded() {
        return store.state.tests.isLoaded
      }
    },
    methods: {
      onchoice() {
        if (this.currentAnswer) {
          this.answers.push(this.currentAnswer)
          this.currentAnswer = ''
          this.step++
        }
      },
      onback() {
        this.currentAnswer = this.answers.pop() || ''
        this.step--
      },
      calcResult() {
        const calculatedKey = Object.entries(this.answers.reduce((acc: any, answer) => {
          acc[answer] = (acc[answer] || 0) + 1;
          return acc;
        }, {})).reduce((max: any, n: any) => n[1] > max[1] ? n : max)[0];
        // @//ts-expect-error
        return this.currentTest?.results[calculatedKey]; // TODO
      },
      restart() {
        this.step = 0;
        this.currentAnswer = '';
        this.answers = [];
      }
    },
    watch: {
      $route (to, from) {
        this.restart();
      }
    },
  })
</script>

<style scoped>
  .query {
    font-weight: bold;
  }
</style>