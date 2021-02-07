<template>
  <el-card class="card-container">
    <h2>{{isNewTest ? 'Создание теста' : 'Редактирование теста'}}</h2>

    <el-form class="new-test-form" ref="form" :model="newTest" :rules="rules" label-width="auto">

      <el-form-item label="Название" prop="title">
        <el-input v-model="newTest.title" size="medium"></el-input>
        <!-- <el-input v-debounce:500="titleOccupiedCheck" v-model="newTest.title" size="medium"></el-input> -->
      </el-form-item>

      <el-form-item label="Url путь">
        <el-input v-model="newTest.name" size="medium" placeholder="Не обязательно"></el-input>
        <!-- <el-input v-debounce:500="titleOccupiedCheck" v-model="newTest.title" size="medium"></el-input> -->
      </el-form-item>

      <el-form-item label="Тип теста" class="type-item">
        <el-radio-group v-model="newTest.type">
          <el-radio-button label="someone">Один из</el-radio-button>
          <el-radio-button label="nearest">Ближайший</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <h3 class="section-header">Вопросы</h3>
      <div class="question-container" v-for="(question, qIndex) in newTest.questions" :key="qIndex">
        <h4 class="question-header">Вопрос №{{qIndex+1}}</h4>

        <el-form-item label="Вопрос:" prop="question">
          <el-input v-model="newTest.questions[qIndex].query" size="medium"/>
        </el-form-item>

        <h4 class="answer-variants">Варианты ответа</h4>
        <template v-for="(answer, aIndex) in question.answers" :key="aIndex">
          <el-form-item class="answer-variant" label="Вариант ответа:" prop="answer">
            <el-input v-model="question.answers[aIndex].text" size="medium"/>
          </el-form-item>

         
          <div v-if="newTest.type === 'someone'">
            <el-form-item class="point-radio-btns" prop="score">
              <el-radio
                v-for="(result, rIndex) in newTest.results"
                :key="rIndex"
                v-model="newTest.questions[qIndex].answers[aIndex].values[0]"
                :label="rIndex"
              >
                {{newTest.keys[rIndex] ? newTest.keys[rIndex] : 'Результат №'+ (rIndex+1)}}
              </el-radio>
            </el-form-item>
          </div>

          <!-- <NearestAnswerScope :new-test="newTest" :q-index="qIndex" :a-index="aIndex" :change-answer-value="changeAnswerValue" /> -->
          <div v-else>
            <h5 class="points-header">Очки варианта ответа:</h5>
            <template v-for="(result, rIndex) in newTest.results" :key="rIndex">
              <el-form-item class="points-slider-item" :label="(newTest.keys[rIndex] ? newTest.keys[rIndex] : 'Результат №'+ (rIndex+1)) + ':'">
                <el-slider tooltip-class="points-slider-tooltip" v-model="newTest.questions[qIndex].answers[aIndex].values[rIndex]" size="medium" show-input></el-slider>
              </el-form-item>
            </template>
          </div>
        </template>
        <!-- <hr/> -->

        <el-button class="plus-btn variant-btn" type="primary" icon="el-icon-plus" plain @click="addAnswer(qIndex)">вариант</el-button>
      </div>

      <el-button class="plus-question-btn" type="primary" icon="el-icon-plus" plain @click="addQuestion">Добавить вопрос</el-button> <!-- попробовать оставить + а при наведение анимацию и добавлять "вопрос" -->
   
      <h3 class="section-header">Результаты теста</h3> <!-- валидациия на одинаковые ответы и/или ключи -->
      <template v-for="(result, rIndex) in newTest.results" :key="rIndex">
        <el-form-item class="result" label="Результат:" prop="result">
          <el-input v-model="newTest.results[rIndex]" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="Ключ результата:">
          <el-input v-model="newTest.keys[rIndex]" size="medium"></el-input>
        </el-form-item>
      </template>

      <el-button class="plus-btn" type="primary" icon="el-icon-plus" plain @click="addResult">результат</el-button>

      <!-- сделать подсказку с "Например" -->

      <p>{{JSON.parse(JSON.stringify(computedQuestions))}}</p>
      <el-button class="create-test-btn" type="primary" icon="el-icon-plus" @click="onCreateTest('form')">
        {{isNewTest ? 'Создать тест' : 'Сохранить изменения'}}
      </el-button>  <!-- дизейблить на время запроса -->
    </el-form>
  </el-card>
</template>


<script lang="ts">
import router from "@/router"
import store from "@/store"
import { defineComponent, ref } from "vue"
import { debounce } from 'vue-debounce'
import { getBusyStatus } from '@/config/api'
// import NearestAnswerScope from "./NearestAnswerScope.vue"

  const answerPrototype = { text: '', values: [] as Array<number> }
  const questionPrototype = { query: '', answers: [ answerPrototype ] }
  const initNewTest = {
    title: '',
    name: '',
    type: 'someone',
    questions: [ questionPrototype ],
    results: [''],
    keys: [],
  }

  type newTestType = typeof initNewTest;

  export default defineComponent({
    props: ['id'],
    data() {
      return {
        isNewTest: true,
        newTest: JSON.parse(JSON.stringify(initNewTest)) as newTestType,
        isTitleOccupied: false,
        rules: {
          title: [
            { required: true, message: 'is required' },
            { min: 2, max: 50, message: 'Length should be 2 to 50', trigger: 'blur' },
            { validator: this.titleOccupiedCheck, message: 'Такое название уже занято -няЪъъ', trigger: ['change', 'blur'] }
          ],
          question: [
            // { required: true, message: 'is required', trigger: 'blur' },
          ],
          answer: [
            // { required: true, message: 'is required' },
          ],
          score: [
            // { required: true, message: 'is required' },
          ],
          result: [
            // { required: true, message: 'is required' },
          ],
        },
      }
    },
    created() {
      const editTest = store.state.tests.data.find(test => test._id === this.$route.params.id)
      if (editTest) {
        // const resultEntries = Object.entries(editTest?.results)
        // const resultKeys = resultEntries.map(e => e[0])
        // const resultValues = resultEntries.map(e => e[1])

        const newTest = {
          ...editTest,
          questions: editTest.questions.map(question => ({
            ...question,
            answers: question.answers.map(answer => ({
              ...answer,  
              values: editTest.type === 'someone'
                ? [editTest.keys.indexOf(Object.keys(answer.values)[0])] // @ts-expect-error
                : editTest.keys.map(key => answer.values[key]) // TODO: значения почему то хоть здесь и есть, но после присваивания и рендера пропадают
            }))
          })),
          results: editTest.keys.map(key => editTest.results[key]),
        };
         // @ts-expect-error
        this.newTest = newTest
        this.isNewTest = false
      } else {
        // TODO: сменить _create
      }
    },
    watch: {
      'newTest.type': function () {
        this.newTest.questions.forEach(question => question.answers.forEach((answer: any) => answer.values = []))
      }
    },
    computed: {
      computedKeys(): Array<string | number> {
        return this.newTest.keys.map((key: string, i: number) => key || i)
      },
      // computedValues() {
      //   debugger
      //   return { M: 0 } || new Map([[this.computedKeys, this.computedKeys]])
      // }
      // @ts-expect-error
      computedQuestions() { // @ts-expect-error
        return this.newTest.questions.map(question => (
          {
            ...question, // @ts-expect-error
            answers: question.answers.map(answer => (
              {
                ...answer,
                values: this.newTest.type === 'someone'
                  ? { [this.newTest.keys[answer.values[0]] || this.newTest.results[answer.values[0]] || '']: 1 }
                  : Object.fromEntries(new Map(
                    this.newTest.results.map((result, i) => [this.newTest.keys[i] || result, answer.values[i]])
                ))
              }
            ))
          }
        ))
      },
      // @ts-expect-error
      computedResults() {
        return Object.fromEntries(new Map( // @ts-expect-error
          this.newTest.results.map((result: string, i: number) => [this.newTest.keys[i] || result, result])
        ))
      }
    },
    methods: { // TODO: такой дебаунс подходит для случаев когда компонент используется один раз. 
      titleOccupiedCheck: debounce(function(rule: any, value: string, callback: any) { // Так написано в доке 
      // @ts-expect-error
        if (!this.isNewTest) callback()
        getBusyStatus('title', value).then(res => {
          res?.data === 'free' ? callback() : callback(new Error(rule.message))
        })
      }, '500ms'),
      addQuestion() {
        this.newTest.questions.push(JSON.parse(JSON.stringify(questionPrototype)))
      },
      addAnswer(qIndex: number) {
        this.newTest.questions[qIndex].answers.push(JSON.parse(JSON.stringify(answerPrototype)))
      },
      addResult() {
        this.newTest.results.push('')
      },
      changeAnswerValue(q: number, a: number, v: number, value: number) {
        this.newTest.questions[q].answers[a].values[v] = value
      },
      onCreateTest(formName: string) {
           // @ts-expect-error 
        this.$refs[formName].validate((valid: boolean) => {
          if (valid) {
            store.dispatch(this.isNewTest ? 'postTest' : 'updateTest', {
              ...this.newTest,
              name: this.newTest.name || ('_' + Math.random() * 1e20), // TODO: решить по другому
              results: this.computedResults,
              questions: this.computedQuestions
            }).then((res: any) => {
              if (res.status === 200) router.push({ path: `/tests/_library` }) 
              else console.log('Error');
              this.newTest = JSON.parse(JSON.stringify(initNewTest))
              this.resetForm(formName)
            }).finally(() => {
              console.log('Submit!!');  // TODO: пендин до этого времени
            })
          } else {
            console.log('error submit((');
          }
        });
      },
      resetForm(formName: string) {
          // @ts-expect-error
        this.$refs[formName].resetFields();
      }
    },
    components: {
      // NearestAnswerScope,
    }
  })
</script>

<style scoped>
  .card-container {
    margin: 0 10px;
    flex: 1;
    /* min-width: 180px; */
    text-align: center;
  }
  .new-test-form {
    display: flex;
    flex-direction: column;
  }
  .type-item {
    text-align: start;
  }
  .section-header {
    margin: 60px 0 0;
  }
  .question-container {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  }
  .question-header {
    margin: 60px 0 15px 145px; /* TODO: сделать адоптивно */
    text-align: start;
  }
  .answer-variants {
    margin: 30px 0 -20px;
  }
  .answer-variant {
    margin-top: 50px;
  }
  .points-warning {
    color: red;
    text-align: start;
    margin: -5px 0 10px 145px;
  }
  .points-header {
    text-align: start;
    margin: 0 0 10px 145px;
  }
  .points-slider-item {
    margin: 0;
  }
  .result {
    margin: 15px 0;
  }
  .plus-btn {
    align-self: flex-start;
    margin: 15px 0 10px 140px;
  }
  .plus-question-btn {
    align-self: center;
  }
  .create-test-btn {
    align-self: center;
    margin: 20px;
  }
  .el-slider__button::after {
    color: red;
  }
</style>
<style>
  .points-slider-tooltip {
    margin-bottom: -6px !important;
  }
  .point-radio-btns > .el-form-item__content {
    margin: 0 !important;
  }
  .point-radio-btns .el-form-item__error {
    width: 100% !important;
  }
</style>