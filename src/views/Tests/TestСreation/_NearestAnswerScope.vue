<template>
  <h5 class="points-header">Очки варианта ответа:</h5>
  <template v-for="(result, rIndex) in newTest.results" :key="rIndex">
    <el-form-item class="points-slider-item" :label="(newTest.keys[rIndex] ? newTest.keys[rIndex] : 'Результат №'+ (rIndex+1)) + ':'">
      <el-slider
        tooltip-class="points-slider-tooltip"
        :value="newTest.questions[qIndex].answers[aIndex].values[rIndex]"
        @change="changeValue(rIndex, $event)"
        @change.native="changeValue(rIndex, $event)"
        size="medium"
        show-input
      />
    </el-form-item>
  </template> 
</template>

<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    props: {
      newTest: {
        type: Object, required: true
      },
      qIndex: {
        type: Number, required: true
      },
      aIndex: {
        type: Number, required: true
      },
      changeAnswerValue: {
        type: Function, required: true
      }
    },
    methods: {
      changeValue(rIndex: number, event: number) {
        this.changeAnswerValue(this.qIndex, this.aIndex, rIndex, event)
      }
    }
  })
</script>