<template>
  <el-card class="card-container">
    <template v-if="isLoaded && currentTest">
      <h3>{{currentTest.title}}</h3>
      <template v-if="currentTest.questions.length - step">
        <p>Вопрос номер: {{step+1}}</p>
        <p class="query">{{currentTest.questions[step].query}}</p>
        <div class="answer-radio-group-and-btns">
          <el-radio
            class="answer-radio-btn"
            v-for="(answer, index) in currentTest.questions[step].answers"
            :key="answer.key"
            v-model="currentAnswer"
            v-bind:label="index"
            size="small"
            border
          >
            {{answer.text}}
          </el-radio>
          <div class="control-btns">
            <el-button :disabled="!step" @click="onback">Назад</el-button>
            <el-button type="primary" :disabled="currentAnswer === null" @click="onchoice">{{currentTest.questions.length - 1 - step ? 'Далее' : 'Результат'}}</el-button>
          </div>
        </div>
      </template>
      <template v-else>
        <h1>{{calcResult()}}</h1>
        <div class="result_control-btns">
          <el-button :disabled="!step" @click="onback">Назад</el-button>
          <el-button type="primary" plain @click="restart">Начать сначала!?</el-button>
        </div>
      </template>
    </template>
    <template v-else>
      <h3>Добро пожаловать!</h3>
      <h5>Выберите тест в меню слева</h5>
    </template>
  </el-card>
</template>


<script lang="ts">
import router from "@/router"
import store from "@/store"
import { defineComponent } from "vue"

  export default defineComponent({
    data() {
      return {
        step: 0,
        currentAnswer: null as number | null,
        answers: [] as Array<number>,
      }
    },
    computed: {
      currentTest() { // @ts-ignore
        return store.state.tests.data.find(test => router.currentRoute.value.path.includes('/tests/' + test.name))
      },
      isLoaded() { // @ts-ignore
        return store.state.tests.isLoaded
      }
    },
    methods: {
      onchoice() {
        if (this.currentAnswer !== null) {
          this.answers.push(this.currentAnswer)
          this.currentAnswer = null
          this.step++
        }
      },
      onback() {
        this.currentAnswer = this.answers.pop() || null
        this.step--
      },
      calcResult() { // @ts-ignore
        const values = this.currentTest?.questions.map((question, index) => question.answers[this.answers[index]].values)
        const results = values?.reduce((acc: any, curr: Record<string, any>) => {
          Object.entries(curr).forEach(optionPoints => {
            acc[optionPoints[0]] ? acc[optionPoints[0]] += optionPoints[1] : acc[optionPoints[0]] = optionPoints[1]
          })
          return acc
        }, {})

        if (this.currentTest?.type === 'someone') {
          const calculatedKey = Object.entries(results).sort((a: any, b: any) => b[1] - a[1])[0][0]

          return this.currentTest?.results[calculatedKey];

        } else if (this.currentTest?.type === 'nearest') {
          
          return Object.entries(results) 
            .map((result: Array<any>) => this.currentTest?.results[result[0]] + ': ' + result[1] / (this.currentTest?.questions?.length||1) + '%\n')
            .join('')              
        }
      },
      restart() {
        this.step = 0;
        this.currentAnswer = null;
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
  .card-container {
    margin: 0 10px;
    flex: 1;
    text-align: center;
  }
  .query {
    font-weight: bold;
  }
  .answer-radio-group-and-btns {
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: 0 auto;
  }
  .answer-radio-btn {
    align-self: stretch;
    flex-grow: 0;
    margin: 5px 0 !important;
    text-align: start;
  }
  .control-btns {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }
  .control-btns > * {
    flex: 1;
  }
  .result_control-btns > * {
    margin: 5px 0;
  }
</style>