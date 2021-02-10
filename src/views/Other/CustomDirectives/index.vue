<template>
  <div v-paint-in:[color]="what" class="cube" />
  <input v-focus />
  <p v-paint-in:[color2]="'color'" >black</p>
  <p v-whatever="{ color: 'green', background: 'yellow' }" class="cube">greEN!</p>
</template>

<script>
import { defineComponent } from "vue"

  export default defineComponent({
    directives: {
      'paint-in': {
        mounted(el, binding, vnode) {
          el.style.cssText = `${binding.value}: ${binding.arg}; margin: 10px;`;
        }
      },
      // 'paint-in': function(el, binding, vnode) { // Короткая форма. Когда требуеться одинаковое поведение на bind и update, а остальные хуки не нужны.
      //     debugger
      //     el.style.cssText = `${binding.value}: ${binding.arg}; margin: 10px;`;
      //   },
      focus(el) {
        el.focus()
      },
      whatever(el, binding, vnode) {
        const cssText = Object.entries(binding.value).map(values => `${values[0]}: ${values[1]};`).join(' ')
        // debugger
        el.style.cssText = cssText;
      }
    },
    data: function () {
      return {
        color: 'black',
        what: 'background',

        color2: 'red',
      }
    }
  })
</script>

<style scoped>
  .cube {
    width: 100px;
    height: 100px;
  }
</style>