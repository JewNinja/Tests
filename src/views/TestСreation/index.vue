<template>
  <el-card class="card-container">
    <h3>Создание теста</h3>
    <el-form ref="form" :model="newTest" :rules="rules" label-width="80px">
      <el-form-item
        label="Название"
        prop="title"
        :rules="[
          { required: true, message: 'is required'},
          { validator: titleOccupiedCheck, message: 'Такое название уже занято -няЪъъ', trigger: 'change' },
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

  export default defineComponent({
    data() {
      return {
        newTest: {
          title: '',
          type: 'someone'
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

    },
    methods: { // TODO: такой дебаунс подходит для случаев когда компонент используется один раз. 
      titleOccupiedCheck: debounce(function(rule: any, value: string, callback: any) { // Так написано в доке
        console.log(1);
        // console.log(1);
        // const dFn = debounce(callback(
        //   new Error(rule.message)
        // ), '10000ms')
        // dFn()
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
  .type-item {
    text-align: start;
  }
</style>