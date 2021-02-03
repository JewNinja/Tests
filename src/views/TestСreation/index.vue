<template>
  <el-card class="card-container">
    <h2>Создание теста</h2>

    <el-form class="new-test-form" ref="form" :model="newTest" :rules="rules" label-width="120px">

      <el-form-item
        label="Название"
        prop="title"
        :rules="[
          { required: true, message: 'is required'},
          { validator: titleOccupiedCheck, message: 'Такое название уже занято -няЪъъ', trigger: ['change', 'blur'] }, // TODO: запрос на проверку идёт и на блюр, даже если имя не менялось. Попытаться исправить. Но в валидатор не приходя превПропсы или метод. Метод/проверку можно разделить на блюр и чейнж. Но тогда надо что то придумать с превпропсами 
        ]"
      >
        <el-input v-model="newTest.title" size="medium"></el-input>
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

        <el-form-item label="Вопрос:">
          <el-input v-model="question.query" size="medium"></el-input>
        </el-form-item>

        <h4 class="answer-variants">Варианты ответа</h4>
        <template v-for="(answer, aIndex) in question.answers" :key="aIndex">
          <el-form-item class="answer-variant" label="Вариант ответа:">
            <el-input v-model="question.answers[aIndex].text" size="medium"></el-input>
          </el-form-item>

          <h5 class="points-warning" v-if="Object.values(answer.values).length === 0">
            Для выставления очков, вам нужно определить результаты теста
          </h5>       
          <h5 class="points-header" v-else>Очки варианта ответа:</h5>
          <template v-for="(value, vIndex) in answer.values" :key="vIndex">
            <el-form-item class="points-slider-item" :label="'Результат №'+ (vIndex+1) + ':'">
              <el-slider tooltip-class="points-slider-tooltip" v-model="question.answers[aIndex].values[vIndex]" size="medium" show-input></el-slider>
            </el-form-item>
          </template>     
        </template>
        <p>{{computedQuestions}}</p>
        <!-- <hr/> -->
      </div>

      <el-button class="plus-question" type="primary" icon="el-icon-plus" plain>вопрос</el-button> <!-- попробовать оставить + а при наведение анимацию и добавлять "вопрос" -->
      
      <h3 class="section-header">Результаты теста</h3>
      <el-form-item label="Результат:">
        <!-- <el-input v-model="question.query" size="medium"></el-input> -->
      </el-form-item>
      <!-- <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="Pick a time" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type"></el-checkbox>
          <el-checkbox label="Promotion activities" name="type"></el-checkbox>
          <el-checkbox label="Offline activities" name="type"></el-checkbox>
          <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor"></el-radio>
          <el-radio label="Venue"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item> -->
    </el-form>
  </el-card>
</template>


<script lang="ts">
import router from "@/router"
import store from "@/store"
import { defineComponent, ref } from "vue"
import { debounce } from 'vue-debounce'
import { getBusyStatus } from '@/config/api'

  export default defineComponent({
    data() {
      return {
        newTest: {
          title: '',
          type: 'someone',
          questions: [
            { query: '', answers: [ { text: '', values: [6] } ]  }
          ],
          results: ['Юра'],
          keys: ['Y'],
        },
        isTitleOccupied: false,
        // rules: {
        //   title: [
        //     { required: true, message: 'Please input', trigger: 'blur' },
        //     { min: 2, max: 50, message: 'Length should be 2 to 50', trigger: 'blur' },
        //     { validator: !this.isTitleOccupied, message: 'Такое название уже занято', trigger: 'blur' },
        //   ],
        // },
      }
    },
    watch: {
      // 'newTest.title': function (val, oldVal) {

      // }
    },
    computed: {
      computedKeys(): Array<string | number> {
        // debugger
        return this.newTest.keys.map((key: string, i: number) => key || i)
      },
      // computedValues() {
      //   debugger
      //   return { M: 0 } || new Map([[this.computedKeys, this.computedKeys]])
      // }
      computedQuestions() {
        debugger
        console.log(this.newTest.questions.map(question => (
          {
            ...question,
            answers: question.answers.map(answer => (
              {
                ...answer, // @ts-expect-error
                values: Object.fromEntries(new Map([ 
                  ...this.newTest.results.map(
                    (result, i) => {
                      debugger
                      const a = [this.newTest.keys[i] || result, answer.values[i]]
                      return a
                    }
                  )
                ]))
              }
            ))
          }
        )))
        return []
      }
    },
    methods: { // TODO: такой дебаунс подходит для случаев когда компонент используется один раз. 
      titleOccupiedCheck: debounce(function(rule: any, value: string, callback: any) { // Так написано в доке
        getBusyStatus('title', value).then(res => {
          res?.data === 'free' ? callback() : callback(new Error(rule.message))
        })
      }, '500ms'),
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
    margin: 10px 0;
  }
  .question-header {
    margin: 60px 0 15px 125px;
    text-align: start;
  }
  .answer-variants {
    margin: 50px 0 -20px;
  }
  .answer-variant {
    margin-top: 50px;
  }
  .points-warning {
    color: red;
    text-align: start;
    margin: -5px 0 10px 125px;
  }
  .points-header {
    text-align: start;
    margin: 0 0 10px 125px;
  }
  .points-slider-item {
    margin: 0;
  }
  .plus-question {
    align-self: flex-start;
    margin: 15px 0 10px 120px;
  }
  .el-slider__button::after {
    color: red;
  }
</style>
<style>
  .points-slider-tooltip {
    margin-bottom: -6px !important;
  }
</style>