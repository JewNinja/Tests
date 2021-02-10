<template>
  <div class="tele-holl">0</div> <!-- если ниже телепорта то вроде не работает -->
  <div class="">
    1
    <div class="">
      2
      <div class="">
        3
        <teleport to=".tele-holl">
          <div>
            4
          </div>
        </teleport>
      </div>
    </div>
  </div>

</template>

<script>
import { defineComponent } from "vue"

  export default defineComponent({
 
  })
</script>

<style scoped>

</style>